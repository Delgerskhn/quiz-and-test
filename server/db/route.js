const router = require("express").Router();
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const verify = require("../verify");
const schema = new mongoose.Schema({}, { strict: false });
const quiz = require("./quiz");
const testScore = require("./testScore");

let testcase = {};
class Timer {
  constructor(obj, id) {
    this.time = 60;
    this.id = id;
    this.interval = setInterval(() => {
      if (this.time > 0) this.time--;
      else {
        clearInterval(this.interval);
        delete testcase[this.id];
      }
    }, 1000);
    this.obj = obj;
  }
}

router.post("/createquiz", verify, async (req, res) => {
  try {
    let Quiz = new quiz({ ...req.body, user: req.user._id });
    let saved = await Quiz.save();
    res.send({ success: 1 });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//test ehlehed timer ajilj ehlene
router.post("/test", verify, async (req, res) => {
  //esreg uyd hash dotroos testcase iig shuud avch yvuulna
  if (testcase[req.user._id]) {
    res.send({
      quizes: testcase[req.user._id].obj,
      time: testcase[req.user._id].time,
    });
  }
  //hervee testcase object dotor user hash bhgu bol shineer find hiiged yvuulna testcase ruu hashlaj hadgalna
  else {
    const collection = await quiz.aggregate([
      { $sample: { size: 3 } },
      { $project: { answers: 1, question: 1 } },
    ]);
    testcase[req.user._id] = new Timer(collection, req.user._id);
    res.send({
      quizes: collection,
      time: testcase[req.user._id].time,
    });
  }
});
router.post("/latestquizes", async (req, res) => {
  const collection = await quiz
    .find({}, { question: 1 })
    .sort({ date: -1 })
    .limit(10);
  res.send(collection);
});

//timer duusaagui bval tootsno timer duusval shuud avtomataar ajilj 0 onoog burtgene
router.post("/submittest", verify, async (req, res) => {
  let keys = Object.keys(req.body);
  //holbogdoh object uudiig select hiine
  const answers = await quiz.find(
    {
      _id: { $in: keys.map((a) => ObjectId(a)) },
    },
    { _id: 1, validAnswer: 1 }
  );

  //avsan onoog tootsoolno
  let score = 0;
  answers.forEach((a) => {
    if (req.body[a._id] == a.validAnswer && testcase[req.user._id]) score++;
    req.body[a._id] = a.validAnswer;
  });

  score = score + "/" + answers.length;

  //score bolon zuv hariunuudiig id tai ni butsaana
  let answer = {
    answers: req.body,
    result: score,
  };
  if (!testcase[req.user._id]) {
    answer.message = "Time is end";
  }
  let TestScore = new testScore({
    score: score,
    user: req.user._id,
    testcase: Object.keys(req.body).map((a) => ObjectId(a)),
  });
  let saved = await TestScore.save();
  console.log(saved);
  delete testcase[req.user._id];
  res.send(answer);
});

router.post("/getquizes", verify, async (req, res) => {
  let id = ObjectId(req.user._id);
  const collection = await quiz.find({ user: id });
  res.send(collection.map((a) => ({ question: a.question })));
});

router.post("/gettests", verify, async (req, res) => {
  let id = ObjectId(req.user._id);
  const tests = await testScore.aggregate([
    {
      $match: {
        user: id,
      },
    },
    {
      $lookup: {
        from: "quizzes",
        let: { quizids: "$testcase" },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: ["$_id", "$$quizids"],
              },
            },
          },
          {
            $project: {
              question: 1,
            },
          },
        ],
        as: "quizzes",
      },
    },
    {
      $project: {
        score: 1,
        date: 1,
        quizzes: 1,
      },
    },
  ]);

  res.send(tests);
});

module.exports = router;

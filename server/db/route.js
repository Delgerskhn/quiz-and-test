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
    let Quiz = new quiz(req.body);
    let saved = await Quiz.save();
    console.log(req.body);
    res.send(saved);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//test ehlehed timer ajilj ehlene
router.post("/test", verify, async (req, res) => {
  //hervee testcase object dotor user hash bhgu bol shineer find hiiged yvuulna testcase ruu hashlaj hadgalna
  if (testcase[req.user._id]) {
    console.log("belen");
    res.send({
      quizes: testcase[req.user._id].obj,
      time: testcase[req.user._id].time,
    });
  }
  //esreg uyd hash dotroos testcase iig shuud avch yvuulna
  else {
    console.log("haisan");
    const collection = await quiz.aggregate([{ $sample: { size: 3 } }]);
    let spec = collection.map((a) => ({
      _id: a._id,
      answers: a.answers,
      question: a.question,
    }));
    testcase[req.user._id] = new Timer(spec, req.user._id);
    res.send({
      quizes: spec,
      time: 60,
    });
  }
});
router.post("/latestquizes", async (req, res) => {
  const collection = await quiz.find().sort({ date: -1 }).limit(10);
  res.send(collection.map((a) => ({ question: a.question })));
});

//timer duusaagui bval tootsno timer duusval shuud avtomataar ajilj 0 onoog burtgene
router.post("/submittest", verify, async (req, res) => {
  let keys = Object.keys(req.body);
  //holbogdoh object uudiig select hiine
  const answers = await quiz
    .find({
      _id: { $in: keys.map((a) => ObjectId(a)) },
    })
    .sort({ _id: 1 });

  //avsan onoog tootsoolno
  let score = 0;
  answers.forEach((a) => {
    if (req.body[a._id] == a.validAnswer) score++;
    req.body[a._id] = a.validAnswer;
  });
  score = score + "/" + answers.length;

  //score bolon zuv hariunuudiig id tai ni butsaana
  let answer = {
    answers: req.body,
    result: score,
  };
  if (!testcase[req.user._id]) {
    answer.result = "0/" + answers.length;
    answer.message = "Time is end";
  } else {
    let TestScore = new testScore({ score: score, user: req.user._id });
    let saved = await TestScore.save();
  }
  delete testcase[req.user._id];
  res.send(answer);
});

module.exports = router;

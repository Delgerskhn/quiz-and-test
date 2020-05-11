const router = require("express").Router();
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const verify = require("../verify");
const schema = new mongoose.Schema({}, { strict: false });
const quiz = require("./quiz");
const testScore = require("./testScore");

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
  const collection = await quiz.aggregate([{ $sample: { size: 3 } }]);
  let spec = collection.map((a) => ({
    _id: a._id,
    answers: a.answers,
    question: a.question,
  }));
  res.send(spec);
});
router.post("/latestquizes", async (req, res) => {
  const collection = await quiz.find().sort({ date: -1 }).limit(2);
  res.send(collection.map((a) => ({ question: a.question })));
});

//timer duusaagui bval tootsno timer duusval shuud avtomataar ajilj 0 onoog burtgene
router.post("/submittest", verify, async (req, res) => {
  console.log(req.user);
  let keys = Object.keys(req.body);
  console.log(keys);
  const answers = await quiz
    .find({
      _id: { $in: keys.map((a) => ObjectId(a)) },
    })
    .sort({ _id: 1 });
  //test score oloh   useranswer-key validanswer-key
  let score = 0;
  answers.forEach((a) => {
    if (req.body[a._id] == a.validAnswer) score++;
  });
  score = score + "/" + answers.length;
  let TestScore = new testScore({ score: score, user: req.user._id });
  let saved = await TestScore.save();
  res.send(saved); //ene deerees nemeed zuv hariunuudiig test page ruu butsaah heregtei
});

module.exports = router;

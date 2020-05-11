const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;

//user answer, valid answer,
var testScore = new mongoose.Schema({
  score: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("testScore", testScore);

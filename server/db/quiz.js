const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
function ansLength(val) {
  return val.length == 3;
}
var parentSchema = new mongoose.Schema({
  // Array of subdocuments
  answers: {
    type: Array,
    validate: [ansLength, "{PATH} there are 3 answers possible"],
  },
  // Single nested subdocuments. Caveat: single nested subdocs only work
  // in mongoose >= 4.2.0
  validAnswer: {
    type: Number,
    required: true,
  },
  question: {
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

module.exports = mongoose.model("quiz", parentSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  //günlük mü yoksa blog mu
  isArticle: {
    type: Boolean,
    required: true,
    enum: [true, false],
    default: true,
  },
  //herkese mi açık yoksa kapalı mı
  isPublic: {
    type: Boolean,
    required: true,
    enum: [true, false],
    default: true,
  },
});

module.exports = mongoose.model("category", cSchema);

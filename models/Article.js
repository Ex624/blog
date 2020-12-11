const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  published: {
    type: Boolean,
    required: true,
    enum: [true, false],
    default: false,
  },
  comments: {
    type: Array,
  },
  tags: {
    type: Array,
  },
  content: {
    type: String,
    required: true,
  },
  shortContent: {
    type: String,
    required: true,
  },
  mainImage: {
    type: String,
    required: true,
  },
  type: {
    //0 -> blog, 1 -> günlük
    type: Number,
    required: true,
    enum: [0, 1],
    default: 0,
  },
  creater: Schema.Types.ObjectId,
});

module.exports = mongoose.model("article", aSchema);

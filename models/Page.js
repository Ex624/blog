const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  information: {
    type: String,
    required: true,
    default: "Hello world",
  },
  slug: {
    type: String,
    required: true,
  },
  order: Number,
});

module.exports = mongoose.model("page", pSchema);

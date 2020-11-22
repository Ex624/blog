const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const cSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  ipAdress: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  email: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
});

module.exports = mongoose.model("comment", cSchema);

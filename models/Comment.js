const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  isRead: {
    type: Boolean,
    enum: [false, true],
    default: false,
  },
});

module.exports = mongoose.model("comment", cSchema);

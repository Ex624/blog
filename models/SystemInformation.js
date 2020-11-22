const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sysSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  options: Object,
});

module.exports = mongoose.model("sysInfo", sysSchema);

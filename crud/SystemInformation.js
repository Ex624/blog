const SystemInformation = require("../models/SystemInformation");

module.exports.getInfo = (name) => {
  return new Promise((resolve, reject) => {
    SystemInformation.findOne({ type: name }).then((d) => {
      if (d) resolve({ success: true, data: d.options });
      else resolve({ success: false });
    });
  });
};

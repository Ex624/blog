const SystemInformation = require("../models/Page");

module.exports.getSite = (slug) => {
  return new Promise((resolve, reject) => {
    SystemInformation.find({}).then((d) => {
      if (d) resolve({ success: true, data: d });
      else resolve({ success: false });
    });
  });
};

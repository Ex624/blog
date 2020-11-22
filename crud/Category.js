const Category = require("../models/Category");

module.exports.all = () => {
  return new Promise((resolve, reject) => {
    Category.find({}).then((d) => {
      if (d) resolve({ success: true, data: d });
      else resolve({ success: false });
    });
  });
};

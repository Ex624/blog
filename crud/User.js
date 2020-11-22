const User = require("../models/User");

module.exports.getOwner = () => {
  return new Promise((resolve, reject) => {
    User.findOne({ permission: 0 }).then((d) => {
      if (d) resolve({ success: true, data: d });
      else resolve({ success: false });
    });
  });
};

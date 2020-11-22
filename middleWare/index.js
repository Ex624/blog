const SystemInformation = require("../crud/SystemInformation");
const Page = require("../crud/Page");

module.exports = async (req, res, next) => {
  const siteInfo = await SystemInformation.getInfo("site");
  const allInfo = await Page.getSite();
  const currentInfo = allInfo.data.find((data) => data.slug == req.url);

  allInfo.data.sort(function (a, b) {
    return a.order - b.order;
  });

  res.locals.s = {
    allInfo,
    currentInfo,
    siteInfo,
  };

  // console.log(res.locals.s);

  next();
};

const Page = require("../crud/Page");
const SystemInformation = require("../crud/SystemInformation");

module.exports = async (req, res, next) => {
  const allInfo = await Page.getSite();
  const siteInfo = await SystemInformation.getInfo("site");

  const currentInfo = allInfo.data.find(
    (data) => data.slug == (req.url == "/" ? "/admin" : "admin" + req.url)
  );
  allInfo.data.sort(function (a, b) {
    return a.order - b.order;
  });
  res.locals.s = {
    currentInfo,
    siteInfo,
    allInfo,
  };

  next();
};

const Page = require("../crud/Page");
const SystemInformation = require("../crud/SystemInformation");
const Comment = require("../crud/Comment");
module.exports = async (req, res, next) => {
  const allInfo = await Page.getSite();
  const siteInfo = await SystemInformation.getInfo("site");

  const currentInfo = allInfo.data.find(
    (data) => data.slug == (req.url == "/" ? "/admin" : "/admin" + req.url)
  );

  allInfo.data.sort(function (a, b) {
    return a.order - b.order;
  });
  res.locals.s = {
    currentInfo,
    siteInfo,
    allInfo,
  };

  if (req.user) {
    res.locals.s.notifications = await Comment.getAll();
    res.locals.user = req.user;
    if (req.url == "/login") {
      res.redirect("/admin");
    } else next();
  } else {
    console.log(req.url);
    if (req.url == "/login") return next();
    else res.redirect("/admin/login");
  }
};

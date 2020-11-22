const Page = require("../crud/Page");
const SystemInformation = require("../crud/SystemInformation");
const Article = require("../crud/Article");
const moment = require("moment"); // require
moment.locale("tr");

module.exports = async (req, res, next) => {
  const allInfo = await Page.getSite();
  const siteInfo = await SystemInformation.getInfo("site");
  const articles = await Article.getFull();
  res.locals.articles = articles.data;

  articles.data.forEach((d) => {
    d.time = {
      dayNumber: moment(d.createdDate).format(`DD`),
      monthText: moment(d.createdDate).format(`MMMM`),
      yearNumber: moment(d.createdDate).format(`YYYY`),
      shortDate: moment(d.createdDate).format(`DD MMMM, YYYY - HH:mm`),
    };
    d.comments.sort(function (a, b) {
      return new Date(b.createdDate) - new Date(a.createdDate);
    });
    d.comments.forEach((c) => {
      c.time = {
        shortDate: moment(c.createdDate).format(`DD MMMM, YYYY - HH:mm`),
      };
    });
  });
  const currentInfo = allInfo.data.find(
    (data) => data.slug == (req.url == "/" ? "/blog" : "/blog" + req.url)
  );

  // console.log(currentInfo);
  allInfo.data.sort(function (a, b) {
    return a.order - b.order;
  });
  res.locals.s = {
    currentInfo,
    siteInfo,
    allInfo,
  };
  // console.log(articles.data);
  // console.log(res.locals.s);
  next();
};

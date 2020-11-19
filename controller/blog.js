module.exports.getHomePage = (req, res, next) => {
  res.render("tema1/blog/index", { layout: "tema1/layouts/blog" });
};
module.exports.getLatestPage = (req, res, next) => {
  res.render("tema1/blog/latest", { layout: "tema1/layouts/blog" });
};

module.exports.getSinglePage = (req, res, next) => {
  res.render("tema1/blog/single", { layout: "tema1/layouts/blog" });
};

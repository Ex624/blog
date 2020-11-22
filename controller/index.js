module.exports.getHomePage = async (req, res, next) => {
  res.render("tema1/index/index", { layout: "tema1/layouts/layout" });
};

module.exports.getAboutPage = (req, res, next) => {
  res.render("tema1/index/about", { layout: "tema1/layouts/blog" });
};

module.exports.getResumePage = (req, res, next) => {
  res.render("tema1/index/resume", { layout: "tema1/layouts/blog" });
};
module.exports.getContactPage = (req, res, next) => {
  res.render("tema1/index/contact", { layout: "tema1/layouts/blog" });
};
module.exports.getPortfolioPage = (req, res, next) => {
  res.render("tema1/index/portfolio", { layout: "tema1/layouts/blog" });
};
module.exports.getPortfolio1Page = (req, res, next) => {
  res.render("tema1/index/portfolio-item-01", {
    layout: "tema1/layouts/blog",
  });
};

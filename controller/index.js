module.exports.getHomePage = (req, res, next) => {
  res.render("tema1/index/index", { layout: "tema1/layouts/layout" });
};

module.exports.getAboutPage = (req, res, next) => {
  res.render("tema1/index/about", { layout: "tema1/layouts/layout" });
};

module.exports.getResumePage = (req, res, next) => {
  res.render("tema1/index/resume", { layout: "tema1/layouts/layout" });
};
module.exports.getContactPage = (req, res, next) => {
  res.render("tema1/index/contact", { layout: "tema1/layouts/layout" });
};
module.exports.getPortfolioPage = (req, res, next) => {
  res.render("tema1/index/portfolio", { layout: "tema1/layouts/layout" });
};
module.exports.getPortfolio1Page = (req, res, next) => {
  res.render("tema1/index/portfolio-item-01", {
    layout: "tema1/layouts/layout",
  });
};

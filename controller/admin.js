module.exports.getLoginPage = (req, res, next) => {
  res.render("tema1/admin/login", { layout: "tema1/layouts/adminL" });
};
module.exports.getHomePage = (req, res, next) => {
  res.render("tema1/admin/index", { layout: "tema1/layouts/admin" });
};
module.exports.getBlogAddPage = (req, res, next) => {
  res.render("tema1/admin/yazi-ekle", { layout: "tema1/layouts/admin" });
};

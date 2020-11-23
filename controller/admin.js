const Article = require("../crud/Article");
const Category = require("../crud/Category");
module.exports.getLoginPage = (req, res, next) => {
  res.render("tema1/admin/login", { layout: "tema1/layouts/adminL" });
};
module.exports.getHomePage = (req, res, next) => {
  res.render("tema1/admin/index", { layout: "tema1/layouts/admin" });
};
module.exports.getBlogAddPage = async (req, res, next) => {
  const categories = await Category.all();

  res.render("tema1/admin/yazi-ekle", {
    layout: "tema1/layouts/adminEdit",
    categories: categories.data,
  });
};

module.exports.postSaveArticle = async (req, res, next) => {
  let data = await Article.save(req.body);
  res.json(data);
};

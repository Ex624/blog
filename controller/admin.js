const Article = require("../crud/Article");
const Category = require("../crud/Category");
const passport = require("passport");
const Comment = require("../crud/Comment");
require("../auth/local");

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

module.exports.getCommentDetailsPage = async (req, res, next) => {
  const { id } = req.params;
  let data = await Comment.whereById(id);
  res.json(data);
};

module.exports.postSaveArticle = async (req, res, next) => {
  let data = await Article.save(req.body);
  res.json(data);
};

module.exports.postLogin = async (req, res, next) => {
  // passport.authenticate("user-login", {
  // successRedirect: "/",
  // failureRedirect: "/users/login",
  // failureFlash: true,
  // successFlash: true,
  // })(req, res, next);

  const { email, password } = req.body;
  console.log(email, password);
  if (!(email || password))
    return res.json({ success: false, message: "boş alan bırakmayınız" });

  passport.authenticate(
    "user-login",
    {
      successRedirect: "/",
      failureRedirect: "/users/login",
      failureFlash: true,
      successFlash: true,
    },
    (error, user, info) => {
      if (error) {
        return res.json({ success: false, message: info.message });
      }
      if (!user) {
        return res.json({ success: false, message: info });
      }

      req.logIn(user, function (err) {
        if (err) return next(err);
        res.json({ success: true, message: info, user });

        // return res.redirect("/");
      });
    }
  )(req, res, next);
};

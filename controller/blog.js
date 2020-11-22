const slugify = require("slugify");
const Category = require("../crud/Category");
const Comment = require("../crud/Comment");
const fetch = require("node-fetch");
module.exports.getHomePage = async (req, res, next) => {
  const categories = await Category.all();
  // console.log(categories);
  res.render("tema1/blog/index", {
    layout: "tema1/layouts/blog",
    categories: categories.data,
  });
};

module.exports.getLatestPage = async (req, res, next) => {
  res.render("tema1/blog/latest", {
    layout: "tema1/layouts/blog",
  });
};

module.exports.getSingleTitlePage = async (req, res, next) => {
  const title = slugify(req.params.title, {
    replacement: "-",
    remove: undefined,
    lower: true,
    strict: false,
    locale: "vi",
  });
  const categories = await Category.all();
  let articles = res.locals.articles;
  const article = articles.find((e) => e.url == title);
  const articleIndex = articles.findIndex((e) => e.url == title);

  const previousPost = articles[articleIndex + 1];
  const nextPost = articles[articleIndex - 1];

  article.previous = null;
  article.next = null;

  res.locals.s.currentInfo = {
    title: article.title,
  };

  if (previousPost != undefined)
    article.previous = { title: previousPost.title, url: previousPost.url };

  if (nextPost != undefined)
    article.next = { title: nextPost.title, url: nextPost.url };

  recentPosts = articles.filter((a, b) => {
    return b != articleIndex;
  });
  // console.log(article);
  res.render("tema1/blog/single", {
    layout: "tema1/layouts/blog",
    article,
    categories: categories.data,
    recentPosts,
  });
};

/* POST */
module.exports.postComment = async (req, res, next) => {
  if (
    req.body["g-recaptcha-response"] === undefined ||
    req.body["g-recaptcha-response"] === "" ||
    req.body["g-recaptcha-response"] === null
  ) {
    return res.json({
      success: false,
      message: "reCAPTCHA doğrulamasını yapmanız gerekmektedir.",
    });
  }
  const secretKey = "6LfH1-gZAAAAALLec_uJHyLf-iws3hvjs-tbL3M7";

  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body["g-recaptcha-response"]}&remoteip=${req.connection.remoteAddress}`;

  fetch(url, {
    method: "post",
  })
    .then((response) => response.json())
    .then(async (google_response) => {
      if (google_response.success) {
        const ipAdress =
          (req.headers["x-forwarded-for"] || "").split(",").pop().trim() ||
          req.connection.remoteAddress ||
          req.socket.remoteAddress ||
          req.connection.socket.remoteAddress;
        const data = { ...req.body, ipAdress };
        console.log(data);
        const isAvailable = await Comment.add(data);
        res.status(200).json(isAvailable);
      }
    })
    .catch((error) => console.log({ error }));
};

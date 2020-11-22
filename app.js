const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/blog");
const adminRouter = require("./routes/admin");

const mongoose = require("mongoose");
const User = require("./crud/User");
const SystemInformation = require("./crud/SystemInformation");

//db
require("./config/db")();
const Article2 = require("./crud/Article");
Article2.getFull();
const Article = require("./models/Article");
const Category = require("./models/Category");
// const User = require("./models/User");
const Comment = require("./models/Comment");
const slugify = require("slugify");
let name = "site";
const s = new Category({
  name,
  url: slugify(name, {
    replacement: "-",
    remove: undefined,
    lower: true,
    strict: false,
    locale: "vi",
  }),
});
// s.save();
let title =
  "Bilgisayar Oyunu Kalitesinde Mobil Oyun: Archero | Oyun İncelemesi";

const newSc = new Article({
  title,
  url: slugify(title, {
    replacement: "-",
    remove: undefined,
    lower: true,
    strict: false,
    locale: "vi",
  }),
  category: mongoose.Types.ObjectId("5fb94b307a6c213f66d95432"),
  mainImage: "https://nolurbak.com/wp-content/uploads/2020/11/archero.png.webp",
  creater: mongoose.Types.ObjectId("5fb8fa8c26cdfc239c4276b9"),
  content:
    "<p>Bildiğiniz gibi mobil oyunlar son zamanlarda hepimizin hayatına giriyor. Uzun seyahatlerde, keyifsiz beklemelerde bizi boğulmaktan kurtaran bu kaçış araçları maalesef her zaman istediğimiz kadar eğlenceli olamayabiliyor. Ben de oynarken eğlendirecek, aynı zamanda para avcılarının ağına takılmamıza gerek kalmayacak bir oyun arayışına çıktım. Sonunda bu oyunu buldum!  Archero, iOS ve Android platformlarında Habby tarafından 24 Mart 2019 tarihinde yayınlanmış bir mobil oyun. Oyunda zindanlardan rakiplerini alt ederek sağ çıkmayı başarman gerek fakat söylendiği kadar kolay değil! Rakiplerinizi alt etmeniz için karakterinizi, eşyalarınızı ve yanınızdaki hayvanlarınızı geliştirmeniz gerekiyor. Ayrıca girdiğiniz zindandaki yaratıkların türlerine göre, seviye atladığınızda kazanacağınız özelliğin ne olacağına dikkat etmeniz gerek. Her zindanda gitgide zorlaşan yaratıklar, kendinizi geliştirmeniz için motive ediyor. Karakterinizin geliştirmelerini hallettikten sonra geriye kalan tek şey zindana girip o yaratıkları yerle bir etmek!</h4>",
  shortContent:
    "<p>Mobilde karakter gelişim odaklı okçuluk oyunu mu olurmuş?</p>",
  comments: [],
  tags: ["oyun"],
});

// newSc.save();

const expressLayouts = require("express-ejs-layouts");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(async (req, res, next) => {
  const creater = await User.getOwner();
  res.locals.creater = creater.data;
  const socialMedias = await SystemInformation.getInfo("social-medias");

  res.locals.socialMedias = socialMedias.data;
  // console.log(res.locals);
  next();
});

app.use("/", indexRouter);
app.use("/blog", usersRouter);
app.use("/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  console.log(err);
  res.locals.s = {
    currentInfo: {
      title: err.status,
    },
    siteInfo: {
      data: {
        headerPrefix: "error",
      },
    },
  };
  // render the error page
  res.status(err.status || 500);
  res.render("tema1/index/404", {
    layout: "tema1/layouts/blog",
  });
});

module.exports = app;

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/blog");
const adminRouter = require("./routes/admin");

const mongoose = require("mongoose");
const User = require("./crud/User");
const SystemInformation = require("./crud/SystemInformation");

const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

//db
require("./config/db")();

const expressLayouts = require("express-ejs-layouts");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);

//body parser middleware

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//flash middleware
app.use(cookieParser("tolgaand"));
app.use(
  session({
    cookie: {
      maxAge: 365 * 60 * 1000,
    },
    resave: true,
    saveUninitialized: true,
    secret: "tolgaand2",
  })
);
app.use(flash());

//passport
app.use(passport.initialize());
app.use(passport.session());

//body parser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(async (req, res, next) => {
  console.log(req.params);
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

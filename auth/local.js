const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/User");

passport.use(
  "user-login",
  new LocalStrategy(
    {
      usernameField: "email",
    },
    (email, password, done) => {
      User.findOne(
        {
          email,
        },
        (err, user) => {
          if (err) return done(err, null, "Bir hata olustu");
          if (!user) {
            return done(null, false, "Böyle bir email yok.");
          }

          bcrypt.compare(password, user.password, (err, res) => {
            if (res) {
              return done(null, user, "Başarıyla giriş yapıldı.");
            } else {
              return done(null, false, "Yanlış şifre girildi");
            }
          });
        }
      );
    }
  )
);
passport.serializeUser(function (user, done) {
  console.log("serialize");
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  console.log(id);
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

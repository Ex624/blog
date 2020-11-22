const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(
    "mongodb+srv://tolgaand:47017905126@cluster0-ziy63.mongodb.net/blogger",
    { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }
  );

  mongoose.connection.on("open", () => {
    console.log("MongoDB: Connected");
  });
  mongoose.connection.on("error", (err) => {
    console.log("MongoDB: Error", err);
  });

  mongoose.Promise = global.Promise;
};

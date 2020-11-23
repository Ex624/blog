const Article = require("../models/Article");
const slugify = require("slugify");
const mongoose = require("mongoose");
module.exports.getFull = () => {
  return new Promise((resolve, reject) => {
    Article.aggregate([
      {
        $sort: {
          createdDate: -1,
        },
      },
      {
        $lookup: {
          localField: "creater",
          from: "users",
          foreignField: "_id",
          as: "creater",
        },
      },
      { $unwind: "$creater" },
      {
        $lookup: {
          localField: "category",
          from: "categories",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      {
        $lookup: {
          localField: "comments",
          from: "comments",
          foreignField: "_id",
          as: "comments",
        },
      },

      {
        $project: {
          _id: 1,
          comments: 1,
          createdDate: 1,
          published: 1,
          tags: 1,
          title: 1,
          url: 1,
          mainImage: 1,
          content: 1,
          shortContent: 1,
          "category.name": 1,
          "category.url": 1,
          "creater.name": 1,
          "creater.username": 1,
          "creater.permission": 1,
          comments: 1,
        },
      },
    ]).then((d) => {
      if (d) resolve({ success: true, data: d });
      else resolve({ success: false });
    });
  });
};

module.exports.save = ({ title, shortContent, content, tags, category }) => {
  return new Promise((resolve, reject) => {
    const newSc = new Article({
      title,
      url: slugify(title, {
        replacement: "-",
        remove: undefined,
        lower: true,
        strict: false,
        locale: "vi",
      }),
      category: mongoose.Types.ObjectId(category),
      mainImage:
        "https://nolurbak.com/wp-content/uploads/2020/11/archero.png.webp",
      creater: mongoose.Types.ObjectId("5fb8fa8c26cdfc239c4276b9"),
      content,
      shortContent,
      comments: [],
      tags,
      createdDate: Date.now(),
    });

    newSc.save().then((d) => {
      console.log(d);
      if (d) resolve({ success: true, message: "Başarıyla yayınlandı" });
      else esolve({ success: false, message: "Bilinmeyen bir hata oluştu" });
    });
  });
};

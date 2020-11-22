const Article = require("../models/Article");

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

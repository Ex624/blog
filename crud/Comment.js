const Comment = require("../models/Comment");
const Article = require("../models/Article");
const moment = require("moment"); // require
moment.locale("tr");
const saveArticle = (postID, commentID) => {
  return new Promise((resolve, reject) => {
    Article.findOne({ _id: postID })
      .then((d) => {
        if (d) {
          d.comments.push(commentID);
          d.save().then((o) => {
            if (o)
              resolve({
                success: true,
                message: "Yorumunuz başarıyla eklendi",
              });
            else
              resolve({
                success: false,
                message: "Bilinmeyen bir hata oluştu.",
              });
          });
        } else
          resolve({
            success: false,
            message: "Bilinmeyen bir hata oluştu.",
          });
      })
      .catch(() => {
        resolve({
          success: false,
          message: "Yorum atılacak blog yazısı bulunamadı",
        });
      });
  });
};

module.exports.add = async ({
  comment,
  author,
  email,
  url,
  postID,
  ipAdress,
}) => {
  return new Promise((resolve, reject) => {
    if (!(comment || author || email))
      return resolve({
        success: false,
        message: "Lütfen boş alan bırakmayınız",
      });

    if (comment.length >= 300)
      return resolve({
        success: false,
        message: "Mesaj alanı en fazla 300 karakter olabilir.",
      });

    if (author.length >= 25)
      return resolve({
        success: false,
        message: "İsim alanı en fazla 25 karakter olabilir",
      });

    if (email.length >= 30)
      return resolve({
        success: false,
        message: "İsim alanı en fazla 25 karakter olabilir",
      });

    const newComment = new Comment({
      name: author,
      comment,
      ipAdress,
      email,
      website: url,
      createdDate: Date.now(),
    });

    newComment.save().then(async (d) => {
      let isAvailable = await saveArticle(postID, d._id);
      resolve({
        ...isAvailable,
        time: moment(d.createdDate).format(`DD MMMM, YYYY - HH:mm`),
      });
    });
  });
};

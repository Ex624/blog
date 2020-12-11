const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin");
const adminMD = require("../middleWare/admin");

/* GET users listing. */
router.get("/login", adminMD, adminController.getLoginPage);
router.get("/", adminMD, adminController.getHomePage);
router.get("/blog/add", adminMD, adminController.getBlogAddPage);
router.get(
  "/commentDetails/:id",
  adminMD,
  adminController.getCommentDetailsPage
);

router.post("/blog/add", adminMD, adminController.postSaveArticle);
router.post("/login", adminMD, adminController.postLogin);

module.exports = router;

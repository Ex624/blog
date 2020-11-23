const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin");
const adminMD = require("../middleWare/admin");

/* GET users listing. */
router.get("/login", adminMD, adminController.getLoginPage);
router.get("/", adminMD, adminController.getHomePage);
router.get("/blog/add", adminMD, adminController.getBlogAddPage);

router.post("/blog/add", adminMD, adminController.postSaveArticle);

module.exports = router;

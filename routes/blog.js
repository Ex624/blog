const express = require("express");
const router = express.Router();
const blogController = require("../controller/blog");
const blogMD = require("../middleWare/blog");

/* GET */
router.get("/", blogMD, blogController.getHomePage);
router.get("/latest", blogMD, blogController.getLatestPage);
router.get("/single/:title", blogMD, blogController.getSingleTitlePage);

/* POST */
router.post("/comment", blogMD, blogController.postComment);

module.exports = router;

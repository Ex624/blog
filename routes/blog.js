const express = require("express");
const router = express.Router();
const blogController = require("../controller/blog");

/* GET users listing. */
router.get("/", blogController.getHomePage);
router.get("/latest", blogController.getLatestPage);
router.get("/single", blogController.getSinglePage);

module.exports = router;

const express = require("express");
const router = express.Router();
const indexController = require("../controller/index");
const indexMD = require("../middleWare/index");

router.get("/", indexMD, indexController.getHomePage);
router.get("/about", indexMD, indexController.getAboutPage);
router.get("/resume", indexMD, indexController.getResumePage);
router.get("/contact", indexMD, indexController.getContactPage);
router.get("/portfolio", indexMD, indexController.getPortfolioPage);
router.get("/portfolio1", indexMD, indexController.getPortfolio1Page);

module.exports = router;

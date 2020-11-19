const express = require("express");
const router = express.Router();
const indexController = require("../controller/index");

router.get("/", indexController.getHomePage);
router.get("/about", indexController.getAboutPage);
router.get("/resume", indexController.getResumePage);
router.get("/contact", indexController.getContactPage);
router.get("/portfolio", indexController.getPortfolioPage);
router.get("/portfolio1", indexController.getPortfolio1Page);

module.exports = router;

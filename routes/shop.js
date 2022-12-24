const express = require("express");
const router = express.Router();
const { index,getMenu } = require("../controllers/shopController");


router.get("/", index);
router.get("/menu", getMenu);

module.exports = router;
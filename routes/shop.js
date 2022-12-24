const express = require("express");
const router = express.Router();
const { index,getMenu,getShopMenu } = require("../controllers/shopController");


router.get("/", index);
router.get("/menu", getMenu);
router.get("/:id", getShopMenu);

module.exports = router;
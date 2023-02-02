const express = require("express");
const router = express.Router();
const { index,shop, menu,insert } = require("../controllers/shopController");
const { body } = require("express-validator");


router.get("/", index);
router.get("/menu", menu);
router.get("/:id", shop);

router.post(
    "/",
    [
      body("name").not().isEmpty().withMessage("กรุณาป้อนชื่อร้านค้าด้วย"),
      body("location.lat")
        .not()
        .isEmpty()
        .withMessage("กรุณาป้อนละติจูดด้วย")
        .isNumeric()
        .withMessage("ละติจูดต้องเป็นตัวเลขเท่านั้น"),
      body("location.lgn")
        .not()
        .isEmpty()
        .withMessage("กรุณาป้อนลองจิจูดด้วย")
        .isNumeric()
        .withMessage("ลองจิจูดต้องเป็นตัวเลขเท่านั้น"),
    ],
    insert
  );

module.exports = router;
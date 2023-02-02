const express = require("express");
const router = express.Router();
const {
  staff,
  insert,
  show,
  remove,
  update,
} = require("../controllers/staffController");
const { body } = require("express-validator");

router.get("/", staff);
router.get("/:id", show);
router.put("/:id", update);
router.delete("/:id", remove);

router.post(
  "/",
  [body("name").not().isEmpty().withMessage("กรุณาป้อนชื่อ-สกุลด้วย")],
  insert
);

module.exports = router;
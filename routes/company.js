const express = require("express");
const router = express.Router();
const {
  getall,
  insert,
  update,
  remove,
   getone,
} = require("../controllers/companyController");
const { isAdmin } = require("../middleware/checkAdmin");
const { isLogin } = require("../middleware/passwordJWT");


router.get("/",[isLogin, isAdmin], getall);
router.get("/:id", getone);
router.put("/:id", update);
router.delete("/:id", remove);
router.post("/", insert);

module.exports = router;
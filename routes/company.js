const express = require("express");
const router = express.Router();
const {
  getall,
  insert,
  update,
  remove,
   getone,
} = require("../controllers/companyController");
const passportJWT = require('../middleware/passportJWT')


router.get("/",[passportJWT.isLogin], getall);
router.get("/:id", getone);
router.put("/:id", update);
router.delete("/:id", remove);
router.post("/", insert);

module.exports = router;
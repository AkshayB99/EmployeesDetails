const express = require("express");
const adminController = require("../controllers/adminController");

const router = express.Router();

router.post("/signup", adminController.signup);
router.post("/login", adminController.login);
router.get("/logout", adminController.logOut);

module.exports = router;

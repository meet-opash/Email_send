var express = require("express");

var router = express.Router();
const customerRoutes = require("./contact");
const authRoutes = require("./auth");

router.use("/contacts", customerRoutes);
router.use("/auth", authRoutes);

module.exports = router;

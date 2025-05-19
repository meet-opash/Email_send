var express = require("express");
const authCtrl = require("../../controllers/auth.controller");

var router = express.Router();

router.post('/signup', authCtrl.userSignup);
router.post('/login', authCtrl.userLogin);
module.exports = router;

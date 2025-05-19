var express = require("express");
const contactCtrl = require("../../controllers/contact.controller");

var router = express.Router();

router.get(
    "/", 
    contactCtrl.getContacts
)

router.post(
    "/add", 
    contactCtrl.addContact
)

module.exports = router;
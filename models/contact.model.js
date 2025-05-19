const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: Number, required: true },
    city: { type: String, required: true },
    email: { type: String, required: true, },
    message: { type: String, required: false },
}, { timestamps: true })

const ContactModel = mongoose.model('contacts', ContactSchema);

module.exports = ContactModel

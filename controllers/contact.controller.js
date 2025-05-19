const EmailHelper = require("../helpers/email.helper");
const ContactModel = require("../models/contact.model");
const environment = require("../utils/environment");
const { sendSuccessResponse, sendErrorResponse } = require("../utils/response");

exports.addContact = async (req, res) => {
    // console.log(req.body);
    
    try {
        let{ firstName, lastName, phone, city, email, message } = req.body;
        const contact = await ContactModel.create({ firstName, lastName, phone, city, email, message });
        console.log(contact);
        
        EmailHelper.sendEmail({
            email,
            EmailSubject: "Demo Contact Form",
            // EmailText: `Your account has been created successfully. Your login credentials are as follows: \nEmail: ${email} \nPassword: ${password}`,
            EmailHTML: `<p>Dear ${firstName} ${lastName},</p>
                <p>Welcome to Demo.</p>
                <p>Nice to meet you.</p>
                <p>Kind regards,</p>
                <p> Meet Sojitra</p>`,
          }).catch((err) => {
            console.log(err);
          });
        
        EmailHelper.receiveEmail({
            email: environment.smtp.email,
            EmailSubject: "Demo Contact Form",
            EmailHTML: `<p>First Name: ${firstName}</p>
                <p>Last Name: ${lastName}</p>
                <p>Phone: ${phone}</p>
                <p>City: ${city}</p>
                <p>Email: ${email}</p>
                <p>Message: ${message}</p>`,
        })
        return sendSuccessResponse(res, {
            message: "Contact added successfully",
            email,
            data: contact
        });
    } catch (error) {
        return sendErrorResponse(res, error.message, 500);
    }
}
exports.getContacts = async (req, res) => {
    try {
        const contacts = await ContactModel.find();
        return sendSuccessResponse(res, {
            message: "Contacts fetched successfully",
            data: contacts
        });
    } catch (error) {
        return sendErrorResponse(res, error.message, 500);
    }
}
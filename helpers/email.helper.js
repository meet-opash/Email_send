const environment = require("../utils/environment");
const nodemailer = require("nodemailer");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: environment.smtp.email,
    pass: environment.smtp.pass,
  },
});

const EmailHelper = {
  sendEmail: ({
    email,
    EmailSubject,
    EmailText,
    EmailHTML,
    attachment = [],
  }) => {
    return new Promise((resolve, reject) => {
      try {

      if (!email) {        
        return reject("No recipients defined");
      }

      if (!emailRegex.test(email)) {        
        return reject("Invalid email format");
      }

        let mailOptions = {
          from: environment.smtp.email,
          to: email,
          subject: EmailSubject,
          text: EmailText,
          html: EmailHTML,
        };

        if (attachment.length > 0) {
          mailOptions.attachments = attachment;
        }

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email: ", error);
            return reject(error);
          }
          console.log("Email sent: ", info);
          resolve(info);
        });
      } catch (error) {
        console.error("This is an error in email => ", error);
        reject(error);
      }
    });
  },

  receiveEmail:({
    email,
    EmailSubject,
    EmailText,
    EmailHTML,
    attachment = [],
  }) => {
    return new Promise((resolve, reject) => {
      try {

      if (!email) {        
        return reject("No recipients defined");
      }

      if (!emailRegex.test(email)) {        
        return reject("Invalid email format");
      }

        let mailOptions = {
          from: environment.smtp.email,
          to: environment.smtp.email,
          subject: EmailSubject,
          text: EmailText,
          html: EmailHTML,
        };

        if (attachment.length > 0) {
          mailOptions.attachments = attachment;
        }

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email: ", error);
            return reject(error);
          }
          console.log("Email sent: ", info);
          resolve(info);
        });
      } catch (error) {
        console.error("This is an error in email => ", error);
        reject(error);
      }
    });
  },
};

module.exports = EmailHelper;

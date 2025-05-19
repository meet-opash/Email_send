require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  database: {
    uri: process.env.DB_URI,
    dbName: process.env.DB_NAME,
  },
  // jwt: {
  //   secret: process.env.JWT_SECRET,
  //   expiredIn: process.env.JWT_EXPIRED_IN,
  // },
  // sendGridAPIKey: process.env.SENDGRID_API_KEY,
  // frontendurl: process.env.FRONTEND_URL,
  // appurl: process.env.APP_URL,
  serverURL: process.env.SERVER_URL,
  // calculate: { ocrApiUrl: process.env.OCR_API_URL },
  smtp: {
    email: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
};

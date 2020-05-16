const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "dmytrorysan@gmail.com",
    pass: "coolstar",
  },
});

module.exports = transporter;

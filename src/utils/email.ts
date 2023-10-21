const nodemailer = require('nodemailer');

const gMail = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: process.env.Mail,
    pass: process.env.MAIL_PASS,
  },
});

exports.gMail = gMail;

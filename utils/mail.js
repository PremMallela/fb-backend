import nodemailer from 'nodemailer';

var mailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASS
    }
  });

export default mailer;
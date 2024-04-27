import nodemailer from 'nodemailer';
import 'dotenv/config'
var mailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASS
    }
  });

export default mailer;
import mailer from "../../utils/mail.js";
import { generateOTP, otpMap } from "../../utils/otp.js";

function getOTPHandler(req,res) {

    const email = req.body.email;

    if(!email) {
        res.status(400).json({
            error:'invalid email'
        })
    }

    const otp = generateOTP();

    var mailOptions = {
        from: process.env.MAILER_EMAIL,
        to: email,
        subject: 'FastBills | Verify your email',
        text: `Please use this ${otp} to verify your email. \n Thanks for registering with us`
      };

    mailer.sendMail(mailOptions, function(error, info){
        if (error) {
            res.status(400).send("Failed to send mail");
            return;
        } else {
            otpMap.set(email,otp);
            res.status(200).send("otp sent to mail");
            return;
        }
      });

}

export default getOTPHandler
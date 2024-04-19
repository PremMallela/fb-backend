import User from "../data-model/UserModel.js"
import { signToken } from "../utils/jwt.js"
import { otpMap } from "../utils/otp.js"
import { isValidMobileNumber } from "../utils/validators.js"

function loginHandler(req, res) {

    const userBody = req.body

    if(!userBody.email){
        res.status(400)
            .json({
                error:{
                    message:"Email is either not defined or invalid"
                }
            })
    }

    if(!userBody.otp){
        res.status(400)
            .json({
                error:{
                    message:"otp is either not defined or invalid"
                }
            })
    }

    const sentOTP = otpMap.get(userBody.email);

    if(!sentOTP){
        res.status(400).send("OTP Expired");
        return;
    }

    if(sentOTP === userBody.otp) {
        const user = new User(userBody)

        User.findOne({ email:userBody.email }).exec()
            .then(user => {
                const token  = signToken({
                    userDetails:{
                        id:user._id,
                        email:user.email,
                        name:user.name
                    }
                })

                otpMap.delete(user.email);

            res.cookie("token",token, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "none",
            secure: true })

            res.json({
                message:"login successful",
                userDetails:{
                    id:user._id,
                    email:user.email,
                    name:user.name
            }})
        })
        .catch(error => {
            res.status(404).json({
                error:{
                    message:"User Not Registered"
                }
            })
        })
    }else{
        res.status(400).send("error invalid otp");
        return;
    }

}

export default loginHandler
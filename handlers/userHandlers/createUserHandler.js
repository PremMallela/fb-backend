import User from "../../data-model/UserModel.js"
import { otpMap } from "../../utils/otp.js"
import { isValidMobileNumber, isValidName } from "../../utils/validators.js"

 function createUserHandler(req, res) {

    const userBody = req.body

    if(!userBody.email){
        res.status(400)
            .json({
                error:{
                    message:"Email is either not defined or invalid"
                }
            })
    }

    if(!userBody.name || !isValidName(userBody.name) ){
        res.status(400)
            .json({
                error:{
                    message:"Name is either not defined or invalid"
                }
            })
    }

    if(!userBody.business_name || !isValidName(userBody.business_name)){
        res.status(400)
            .json({
                error:{
                    message:"Business Name is either not defined or invalid"
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

        user.save()
            .then(savedUser => {
                res.status(201).json({
                    savedUser
                })
            })
            .catch(error => {
                res.status(500).json({
                    error:{
                        message:"Internal Server Error",
                        error:error
                    }
                })
            })
    }else{
        res.status(400).send("error invalid otp");
        return;
    }

}

export default createUserHandler
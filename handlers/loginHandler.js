import User from "../data-model/UserModel.js"
import { signToken } from "../utils/jwt.js"
import { isValidMobileNumber } from "../utils/validators.js"

function loginHandler(req, res) {

    const userBody = req.body

    if(!userBody.mobile || !isValidMobileNumber(userBody.mobile)){
        res.status(400)
            .json({
                error:{
                    message:"Mobile Number is either not defined or invalid"
                }
            })
    }

    User.findOne({ mobile:userBody.mobile }).exec()
        .then(user => {
            const token  = signToken({
                userDetails:{
                    id:user._id,
                    mobile:user.mobile,
                    name:user.name
                }
            })
    
        res.cookie("token",token, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true })

        res.json({
            message:"login successful",
            userDetails:{
                 id:user._id,
                 mobile:user.mobile,
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

}

export default loginHandler
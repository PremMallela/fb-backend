import User from "../data-model/UserModel.js";
import { signToken } from "../utils/jwt.js";
import { isValidMobileNumber } from "../utils/validations.js";

function loginHandler(req, res) {

    const userBody = req.body;

    if(!userBody.mobile || !isValidMobileNumber(userBody.mobile)){
        res.status(400)
            .json({
                error:{
                    message:"Mobile Number is either not defined or invalid"
                }
            });
    }

    User.findOne({mobile:userBody.mobile}).exec()
    .then(user => {
        const token  = signToken({
            userDetails:{
                id:user._id,
                mobile:user.mobile,
                name:user.name
            }
        });
    
        res.cookie("token",token, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true });

        res.send({
            message:"login successful",
            userDetails:{
                 id:user._id,
                 mobile:user.mobile,
                 name:user.name
        }});
    })
    .catch(error => {
        res.status(500).json({
            error:{
                message:"Internal Server Error"
            }
        });
    });

}

export default loginHandler;
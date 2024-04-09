import User from "../../data-model/UserModel.js"
import { isValidMobileNumber, isValidName } from "../../utils/validators.js"

 function createUserHandler(req, res) {

    const userBody = req.body

    if(!userBody.mobile || !isValidMobileNumber(userBody.mobile)){
        res.status(400)
            .json({
                error:{
                    message:"Mobile Number is either not defined or invalid"
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

    const user = new User(userBody)

    user.save()
        .then(savedUser => {
            res.status(200).json({
                created:true
            })
        })
        .catch(error => {
            res.status(500).json({
                error:{
                    message:"Internal Server Error"
                }
            })
        })

}

export default createUserHandler
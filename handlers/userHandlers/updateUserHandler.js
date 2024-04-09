import User from  '../../data-model/UserModel.js'
import { isValidMobileNumber } from '../../utils/validators.js'
import { isValidName } from '../../utils/validators.js'

export default function updateUserHandler(req,res){
    const userDetails= req.userDetails
    const {mobile, name, business_name} = req.body
    const updateUserBody = {} 

    if (!mobile && !name && !business_name) {
        return res.status(400).json({
            message: `At least one field (mobile, name, or business_name) is required for update`
        })
    }

    if(mobile){ 
        if(!isValidMobileNumber(mobile)){
            res.status(400).json({
                message : `Invalid Mobile Number`
            })
            return
        }
        updateUserBody.mobile = mobile
    }

    if(name){ 
        if(!isValidName(name)){
            res.status(400).json({
                message : `Invalid Name`
            })
            return
        }
        updateUserBody.name = name
    }

    if(business_name){ 
        if(!isValidName(business_name)){
            res.status(400).json({
                message : `Invalid Business Name`
            })
            return
        }
        updateUserBody.business_name = business_name
    }

    User.findOneAndUpdate({ _id: userDetails.id },updateUserBody).exec()
        .then((user)=>{
            res.status(201).json(user)
        })
        .catch((error) =>{
            res.status(500).json({
                error : error.message
            })
        })
}
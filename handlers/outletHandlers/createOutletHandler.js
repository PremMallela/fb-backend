import Outlet from "../../data-model/OutletModel.js"
import { isValidName } from "../../utils/validators.js"

function createOutletHandler(req,res){
    const outletDetails = req.body
    const userId = req.userDetails.id
    const fileData = req.file

    if(!outletDetails){
        req.status(400)
            .json({
                message:"Please provide required Outlet details."
            })
    }
    if(!outletDetails.name || !isValidName(outletDetails.name)){
        res.status(400)
            .json({
                message:"outletName is either not defined or invalid"
            })
    }
    if(!outletDetails.location || !isValidName(outletDetails.location)){
        res.status(400)
            .json({
                message:"outletLocation is either not defined or invalid"
            })
    }

    if(!fileData){
        res.status(422)
            .json({
                message :"No Logo-Image Provided"
            })
        }
        
    outletDetails.user_id = userId
    outletDetails.logoPath =  `http://localhost:8080/assets/uploads/${fileData.filename}`

    const outlet = new Outlet(outletDetails)

    outlet.save()
            .then(()=>{
                res.status(201)
                .json({
                    message :`created`,
                    outlet
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

export default createOutletHandler
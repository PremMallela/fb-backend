import Menu from "../../data-model/MenuModel.js"
import Outlet from "../../data-model/OutletModel.js"
import { isValidName } from "../../utils/validators.js"

function createOutletHandler(req,res){

    const outletDetails = JSON.parse(req.body.outlet)
    const userId = req.userDetails.id
    const images = req.files

    if(!outletDetails){
        res.status(400)
            .json({
                message:"Outlet details missing"
            })
    }

    if(!outletDetails.name || !isValidName(outletDetails.name)){
        res.status(400)
            .json({
                message:"outlet name is either not defined or invalid"
            })
    }
    if(!outletDetails.location || !isValidName(outletDetails.location)){
        res.status(400)
            .json({
                message:"outlet location is either not defined or invalid"
            })
    }
        
    outletDetails.user_id = userId
    if(images.length>0) outletDetails.logo = images[0].filename;

    const outlet = new Outlet(outletDetails)

    outlet.save()
            .then((savedOutlet)=>{

                const menu = new Menu({outletId:savedOutlet._id})
                
                menu.save().then(savedMenu => {
                    res.status(201)
                    .json({
                        message :`created`,
                        savedOutlet
                    })
                })
                .catch(error => {
                    res.status(500).json({
                        error:{
                            message:"Internal Server Error"
                        }
                    })
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
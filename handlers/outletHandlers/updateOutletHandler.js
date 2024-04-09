import Outlet from "../../data-model/OutletModel.js"

function updateOutletHandler(req, res){
    
        const outletId =  req.params.outletId
        const outletBody = req.body
        const updateOutletBody = {}

        if(!outletId|| !outletBody) {
                res.status(400).json({
                        message : "No data provided for update"
                })
        }

        if(outletBody.name){
                updateOutletBody.name = outletBody.name
        }

        if(outletBody.location){
                updateOutletBody.location = outletBody.location
        }

    Outlet.findOneAndUpdate({_id : outletId },updateTagBody).exec()
                .then((originalOutlet)=>{
                        if(originalOutlet){
                            res.status(201).json({
                                message :`Updated this ${originalOutlet}`
                              })
                        }
                        else {
                            res.status(404).json({
                                message: 'Outlet not found' 
                              })
                        }
                })
                .catch((error) => {
                        res.status(500).json({
                            error:error.message ||"Internal Server Error"
                        })
                })
}

export default updateOutletHandler
import Outlet from "../../data-model/OutletModel.js"

function  getOutlet(req, res) {
    
    const id = req.params.id;
    const userDetails = req.userDetails

    Outlet.findOne({_id:id, user_id:userDetails.id}).exec()
            .then(outlet => {
                if(outlet){
                    res.status(200).json(
                        outlet
                    )
                }
                else {
                    res.status(404).json({
                        message: "No outlet found in this id account"
                    })
                }
                
            })
            .catch(error => {
                res.status(500).json({
                    error:{
                        message:"Internal Server Error"
                    }
                })
            })

}

export default  getOutlet

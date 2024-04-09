import Outlet from "../../data-model/OutletModel.js"

function  getAllOutlets(req, res) {
    
    const userDetails = req.userDetails
    
    Outlet.find({user_id:userDetails.id}).exec()
            .then(outlets => {
                if(outlets){
                    res.status(200).json(
                        outlets
                    )
                }
                else {
                    res.status(404).json({
                        message: "No outlets found in this users' account"
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

export default  getAllOutlets

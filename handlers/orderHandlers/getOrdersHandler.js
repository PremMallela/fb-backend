import Order from "../../data-model/OrderModel.js"


function getOrdersHandler(req, res) {
    
    const userDetails = req.userDetails
    const outletId = req.params.outletId

    const defaultQuery = {outletId}

    Order.find(defaultQuery).exec()
            .then((orders)=>{
                if(orders){
                    res.status(200).json(
                        orders
                    )
                }
                else {
                    res.status(404).json({
                        message: "No products found in this users' account"
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

export default getOrdersHandler

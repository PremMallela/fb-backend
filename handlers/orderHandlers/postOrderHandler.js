import Order from './../../data-model/OrderModel.js'

function createOrderHandler(req,res){

    const orderDetails = req.body;

    if(!orderDetails) {
        res.status(400)
            .json({
                    message: "Inavlid body"
            })
        return;
    }

    const userDetails = req.userDetails    
    
    if(!userDetails || !userDetails.id ){
        res.status(400)
            .json({
                    message: "User is not Logged in"
            })
        return;
    }

    const order = new Order(orderDetails);

    order.save()
            .then(savedProduct => {
                res.status(201).json(
                    savedProduct
                )
            })
            .catch(error => {
                res.status(500).json({
                     error :error.message || "Internal server error"
                })
            })

}

export default createOrderHandler
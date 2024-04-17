import Menu from "../../data-model/MenuModel.js";
import Product from "../../data-model/ProductModel.js";

function  getMenuHandler(req, res) {
    
    const id = req.params.outletId;
    const userDetails = req.userDetails

    Menu.findOne({outletId:id}).exec()
            .then(menu => {
                if(menu){

                    Product.find({ _id:{ $in: menu.products }, user_id:userDetails.id})
                        .then(products => {
                            res.status(200).json(
                                products
                            )
                        })
                        .catch(error => {
                            res.status(404).json({
                                message: "No menu found in this id account"
                            })
                        })

                }
                else {
                    res.status(404).json({
                        message: "No menu found in this id account"
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

export default  getMenuHandler
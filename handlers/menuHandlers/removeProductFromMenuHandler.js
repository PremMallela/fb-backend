import Menu from "../../data-model/MenuModel.js";
import Product from "../../data-model/ProductModel.js";

function  removeProductToMenuHandler(req, res) {
    
    const id = req.params.outletId;
    const userDetails = req.userDetails
    const productId = req.body.productId;

    Menu.findOne({outletId:id}).exec()
            .then(menu => {
                if(menu){

                    menu.products = menu.products.filter(prodId => prodId.toString() !== productId);

                    menu.save()
                        .then(menu => {
                            res.status(200).json(
                                menu
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

export default  removeProductToMenuHandler
import Category from "../../data-model/CategoryModel.js";
import Menu from "../../data-model/MenuModel.js";
import Product from "../../data-model/ProductModel.js";

function getMenuHandler(req, res) {
    
    const id = req.params.outletId;
    const userDetails = req.userDetails

    Menu.findOne({outletId:id}).exec()
            .then(menu => {
                if(menu){

                    Product.find({ _id:{ $in: menu.products }, user_id:userDetails.id})
                    .populate('category')
                    .populate('tags')
                    .then(products => {
                        const categories = Array.from(new Set(products.map(product => product.category)));
                        const tags = Array.from(new Set(products.flatMap(product => product.tags)));

                        res.status(200).json({
                            products,
                            categories,
                            tags
                        });
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
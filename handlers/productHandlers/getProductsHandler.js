import Product from "../../data-model/ProductModel.js"

function getProductsHandler(req, res) {
    
    const userDetails = req.userDetails
    const body = req.body;
    const filter = {};

    if(body.category) {
        filter.category = body.category;
    }

    if(body.tags && body.tags.length > 0) {
        filter.tags = { $in: body.tags }
    }

    if(body.searchKey && body.searchKey.trim().length > 0) {
        filter.name = { $regex: body.searchKey, $options: 'i' };
    }

    const defaultQuery = { user_id: userDetails.id, ...filter}

    Product.find(defaultQuery).exec()
            .then((products)=>{
                if(products){
                    res.status(200).json(
                        products
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

export default getProductsHandler

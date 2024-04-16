import Product from "../../data-model/ProductModel.js"

function getProductsHandler(req, res) {
    
    const userDetails = req.userDetails
    const categoryId = req.query.categoryId
    const tagIds = req.query.tagIds

    const defaultQuery = { user_id: userDetails.id}

    if (categoryId) {
        defaultQuery.categoryId = categoryId
    }
    if (tagIds && tagIds.length > 0) {
        defaultQuery.tagIds = { $all: tagIds }
    }

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

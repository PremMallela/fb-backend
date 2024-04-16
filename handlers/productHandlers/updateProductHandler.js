import Product from "../../data-model/ProductModel.js"

function updateProductHandler(req, res){
    
        const productId =  req.params.productId
        const productBody = req.body
        const { name,description,categoryId,tagIds,uom,ppu } =  productBody
        const updateProductBody = {}
        updateProductBody.tagIds=[]

        if(!productId|| !productBody) {
                res.status(400).json({
                        message : "No data provided for update"
                })
        }

        if(name){
                updateProductBody.name = name
        }

        if(description){
                updateProductBody.description = description
        }

        if(categoryId){
            updateProductBody.categoryId = categoryId
        } 

        if (tagIds && tagIds.length > 0) {
           
        } 

        if(uom){
            updateProductBody.uom = uom
        }  

        if(ppu){
            updateProductBody.ppu = ppu
        }    

    Product.findOneAndUpdate({_id : productId },updateProductBody).exec()
                .then((originalProduct)=>{
                        if(originalProduct){
                            res.status(201).json({
                                message :`Updated the below product`,
                                product :originalProduct
                              })
                        }
                        else {
                            res.status(404).json({
                                message: 'Product not found' 
                              })
                        }
                })
                .catch((error) => {
                        res.status(500).json({
                            error:error.message ||"Internal Server Error"
                        })
                })
}

export default updateProductHandler
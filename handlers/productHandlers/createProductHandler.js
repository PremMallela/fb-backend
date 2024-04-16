import Product from "../../data-model/ProductModel.js"
import { isValidName } from "../../utils/validators.js"

function createProductHandler(req,res){

    const productDetails = req.body
    const userDetails = req.userDetails
    const fileData = req.file    
    
    if(!userDetails || !userDetails.id ){
        res.status(400)
            .json({
                    message: "User is not Logged in"
            })
    }
    else if(!productDetails.name ||  !isValidName(productDetails.name)){
        res.status(400)
            .json({
                    message:"ProductName is either not defined or invalid"
            })
    }

    if(!productDetails.description || !isValidName(productDetails.description)){
        res.status(400)
            .json({
                    message:"ProductDescription is either not defined or invalid"
            })
    }
    
    if(!productDetails.categoryId ){
        res.status(400)
            .json({
                    message:"Product's CategoryId is either not defined or invalid"
            })
    }

    if( !productDetails.tagIds ){
        res.status(400)
            .json({
                    message:"Product's TagIds were either not defined or invalid"
            })
    }

    if( !productDetails.uom ){
        res.status(400)
            .json({
                    message:"Product's Unit of measurement(uom) is either not defined or invalid"
            })
    }

    if( !productDetails.ppu ){
        res.status(400)
            .json({
                    message:"Product's Price per Unit (ppu) is either not defined or invalid"
            })
    }

    if(!fileData){
        res.status(422)
            .json({
                message :"No Logo-Image Provided"
            })
    }
        
    productDetails.user_id = userDetails.id
    productDetails.imagePath =  `http://localhost:8080/assets/uploads/${fileData.filename}`
    

    productDetails.user_id = userDetails.id

    const product = new Product(productDetails)

    product.save()
            .then(savedProduct => {
                res.status(201).json({
                    message : `Product '${savedProduct.name}' has been created`
                })
            })
            .catch(error => {
                res.status(500).json({
                     error :error.message || "Internal server error"
                })
            })

}

export default createProductHandler
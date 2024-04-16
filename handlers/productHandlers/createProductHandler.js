import Product from "../../data-model/ProductModel.js"
import { isValidName } from "../../utils/validators.js"

function createProductHandler(req,res){

    if(!req.body.product) {
        res.status(400)
            .json({
                    message: "Inavlid body"
            })
        return;
    }

    const productDetails = JSON.parse(req.body.product);
    const images = req.files
    const userDetails = req.userDetails    
    
    if(!userDetails || !userDetails.id ){
        res.status(400)
            .json({
                    message: "User is not Logged in"
            })
        return;
    }

    if(!productDetails.name ||  !isValidName(productDetails.name)){
        res.status(400)
            .json({
                    message:"ProductName is either not defined or invalid"
            })
        return;
    }
    
    if(!productDetails.category ){
        res.status(400)
            .json({
                    message:"Product's CategoryId is either not defined or invalid"
            })
        return;
    }

    if( !productDetails.UOM ){
        res.status(400)
            .json({
                    message:"Product's Unit of measurement(uom) is either not defined or invalid"
            })
        return;
    }

    if( !productDetails.PPU ){
        res.status(400)
            .json({
                    message:"Product's Price per Unit (ppu) is either not defined or invalid"
            })
        return;
    }
        
    productDetails.user_id = userDetails.id
    productDetails.images = [];
    images.map(image => {
        productDetails.images.push(image.filename);
    })

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
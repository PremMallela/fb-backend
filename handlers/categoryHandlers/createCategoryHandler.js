import Category from "../../data-model/CategoryModel.js"
import { isValidName } from "../../utils/validations.js"

function createCategoryHandler(req,res) {

    const categoryDetails = req.body
    const categoryName = categoryDetails.name
    const userDetails = req.userDetails
   

    if(!categoryDetails || !categoryName || !userDetails || !userDetails.id || !isValidName(categoryName)){
        res.status(400)
            .json({
                    message:"Payload is either not defined or invalid"
            })
      }

    categoryDetails.user_id = userDetails.id

    const category = new Category(categoryDetails)

    category.save()
        .then(savedCategory => {
            res.status(200).json({
                created:true
            })
        })
        .catch(error => {
            res.status(500).json({
                error:{
                    message:"Internal Server Error"
                }
            })
        })

}

export default createCategoryHandler
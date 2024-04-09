import Category from "../../data-model/CategoryModel.js"
import { isValidName } from "../../utils/validators.js"

function createCategoryHandler(req,res) {

    const categoryDetails = req.body
    const categoryName = categoryDetails.name
    const userDetails = req.userDetails
   

    if(!categoryDetails || !categoryName || !userDetails || !userDetails.id || !isValidName(categoryName)){
        res.status(400)
            .json({
                    message:"CategoryName is either not defined or invalid"
            })
      }

    categoryDetails.user_id = userDetails.id

    const category = new Category(categoryDetails)

    category.save()
            .then(savedCategory => {
                res.status(201).json({
                    message : `Category '${savedCategory.name}' has been created`
                })
            })
            .catch(error => {
                res.status(500).json({
                     error :error.message || "Internal server error"
                })
            })

}

export default createCategoryHandler
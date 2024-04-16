import Category from "../../data-model/CategoryModel.js"

function updateCategoryHandler(req, res){

        const categoryId =  req.params.categoryId
        const categoryBody = req.body
        const updateCategoryBody = {}
        
        if(!categoryId) {
                res.status(400).json({
                        message : "No data provided for update"
                })
        }

        if(categoryBody.name){
                updateCategoryBody.name = categoryBody.name
        }
        
        Category.findOneAndUpdate({_id : categoryId },updateCategoryBody).exec()
                .then((originalCategory)=>{
                        if(originalCategory){
                                res.status(201).json({
                                    message :`Updated the below category`,
                                    product :originalCategory
                                  })
                        }
                        else {
                            res.status(404).json({
                                 message: 'Category not found' 
                                })
                        }
                        
                })
                .catch((error)=>{
                        res.status(500).json({
                                error :error.message || "Internal server error"
                        })
                })
}

export default updateCategoryHandler
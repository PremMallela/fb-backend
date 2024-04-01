import Category from "../../data-model/CategoryModel.js"

function updateCategoryHandler(req, res){
        // const userBody = req.userDetails
        const categoryBody =  req.body
        const updateCategoryBody = {}
        if(!categoryBody) {
                res.status(400).json({
                        message : "No data provided for update"
                })
        }

        if(categoryBody.name){
                updateCategoryBody.name = categoryBody.name
        }
        
        Category.findOneAndUpdate({_id : categoryBody.id },updateCategoryBody).exec()
                .then((category)=>{
                        res.status(201).json(category)
                })
                .catch((error)=>{
                        res.json({
                                error :error.message
                        })
                })
}

export default updateCategoryHandler
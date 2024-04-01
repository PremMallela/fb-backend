import Category from "../../data-model/CategoryModel.js"

function deleteCategoryHandler(req,res){
      
      const userId = req.userDetails.id
      const categoryId = req.body.categoryId
      
      Category.findOneAndDelete({ user_id: userId, _id :categoryId }).exec()
                .then((category) => {
                    if (category) {
                        res.status(200).json({
                            message: `Deleted Successfully`,
                        })
                    }
                    else{
                        res.status(404).json({
                            message: "Category Not Found"
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

 export default  deleteCategoryHandler  
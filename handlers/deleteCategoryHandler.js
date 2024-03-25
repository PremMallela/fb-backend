import Category from "../data-model/CategoryModel.js";

function deleteCategoryHandler(req,res){
      
      const userId = req.userDetails.id;
      const categoryName = req.body.categoryName;
      
      Category.findOneAndDelete({ user_id: userId, name :categoryName }).exec()
                    .then((category) => {
                        if (category) {
                            res.status(200).json({
                                message: `${JSON.parse(category)} Deleted Successfully`,
                            });
                        }
                        res.status(404).json({
                            message: "Category Not Found"
                        })
                      })
                    .catch(error => {
                            res.status(500).json({
                                error:{
                                    message:"Internal Server Error"
                                }
                            });
                        })
 }

 export default  deleteCategoryHandler;  
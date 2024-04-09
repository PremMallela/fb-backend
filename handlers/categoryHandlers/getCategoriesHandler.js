import Category from "../../data-model/CategoryModel.js"

function getCategoriesHandler(req, res) {

    const userDetails = req.userDetails

    Category.find({user_id:userDetails.id}).exec()
            .then(categories => {
                if(categories){
                    res.status(200).json(
                        categories
                    )
                }
                else {
                    res.status(404).json({
                        message: "No Categories found in this users' account"
                    })
                }
            })
            .catch((error) => {
                res.status(500).json({
                    error:error.message ||"Internal Server Error"
                })
            })
}

export default getCategoriesHandler
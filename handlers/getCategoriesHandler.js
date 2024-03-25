import Category from "../data-model/CategoryModel.js";

function getCategoriesHandler(req, res) {

    const userDetails = req.userDetails;

    Category.find({
        user_id:userDetails.id
    }).exec()
    .then(categories => {
        res.status(200).json(
            categories
        );
    })
    .catch(error => {
        res.status(500).json({
            error:{
                message:"Internal Server Error"
            }
        });
    })

}

export default getCategoriesHandler;
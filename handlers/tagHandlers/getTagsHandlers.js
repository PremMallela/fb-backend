import Tag from "../../data-model/TagModel.js"

function getTagsHandler(req, res) {

    const userDetails = req.userDetails

    Tag.find({user_id:userDetails.id}).exec()
            .then(Tags => {
                if(Tags){
                    res.status(200).json(
                        Tags
                    )
                }
                else {
                    res.status(404).json({
                        message: "No Tags found in this users' account"
                    })
                }
                
            })
            .catch((error) => {
                res.status(500).json({
                    error:error.message ||"Internal Server Error"
                })
            })

}

export default getTagsHandler

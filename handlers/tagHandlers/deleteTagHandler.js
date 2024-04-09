import Tag from "../../data-model/TagModel.js"

function deleteTagHandler(req,res){
      
      const userId = req.userDetails.id
      const tagId = req.params.tagId
      
    Tag.findOneAndDelete({ user_id: userId, _id :tagId }).exec()
            .then((tag) => {
                if (tag) {
                    res.status(202).json({
                        message: `Tag '${tag.name}' Deleted Successfully`,
                    })
                }
                else{
                    res.status(404).json({
                        message: "Tag Not Found"
                    })
                }
            })
            .catch((error) => {
                res.status(500).json({
                    error:error.message ||"Internal Server Error"
                })
            })
} 

 export default  deleteTagHandler  
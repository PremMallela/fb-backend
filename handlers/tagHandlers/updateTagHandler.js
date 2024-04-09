import Tag from "../../data-model/TagModel.js"

function updateTagHandler(req, res){
        
        const tagId =  req.params.tagId
        const tagBody = req.body
        const updateTagBody = {}

        if(!tagId  || !tagBody) {
                res.status(400).json({
                        message : "No data provided for update"
                })
        }

        if(tagBody.name){
                updateTagBody.name = tagBody.name
        }
        
        Tag.findOneAndUpdate({_id : tagId },updateTagBody).exec()
                .then((originalTag)=>{
                        if(originalTag){
                            res.status(201).json({
                                message :`Updated this ${originalTag}`
                              })
                        }
                        else {
                            res.status(404).json({
                                message: 'Tag not found' 
                              })
                        }
                })
                .catch((error) => {
                        res.status(500).json({
                            error:error.message ||"Internal Server Error"
                        })
                })
}

export default updateTagHandler
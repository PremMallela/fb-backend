 import Tag from '../../data-model/TagModel.js'
 import { isValidName } from '../../utils/validators.js'

    function createTagHandler(req,res){

        const userId = req.userDetails.id 
        const tagDetails = req.body 

        if(!tagDetails || !tagDetails.name || !isValidName(tagDetails.name)){
            return res.status(400)
                       .json({
                            message:"TagName is either not defined or invalid"
                        })
        }

        tagDetails.user_id = userId

        const tag = new Tag(tagDetails)

        tag.save()
                .then((savedTag)=>{
                    res.status(201).json({
                        message : `Tag '${savedTag.name}' has been created`
                    })
                })
                .catch((error) => {
                    res.status(500).json({
                        error:error.message ||"Internal Server Error"
                    })
                })
    }

 export default createTagHandler
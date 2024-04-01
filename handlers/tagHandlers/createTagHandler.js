 import Tag from '../../data-model/TagModel.js'
 import { isValidName } from '../../utils/validations.js'

    function createTagHandler(req,res){
        const userId = req.userDetails.id 
        const tagDetails = req.body 

        if(!tagDetails || !tagDetails.name || !isValidName(tagDetails.name)){
            return res.status(400)
                       .json({
                            message:"Payload is either not defined or invalid"
                        })
        }

        tagDetails.user_id = userId

        const tag = new Tag(tagDetails)

        tag.save()
                .then(()=>{
                    res.status(201).json(`Tag ${tag.name} created`)
                } )
    }

 export default createTagHandler
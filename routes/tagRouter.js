import express from 'express'
import authorize from '../middleware/authorize.js'
import getTagsHandler from '../handlers/tagHandlers/getTagsHandlers.js'
import deleteTagHandler from '../handlers/tagHandlers/deleteTagHandler.js'
import createTagHandler  from '../handlers/tagHandlers/createTagHandler.js'
import updateTagHandler from '../handlers/tagHandlers/updateTagHandler.js'

 const tagRouter = express.Router()

tagRouter.use(authorize)

 tagRouter.post('/', createTagHandler)
 tagRouter.get('/', getTagsHandler)
 tagRouter.patch('/:tagId', updateTagHandler)
 tagRouter.delete('/:tagId',deleteTagHandler)

export default tagRouter



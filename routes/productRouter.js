import express from 'express'
import authorize from '../middleware/authorize.js'
import getCategoryHandler from '../handlers/categoryHandlers/getCategoriesHandler.js'
import createCategoryHandler from '../handlers/categoryHandlers/createCategoryHandler.js'
import  updateCategoryHandler from '../handlers/categoryHandlers/updateCategoryHandler.js'
import deleteCategoryHandler from '../handlers/categoryHandlers/deleteCategoryHandler.js'
import getTagHandlers from '../handlers/tagHandlers/getTagHandlers.js'
import createTagHandler  from '../handlers/tagHandlers/createTagHandler.js'

export const categoryRouter = express.Router()

categoryRouter.use(authorize)

categoryRouter.post('/categories', createCategoryHandler)
categoryRouter.get('/categories', getCategoryHandler)
categoryRouter.patch('/categories', updateCategoryHandler)
categoryRouter.delete('/categories',deleteCategoryHandler)

export const tagRouter = express.Router()

tagRouter.use(authorize)

tagRouter.post('/tags', createTagHandler)
// tagRouter.get('/tags', getTagHandlers)
// tagRouter.patch('/tags', updateTagHandler)
// tagRouter.delete('/tags',deleteTagHandler)



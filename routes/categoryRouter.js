import express from 'express'
import authorize from '../middleware/authorize.js'
import getCategoryHandler from '../handlers/categoryHandlers/getCategoriesHandler.js'
import createCategoryHandler from '../handlers/categoryHandlers/createCategoryHandler.js'
import updateCategoryHandler from '../handlers/categoryHandlers/updateCategoryHandler.js'
import deleteCategoryHandler from '../handlers/categoryHandlers/deleteCategoryHandler.js'


 const categoryRouter = express.Router()

categoryRouter.use(authorize)

categoryRouter.post('/', createCategoryHandler)
categoryRouter.get('/', getCategoryHandler)
categoryRouter.patch('/:categoryId', updateCategoryHandler)
categoryRouter.delete('/:categoryId',deleteCategoryHandler)

export default categoryRouter



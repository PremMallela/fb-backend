import express from 'express'
import createProductHandler from '../handlers/productHandlers/createProductHandler.js'
import authorize from '../middleware/authorize.js'
import uploadFile from '../middleware/multerUpload.js'
import getProductsHandler from '../handlers/productHandlers/getProductsHandler.js'
import updateProductHandler from '../handlers/productHandlers/updateProductHandler.js'

const productRouter = express.Router()

productRouter.use(authorize)

productRouter.use(uploadFile)

productRouter.post('/',createProductHandler)
productRouter.get('/',getProductsHandler)
productRouter.patch('/:productId',updateProductHandler)



export default productRouter
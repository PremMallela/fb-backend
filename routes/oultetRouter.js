import express from 'express'
import createOutletHandler from '../handlers/outletHandlers/createOutletHandler.js'
import uploadFile from '../middleware/multerUpload.js'
import authorize from '../middleware/authorize.js'
import getAllOutlets from '../handlers/outletHandlers/getOutletsHandler.js'
 
const outletRouter = express.Router()

outletRouter.use(authorize)

outletRouter.use(uploadFile)

outletRouter.post('/',createOutletHandler)
outletRouter.get('/',getAllOutlets)

export default outletRouter
import express from 'express';
import createOrderHandler from '../handlers/orderHandlers/postOrderHandler.js';
import authorize from '../middleware/authorize.js';
import getOrdersHandler from '../handlers/orderHandlers/getOrdersHandler.js';

const orderRouter = express.Router();

orderRouter.use(authorize);

orderRouter.post('/',createOrderHandler)
orderRouter.get('/:outletId',getOrdersHandler)

export default orderRouter;
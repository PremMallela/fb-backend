import express from 'express';
import getMenuHandler from '../handlers/menuHandlers/getMenuHandler.js';
import authorize from '../middleware/authorize.js';
import addProductToMenuHandler from '../handlers/menuHandlers/addProductToMenuHandler.js';
import removeProductToMenuHandler from '../handlers/menuHandlers/removeProductFromMenuHandler.js';
import getProductsNotInMenuHandler from '../handlers/menuHandlers/getProductsNotInMenuHandler.js';

const menuRouter = express.Router();

menuRouter.use(authorize)

menuRouter.get('/:outletId', getMenuHandler);
menuRouter.get('/notinmenu/:outletId', getProductsNotInMenuHandler);
menuRouter.post('/product/add/:outletId', addProductToMenuHandler)
menuRouter.post('/product/remove/:outletId', removeProductToMenuHandler)

export default menuRouter;
import express from 'express';
import getCategoryHandler from '../handlers/getCategoriesHandler.js';
import createCategoryHandler from '../handlers/createCategoryHandler.js';
import authorize from '../middleware/authorize.js';
import deleteCategoryHandler from '../handlers/deleteCategoryHandler.js';

const productRouter = express.Router();

productRouter.use(authorize);

productRouter.get('/categories', getCategoryHandler);
productRouter.post('/categories', createCategoryHandler);
productRouter.delete('/categories',deleteCategoryHandler);

export default productRouter;
import express from 'express';
import * as ProductController from './product.controllers.js';
import * as ColorController from '../color/color.controller.js';
import * as SizeController from '../size/size.controller.js';

const router = express.Router();

router.get('/sizes', SizeController.getAllSizes)
router.get('/top-products', ProductController.getTopProducts)
router.get('/search', ProductController.getSearchProducts)

router.get('/sortedByCategory', ProductController.getProductSortByCategory)
router.get('/search-product-category', ProductController.getProductSearchByCategory)





router.get('/related/:id/:category_id', ProductController.getProductRelated)
router.get('/', ProductController.getAllProducts);
router.get('/sales', ProductController.getSaleProducts);
router.get('/category', ProductController.getProductsByCategory);

router.get('/colors', ProductController.getALLColors);
router.get('/:slug', ProductController.getProductBySlug);





router.get('/colors', ColorController.getAllColors)

export default router;

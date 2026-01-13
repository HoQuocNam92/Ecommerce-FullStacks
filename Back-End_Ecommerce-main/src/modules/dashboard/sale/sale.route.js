import express from "express";
import * as ProductController from './sale.controller.js';
import authentication from '#shared/middlewares/Auth/authentication.js';
import authorization from '#shared/middlewares/Auth/authorization.js';
const router = express.Router();

router.get('/', ProductController.getProductSale);
router.post('/', authentication, authorization, ProductController.createProductSale);
router.put('/:id', authentication, authorization, ProductController.updateProductSale);
router.delete('/:id', authentication, authorization, ProductController.deleteProductSale);

export default router;

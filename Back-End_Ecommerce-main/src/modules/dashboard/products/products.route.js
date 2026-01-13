import express from "express";
import * as productController from "./products.controllers.js";
import { uploadLimiter } from "#src/shared/config/rate-limit.js";
import upload from '../../../shared/middlewares/upload.middlware.js';
import { validate } from "#src/shared/middlewares/validate.middleware.js";
import { createProductSchema } from '#shared/schema/createProductSchema.js'
const router = express.Router();

router.get("/", productController.getProducts);

router.get("/:id", productController.getProductDetail);


router.post('/', upload.fields([{ name: 'gallery', maxCount: 10 }]), validate(createProductSchema), productController.createProduct);



router.put('/', uploadLimiter, upload.fields([{ name: 'gallery', maxCount: 10 }]), productController.updateProduct);


router.delete('/:id', productController.deleteProduct);




export default router;

import express from 'express';
import * as ProductImageController from './productImage.controllers.js';
import upload from '../../../shared/middlewares/upload.middlware.js';

const router = express.Router();

router.get('/product', ProductImageController.getProductImages);
router.get('/product/:product_id', ProductImageController.getProductImageById);
router.post('/', upload.single('image'), ProductImageController.addImage);
router.post('/upload', upload.array('images', 10), ProductImageController.uploadMultipleImages);
router.delete('/:id', ProductImageController.deleteImage);

export default router;

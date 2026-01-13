import express from 'express';
import * as ProductAttributeController from './productAttribute.controllers.js';
const router = express.Router();

router.get('/product', ProductAttributeController.getAllAttributesByProduct);
router.get('/product/:product_id', ProductAttributeController.getAttributesByProduct);
router.post('/', ProductAttributeController.addAttribute);
router.delete('/:id', ProductAttributeController.deleteAttribute);

export default router;

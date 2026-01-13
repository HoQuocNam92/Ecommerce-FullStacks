import express from 'express';
import * as CategoryController from './category.controllers.js';
const router = express.Router();

router.get('/', CategoryController.getAllCategories);
router.post('/', CategoryController.createCategory);
router.put('/:id', CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);

export default router;
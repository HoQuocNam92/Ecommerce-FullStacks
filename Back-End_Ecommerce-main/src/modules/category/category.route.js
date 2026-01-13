// category.route.js
import express from 'express';
import * as CategoryController from './category.controllers.js';
// import { authenticateToken } from '../../shared/middlewares/auth.middleware.js';

const router = express.Router();

// Public routes
router.get('/', CategoryController.getAllCategories);
router.get('/stats', CategoryController.getCategoryStats);
router.get('/:id', CategoryController.getCategoryById);
router.get('/:categoryId/products', CategoryController.getCategoryProducts);

// Protected routes (Admin only)
// router.use(authenticateToken);

router.post('/', CategoryController.createCategory);
router.put('/:id', CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);

export default router;


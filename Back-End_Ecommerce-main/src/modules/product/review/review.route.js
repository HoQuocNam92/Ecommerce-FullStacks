import express from 'express';
import * as ReviewController from './revirew.controllers.js';
const router = express.Router();

router.get('/product/:product_id', ReviewController.getAllReviews);
router.post('/', ReviewController.createReview);
router.delete('/:id', ReviewController.deleteReview);

export default router;
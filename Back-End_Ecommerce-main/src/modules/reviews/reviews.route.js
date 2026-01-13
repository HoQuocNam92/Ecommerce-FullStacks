import express from 'express';
import * as ReviewsController from './reviews.controllers.js';
import authentication from '#middlewares/Auth/authentication.js';
import upload from '#src/shared/middlewares/upload.middlware.js';

const router = express.Router();


router.get('/:productId', ReviewsController.getReviewsByProduct);
router.post('/', authentication, upload.fields([{ name: 'images', maxCount: 5 }]), ReviewsController.createReviewsByProduct);


export default router;
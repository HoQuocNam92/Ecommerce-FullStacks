import express from 'express';
import * as OrderCouponController from './oderCoupon.controllers.js';
const router = express.Router();

router.get('/', OrderCouponController.getCouponCode);

export default router;

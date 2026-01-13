import express from 'express'
import * as CouponController from './coupon.controllers.js'

const router = express.Router()

router.get('/', CouponController.getAllCoupons)
router.post('/', CouponController.createCoupon)
router.put('/:id', CouponController.updateCoupon)
router.delete('/:id', CouponController.deleteCoupon)

export default router

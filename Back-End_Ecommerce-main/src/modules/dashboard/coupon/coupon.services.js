import * as CouponRepo from './coupon.repositories.js'

export const getCoupons = () => CouponRepo.getAllCoupons()

export const createCoupon = (data) => CouponRepo.createCoupon(data)

export const updateCoupon = (id, data) => CouponRepo.updateCoupon(id, data)

export const deleteCoupon = (id) => CouponRepo.deleteCoupon(id)

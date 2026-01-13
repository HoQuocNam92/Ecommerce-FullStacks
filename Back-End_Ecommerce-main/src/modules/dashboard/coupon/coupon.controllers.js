import { success } from '#src/shared/utils/response.js'
import * as CouponService from './coupon.services.js'

export const getAllCoupons = async (req, res, next) => {
    try {
        const coupons = await CouponService.getCoupons()
        return success(res, coupons, 'Lấy danh sách mã giảm giá thành công')
    } catch (error) {
        next(error)
    }
}

export const createCoupon = async (req, res, next) => {
    try {
        const result = await CouponService.createCoupon(req.body)
        return success(res, result, 'Tạo mã giảm giá thành công')
    } catch (error) {
        next(error)
    }
}

export const updateCoupon = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await CouponService.updateCoupon(id, req.body)
        return success(res, result, 'Cập nhật mã giảm giá thành công')
    } catch (error) {
        next(error)
    }
}

export const deleteCoupon = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await CouponService.deleteCoupon(id)
        return success(res, result, 'Xóa mã giảm giá thành công')
    } catch (error) {
        next(error)
    }
}

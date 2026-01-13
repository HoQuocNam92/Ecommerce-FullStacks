import * as OrderCouponService from './orderCoupon.services.js';
import { success } from '../../../shared/utils/response.js';



export const getCouponCode = async (req, res, next) => {
    try {
        const applied = await OrderCouponService.getCouponCode(req?.query?.couponCode || "");
        return success(res, applied, "Áp dụng mã giảm giá thành công");
    } catch (error) {
        next(error?.message);
    }
};




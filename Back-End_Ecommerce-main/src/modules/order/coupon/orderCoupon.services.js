import * as OrderCouponRepo from './orderCoupon.repositories.js';

export const getCouponCode = async (couponCode) => {
    if (!couponCode) {
        throw new Error("Vui lòng nhập mã giảm giá");
    }

    const coupon = await OrderCouponRepo.getCouponCode(couponCode);
    if (coupon === null) {
        console.log("sddsd")

        throw new Error("Mã giảm giá không tồn tại hoặc đã hết hạn");
    }

    return coupon;
};

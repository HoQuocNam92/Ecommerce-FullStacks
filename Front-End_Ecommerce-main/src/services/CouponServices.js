import instance from "@/utils/axiosInstance";

export const getAllCoupon = async () => {
    return await instance.get('/dashboard/coupons');
};

export const getCouponByCode = async (couponCode) => {
    return await instance.get(`/order-coupons?couponCode=${couponCode}`);
};

export const createCoupon = async (data) => {
    return await instance.post('/dashboard/coupons', data);
};

export const updateCoupon = async (id, data) => {
    return await instance.put(`/dashboard/coupons/${id}`, data);
};


export const deleteCoupon = async (id) => {
    return await instance.delete(`/dashboard/coupons/${id}`);
};

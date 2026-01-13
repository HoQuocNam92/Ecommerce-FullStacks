import instance from "@/utils/axiosInstance";

export const getWishListByUser = async () => {
    const res = await instance.get(`/wishlist/`);

    return res.data.data;
};

export const createWishListByUser = async (data) => {
    const res = await instance.post(`/wishlist`, { product_id: data });
    return res.data.data;
};


export const deleteWishListByUser = async (product_id) => {
    const res = await instance.delete(`/wishlist/${product_id}`);
    return res.data.data;
};


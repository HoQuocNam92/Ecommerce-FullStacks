import instance from "@/utils/axiosInstance"

export const getReviewByID = async (product_id) => {
    const res = await instance.get(`/reviews/${product_id}`);
    return res.data.data;
}

export const postReview = async (data) => {
    const res = await instance.post(`/reviews`, data, {
        headers: {
            "Content-Type": "form-data/multipart"
        }
    });
    return res.data;
}

export const getAllReviews = async (params = {}) => {
    const res = await instance.get(`/reviews`, { params });
    return res.data;
}

export const updateReviewStatus = async (id, status) => {
    const res = await instance.patch(`/reviews/${id}`, { status });
    return res.data;
}

export const deleteReview = async (id) => {
    const res = await instance.delete(`/reviews/${id}`);
    return res.data;
}
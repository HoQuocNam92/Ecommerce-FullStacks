import instance from "@/utils/axiosInstance";

export const getAllShippingMethod = async () => await instance.get('/shipper')
import instance from "@/utils/axiosInstance"

export const GetColors = async () => {
    const res = await instance.get("/products/colors");
    return res.data.data;
}

export const GetColorsAll = async () => {
    const res = await instance.get("/products/colors");
    return res.data;
}
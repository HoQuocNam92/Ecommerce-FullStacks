import instance from "@/utils/axiosInstance"



export const GetSizes = async () => {
    const res = await instance.get("/products/sizes");
    return res.data.data;
}
import instance from "@/utils/axiosInstance"


export const getStatsByYear = async () => {
    const res = await instance.get("/dashboard/overviews");
    return res.data.data
}
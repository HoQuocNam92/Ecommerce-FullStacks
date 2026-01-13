import instance from "@/utils/axiosInstance"

export const GetChart = async () => {
    const res = await instance.get("/analytics/chart");
    return res.data.data;
}


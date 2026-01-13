import instance from "@/utils/axiosInstance"

export const getTotalRevenue = async (year) => {
    const res = await instance.get(`/dashboard/revenues/total-revenue?year=${year}`)
    return res.data.data
}

export const getTopProducts = async (startDate, endDate) => {
    const res = await instance.get(`/dashboard/revenues/products-hot?startDate=${startDate}&endDate=${endDate}`)
    return res.data
}

export const getRevenueByMonth = async (year) => {
    const res = await instance.get(`/dashboard/revenues/monthly-revenue?year=${year}`)
    return res.data.data
}


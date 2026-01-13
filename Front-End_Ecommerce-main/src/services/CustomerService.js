import instance from "@/utils/axiosInstance";



export const getCustomersAll = async (page) => {
    const response = await instance.get(`/dashboard/customers?page=${page}`);
    return response.data;
}

export const deleteCustomer = async (customerId) => {
    const response = await instance.delete(`/dashboard/customers/${customerId}`);
    return response.data;
}
export const updateCustomer = async ({ id, status }) => {
    const response = await instance.put(`/dashboard/customers/${id}/status`, { status });
    return response.data;
}

export const getTotalPage = async () => {
    const response = await instance.get("/dashboard/customers/total-pages");
    return response.data;
}


export const searchCustomer = async (searchTerm) => {
    const response = await instance.get(`/dashboard/customers/search?q=${encodeURIComponent(searchTerm)}`);
    return response.data;
}
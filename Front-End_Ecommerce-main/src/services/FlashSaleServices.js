import instance from "@/utils/axiosInstance";

export const getProductSale = async () => await instance.get('/dashboard/sales')


export const createProductSale = async (data) => await instance.post('/dashboard/sales', data)


export const updateProductSale = async (data) => await instance.put(`/dashboard/sales/${data.id}`, data)


export const deleteProductSale = async (id) => await instance.delete(`/dashboard/sales/${id}`)







import instance from "@/utils/axiosInstance";



export const createBanner = async (data) => {
    const res = await instance.post('/banners', data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data.data
}


export const getAllBanner = async () => {
    const res = await instance.get('/banners')
    return res.data.data
}

export const updateBanner = async (data) => {
    const res = await instance.put('/banners', data)
    return res.data.data
}


export const deleteBanner = async (id) => {
    const res = await instance.delete(`/banners/${id}`)
    return res.data.data
}





import instance from "@/utils/axiosInstance";

export const getAllRole = async () => {
    return await instance.get('/dashboard/roles');
};

export const createRole = async (data) => {
    return await instance.post('/dashboard/roles', data);
};


export const updateRole = async (id, data) => {
    return await instance.put(`/dashboard/roles/${id}`, data);
};

export const deleteRole = async (id) => {
    return await instance.delete(`/dashboard/roles/${id}`);
};

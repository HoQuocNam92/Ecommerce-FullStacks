import instance from "@/utils/axiosInstance";

export const GetAddress = async () => {
    const res = await instance.get(`/address`);
    return res.data;
};
export const AddAddress = async (address) => {
    const res = await instance.post('/address', address);
    return res.data;
};


export const UpdateAddress = async (address) => {
    const res = await instance.put('/address', address);
    return res.data;
};
export const DeleteAddress = async (id) => {
    const res = await instance.delete(`/address/${id}`,);
    return res.data;
};

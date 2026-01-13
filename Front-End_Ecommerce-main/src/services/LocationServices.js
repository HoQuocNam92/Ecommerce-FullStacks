import instance from "@/utils/axiosInstance";

export const Provinces = async () => {
    const res = await instance.get("/locations/provinces");
    return res.data;
};
export const Districts = async (districts) => {
    const res = await instance.get(`/locations/districts/${districts}`);
    return res.data;
};
export const Wards = async (wards) => {
    const res = await instance.get(`/locations/wards/${wards}`);
    return res.data;
};
import * as LocationRepo from '../location/location.repositories.js'


export const getProvinces = async () => {
    return await LocationRepo.getProvinces();
};

export const getDistricts = async (data) => {
    return await LocationRepo.getDistricts(data);
};
export const getWards = async (data) => {
    return await LocationRepo.getWards(data);
};

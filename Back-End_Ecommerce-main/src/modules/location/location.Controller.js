import { success } from "../../../src/shared/utils/response.js";
import * as LocationService from '../location/location.services.js'

export const getProvinces = async (req, res, next) => {
    try {
        const Provinces = await LocationService.getProvinces();
        return success(res, Provinces);
    } catch (error) {
        next(error);
    }
};
export const getDistricts = async (req, res, next) => {
    try {
        const Districts = await LocationService.getDistricts(req.params.district);
        return success(res, Districts);
    } catch (error) {
        next(error);
    }
};
export const getWards = async (req, res, next) => {
    try {
        const Wards = await LocationService.getWards(req.params.wards);
        return success(res, Wards);
    } catch (error) {
        next(error);
    }
};
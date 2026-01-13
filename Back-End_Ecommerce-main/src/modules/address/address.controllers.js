import { success } from '../../shared/utils/response.js';
import * as AddressService from './address.services.js';

export const getAddress = async (req, res, next) => {
    try {
        const address = await AddressService.getAddress(req.user?.id);
        return success(res, address, "Lấy địa chỉ thành công")
    } catch (error) {
        next(error)
    }
};
export const updateAddress = async (req, res, next) => {
    try {
        const address = await AddressService.updateAddress(req.user?.id, req.body);
        return success(res, address, "Cập nhật địa chỉ thành công")
    } catch (error) {
        next(error)
    }
};

export const deleteAddress = async (req, res, next) => {
    try {
        const address = await AddressService.deleteAddress(req.user?.id, req.params.id);
        return success(res, address, "Xóa địa chỉ thành công")
    } catch (error) {
        next(error)
    }
};

export const addAddress = async (req, res, next) => {
    try {
        const cart = await AddressService.addAddress({ ...req.body, user_id: req.user?.id });
        return success(res, cart, "Thêm địa chỉ thành công")
    } catch (error) {
        next(error)
    }
};

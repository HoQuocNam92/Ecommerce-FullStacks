import * as CustomerService from './customers.services.js';
import { success } from '#utils/response.js';


let size = 20;

export const getAllCustomers = async (req, res, next) => {
    try {
        const result = await CustomerService.getAllCustomers(req.query.page || 1, size);
        return success(res, result, "Lấy danh sách khách hàng thành công");
    } catch (error) {
        next(error);
    }
};

export const deleteCustomerById = async (req, res, next) => {
    try {
        const { customerId } = req.params;
        const result = await CustomerService.deleteCustomerById(customerId);
        return success(res, result, "Xoá khách hàng thành công");
    } catch (error) {
        next(error);
    }
};
export const updateCustomerStatus = async (req, res, next) => {
    try {
        const { customerId } = req.params;
        const { status } = req.body;

        const result = await CustomerService.updateCustomerStatus(customerId, status);
        return success(res, result, "Cập nhật trạng thái khách hàng thành công");
    } catch (error) {
        next(error);
    }
};

export const getTotalCustomers = async (req, res, next) => {
    try {
        const result = await CustomerService.getTotalCustomers(size);
        return success(res, result, "Lấy tổng số khách hàng thành công");
    } catch (error) {
        next(error);
    }
};

export const searchCustomers = async (req, res, next) => {
    try {
        const { q } = req.query;
        const result = await CustomerService.searchCustomers(q);
        return success(res, result, "Tìm kiếm khách hàng thành công");
    } catch (error) {
        next(error);
    }
};
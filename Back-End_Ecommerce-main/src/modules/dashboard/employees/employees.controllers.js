import * as employeeService from './employees.services.js';
import { success } from '#utils/response.js';


let size = 20;

export const getAllEmployees = async (req, res, next) => {
    try {
        const result = await employeeService.getAllEmployees(req.query.page || 1, size);
        return success(res, result, "Lấy danh sách nhân viên thành công");
    } catch (error) {
        next(error);
    }
};

export const deleteEmployeeById = async (req, res, next) => {
    try {
        const { employeeId } = req.params;
        const result = await employeeService.deleteEmployeeById(employeeId);
        return success(res, result, "Xoá nhân viên thành công");
    } catch (error) {
        next(error);
    }
};
export const updateEmployee = async (req, res, next) => {
    try {
        const avatar = req.files?.avatar;

        if (avatar) {
            req.body.avatar = avatar[0].path
        }
        const result = await employeeService.updateEmployee(req.body);
        return success(res, result, "Cập nhật trạng thái nhân viên thành công");
    } catch (error) {
        next(error);
    }
};

export const createEmployee = async (req, res, next) => {
    try {
        const avatar = req.files?.avatar;

        if (avatar) {
            req.body.avatar = avatar[0].path
        }
        const result = await employeeService.createEmployee(req.body)
        return success(res, result, "Tạo nhân viên thành công");

    } catch (error) {
        next(error)
    }
}


export const getTotalEmployees = async (req, res, next) => {
    try {
        const result = await employeeService.getTotalEmployees(size);
        return success(res, result, "Lấy tổng số nhân viên thành công");
    } catch (error) {
        next(error);
    }
};

export const searchEmployees = async (req, res, next) => {
    try {
        const { q } = req.query;
        const result = await employeeService.searchEmployees(q);
        return success(res, result, "Tìm kiếm nhân viên thành công");
    } catch (error) {
        next(error);
    }
};
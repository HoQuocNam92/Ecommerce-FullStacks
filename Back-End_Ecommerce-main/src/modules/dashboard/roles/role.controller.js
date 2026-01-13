import * as RoleService from './role.service.js'
import { success } from '#src/shared/utils/response.js';

export const createRole = async (req, res, next) => {
    try {
        const data = await RoleService.createRole(req.body);
        return success(res, data, "Tạo vai trò thành công");
    } catch (error) {
        next(error);
    }
}

export const getAllRole = async (req, res, next) => {
    try {
        const data = await RoleService.getAllRole();
        return success(res, data, "Lấy vai trò thành công");
    } catch (error) {
        next(error);
    }
}

export const updateRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await RoleService.updateRole(id, req.body);
        return success(res, data, "Cập nhật vai trò thành công");
    } catch (error) {
        next(error);
    }
}

export const deleteRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await RoleService.deleteRole(id);
        return success(res, data, "Xóa vai trò thành công");
    } catch (error) {
        next(error);
    }
}

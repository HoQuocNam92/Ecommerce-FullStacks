import * as RoleService from './roles.services.js';

export const getAllRoles = async (req, res) => {
    try {
        const roles = await RoleService.getRoles();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getRoleById = async (req, res) => {
    try {
        const role = await RoleService.getRoleById(req.params.id);
        if (!role) {
            return res.status(404).json({ error: 'Vai trò không tồn tại' });
        }
        res.json(role);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createRole = async (req, res) => {
    try {
        const { name, description, permissions } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({ error: 'Tên vai trò không được để trống' });
        }

        const role = await RoleService.createRole({
            name: name.trim(),
            description: description?.trim() || '',
            permissions: permissions || []
        });

        res.status(201).json({
            role,
            success: true,
            message: 'Tạo vai trò thành công'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({ error: 'Tên vai trò không được để trống' });
        }

        await RoleService.updateRole(id, {
            name: name.trim(),
            description: description?.trim() || ''
        });

        res.json({
            success: true,
            message: 'Cập nhật vai trò thành công'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteRole = async (req, res) => {
    try {
        const { id } = req.params;

        const hasUsers = await RoleService.checkRoleHasUsers(id);
        if (hasUsers) {
            return res.status(400).json({
                error: 'Không thể xóa vai trò có người dùng'
            });
        }

        await RoleService.deleteRole(id);
        res.json({
            success: true,
            message: 'Xóa vai trò thành công'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getRolePermissions = async (req, res) => {
    try {
        const { id } = req.params;
        const permissions = await RoleService.getRolePermissions(id);
        res.json(permissions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateRolePermissions = async (req, res) => {
    try {
        const { id } = req.params;
        const { permissions } = req.body;

        if (!Array.isArray(permissions)) {
            return res.status(400).json({ error: 'Permissions phải là một mảng' });
        }

        await RoleService.updateRolePermissions(id, permissions);
        res.json({
            success: true,
            message: 'Cập nhật phân quyền thành công'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


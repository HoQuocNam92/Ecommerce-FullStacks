import * as RoleRepo from './role.repository.js'

export const createRole = async (data) => {
    return await RoleRepo.createRole(data);
};

export const getAllRole = async () => {
    return await RoleRepo.getAllRole();
};

export const updateRole = async (id, data) => {
    return await RoleRepo.updateRole(id, data);
};

export const deleteRole = async (id) => {
    return await RoleRepo.deleteRole(id);
};

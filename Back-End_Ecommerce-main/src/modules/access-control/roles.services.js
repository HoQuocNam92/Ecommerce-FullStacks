import * as RoleRepo from './roles.repositories.js';

export const getRoles = () => RoleRepo.getAllRoles();
export const getRoleById = (id) => RoleRepo.getRoleById(id);
export const createRole = (data) => RoleRepo.createRole(data);
export const updateRole = (id, data) => RoleRepo.updateRole(id, data);
export const deleteRole = (id) => RoleRepo.deleteRole(id);
export const checkRoleHasUsers = (id) => RoleRepo.checkRoleHasUsers(id);
export const getRolePermissions = (id) => RoleRepo.getRolePermissions(id);
export const updateRolePermissions = (id, permissions) => RoleRepo.updateRolePermissions(id, permissions);


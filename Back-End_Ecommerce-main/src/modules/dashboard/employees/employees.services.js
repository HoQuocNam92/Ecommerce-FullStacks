import * as employeeRepositories from "./employees.repositories.js";

export const getAllEmployees = async (page, size) => {
    return await employeeRepositories.getAllEmployees(page, size);
}

export const deleteEmployeeById = async (employeeId) => {
    return await employeeRepositories.deleteEmployeeById(employeeId);
}

export const createEmployee = async (data) => {
    return await employeeRepositories.createEmployee({ ...data, role_id: Number(data.role_id) });
}
export const updateEmployee = async (data) => {
    return await employeeRepositories.updateEmployee(data);
}
export const getTotalEmployees = async (size) => {
    const total = await employeeRepositories.getTotalEmployees();
    return Math.ceil(total / size);
}

export const searchEmployees = async (keyword) => {
    return await employeeRepositories.searchEmployees(decodeURIComponent(keyword));
}
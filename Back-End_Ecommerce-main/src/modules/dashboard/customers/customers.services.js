import * as customerRepositories from "./customers.repositories.js";

export const getAllCustomers = async (page, size) => {
    return await customerRepositories.getAllCustomers(page, size);
}

export const deleteCustomerById = async (customerId) => {
    return await customerRepositories.deleteCustomerById(customerId);
}

export const updateCustomerStatus = async (customerId, status) => {
    return await customerRepositories.updateCustomerStatus(customerId, status);
}
export const getTotalCustomers = async (size) => {
    const total = await customerRepositories.getTotalCustomers();
    return Math.ceil(total / size);
}

export const searchCustomers = async (keyword) => {
    return await customerRepositories.searchCustomers(decodeURIComponent(keyword));
}
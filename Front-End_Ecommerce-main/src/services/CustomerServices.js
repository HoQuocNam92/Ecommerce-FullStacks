/* eslint-disable no-useless-catch */
import axiosInstance from '@/utils/axiosInstance';

export const GetAllCustomers = async () => {
    try {
        const response = await axiosInstance.get('/users/customers');
        return response.data.data;
    } catch (error) {
        throw error;
    }

}

export const GetCustomerById = async (id) => {
    try {
        const response = await axiosInstance.get(`/users/customers/${id}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

export const UpdateCustomer = async (id, data) => {
    try {
        const response = await axiosInstance.put(`/users/customers/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const DeleteCustomer = async (id) => {
    try {
        const response = await axiosInstance.delete(`/users/customers/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};



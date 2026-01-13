import instance from "@/utils/axiosInstance"
export const getEmployeesAll = async (page) => {
    const response = await instance.get(`/dashboard/employees?page=${page}`);
    return response.data;
}

export const updateEmployee = async (data) => {
    const response = await instance.put(`/dashboard/employees`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}
export const deleteEmployee = async (employeeId) => {
    const response = await instance.delete(`/dashboard/employees/${employeeId}`);
    return response.data;
}

export const createEmployee = async (data) => {
    const response = await instance.post("/dashboard/employees", data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return response.data;
}



export const getTotalPage = async () => {
    const response = await instance.get("/dashboard/employees/total-pages");
    return response.data;
}


export const searchEmployee = async (searchTerm) => {
    const response = await instance.get(`/dashboard/employees/search?q=${encodeURIComponent(searchTerm)}`);
    return response.data;
}
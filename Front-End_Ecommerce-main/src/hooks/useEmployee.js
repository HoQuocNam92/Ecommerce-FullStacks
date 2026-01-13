import { useQuery, useMutation } from '@tanstack/react-query'
import * as employeeService from '@/services/EmployeeService';
import { useEffect, useState } from 'react';
import useDebounce from './useDebounce';
const useEmployee = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [employees, setEmployees] = useState([]);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [pages, setPages] = useState(1);
    const getEmployee = useQuery({
        queryKey: ['employees', pages],
        queryFn: async () => await employeeService.getEmployeesAll(pages),
        refetchOnWindowFocus: false,
    })
    const updateEmployee = useMutation({
        mutationFn: async (data) => await employeeService.updateEmployee(data),
        onSuccess: () => {
            getEmployee.refetch();
        }
    })

    const createEmployee = useMutation({
        mutationFn: async (data) => await employeeService.createEmployee(data),
        onSuccess: () => getEmployee.refetch()
    })
    const deleteEmployee = useMutation({
        mutationFn: async (employeeId) => {
            return await employeeService.deleteEmployee(employeeId);
        },
        onSuccess: () => {
            getEmployee.refetch();
        }
    })

    const getTotalPage = useQuery({
        queryKey: ['employees', 'totalPage'],
        queryFn: employeeService.getTotalPage,
        cacheTime: 30 * 60 * 1000, // 30 minutes
        refetchOnWindowFocus: false,
    })

    const searchEmployee = useQuery({
        queryKey: ['employees', 'search', debouncedSearchTerm],
        queryFn: async () => await employeeService.searchEmployee(debouncedSearchTerm),
        enabled: debouncedSearchTerm.length > 0,
    })

    useEffect(() => {
        if (debouncedSearchTerm !== '') {
            setEmployees(searchEmployee.data || []);
        }
        else {
            setEmployees(getEmployee.data || []);
        }
    }, [debouncedSearchTerm, getEmployee.data, searchEmployee.data]);
    return {
        getEmployee,
        pages,
        setPages,
        updateEmployee,
        deleteEmployee,
        getTotalPage,
        searchEmployee,
        setSearchTerm,
        createEmployee,
        employees
    }

}

export default useEmployee;
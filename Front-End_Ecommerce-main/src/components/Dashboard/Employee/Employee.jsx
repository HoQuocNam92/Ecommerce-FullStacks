import React, { useState } from 'react';

import { PaginationDemo } from '@/components/Pagination/Pagination'
import HeaderEmployee from './HeaderEmployee';
import FilterEmployee from './FilterEmployee';
import ListEmployee from './ListEmployee';
import useEmployee from '@/hooks/useEmployee';
import FormEmployee from './FormEmployee';


const Employee = () => {

    const { deleteEmployee, updateEmployee, getTotalPage,
        searchTerm, setSearchTerm, createEmployee,
        pages, setPages, employees } = useEmployee();
    const [selectEmployee, setSelectEmployee] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const handleDeleteEmployee = (employeeId) => {
        const isConfirm = confirm("Bạn có chắc chắn muốn xóa không");
        if (!isConfirm) return;
        deleteEmployee.mutate(employeeId);
    }

    const handleCreateEmployee = () => {
        if (selectEmployee) {
            setSelectEmployee(null)
        }
        setIsOpen(true);

    }
    const handleUpdateEmployee = (employee) => {

        setIsOpen(true);
        setSelectEmployee(employee);
    }

    return (
        <>
            {isOpen && <FormEmployee createEmployee={createEmployee} setIsOpen={setIsOpen} updateEmployee={updateEmployee} employee={selectEmployee} />}
            <HeaderEmployee handleCreateEmployee={handleCreateEmployee} />
            <FilterEmployee setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
            <ListEmployee isOpen={isOpen} handleDeleteEmployee={handleDeleteEmployee} handleUpdateEmployee={handleUpdateEmployee} setIsOpen={setIsOpen} updateEmployee={updateEmployee} employee={selectEmployee} getEmployee={employees} />

            <PaginationDemo totalPages={getTotalPage?.data?.data} pages={pages} setPages={setPages} />

        </>
    )
}

export default Employee
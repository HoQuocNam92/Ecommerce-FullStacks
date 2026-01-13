import React, { useState } from 'react';

import ListCustomer from './ListCustomer'
import FilterCustomer from './FilterCustomer'
import HeaderCustomer from './HeaderCustomer'
import { PaginationDemo } from '@/components/Pagination/Pagination'
import useCustomers from '@/hooks/useCustomers';


const Customer = () => {

    const { deleteCustomer, updateCustomer, getTotalPage,
        searchTerm, setSearchTerm,
        pages, setPages, customers } = useCustomers();
    const [selectCustomer, setSelectCustomer] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const handleDeleteCustomer = (customerId) => {
        const isConfirm = confirm("Bạn có chắc chắn muốn xóa không ?")
        if (!isConfirm) return
        deleteCustomer.mutate(customerId);
    }

    const handleUpdateCustomer = (customer) => {
        setIsOpen(true);
        setSelectCustomer(customer);
    }

    return (
        <>
            <HeaderCustomer />
            <FilterCustomer setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
            <ListCustomer isOpen={isOpen} handleDeleteCustomer={handleDeleteCustomer} handleUpdateCustomer={handleUpdateCustomer} setIsOpen={setIsOpen} updateCustomer={updateCustomer} customer={selectCustomer} getCustomer={customers} />

            <PaginationDemo totalPages={getTotalPage?.data?.data} pages={pages} setPages={setPages} />

        </>
    )
}

export default Customer
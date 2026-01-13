import { useQuery, useMutation } from '@tanstack/react-query';
import * as customerService from '@/services/CustomerService';
import { useEffect, useState } from 'react';
import useDebounce from './useDebounce';
const useCustomers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [customers, setCustomers] = useState([]);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [pages, setPages] = useState(1);
    const getCustomer = useQuery({
        queryKey: ['customers', pages],
        queryFn: async () => await customerService.getCustomersAll(pages),
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 30 * 60 * 1000, // 30 minutes
        refetchOnWindowFocus: false,
    })


    const deleteCustomer = useMutation({
        mutationFn: async (customerId) => {
            return await customerService.deleteCustomer(customerId);
        },
        onSuccess: () => {
            getCustomer.refetch();
        },
    })
    const updateCustomer = useMutation({
        mutationFn: async ({ id, status }) => {
            return await customerService.updateCustomer({ id, status });
        },
        onSuccess: () => {
            getCustomer.refetch();
        },
    })

    const getTotalPage = useQuery({
        queryKey: ['customers', 'totalPage'],
        queryFn: customerService.getTotalPage,
        cacheTime: 30 * 60 * 1000, // 30 minutes
        refetchOnWindowFocus: false,
    })

    const searchCustomer = useQuery({
        queryKey: ['customers', 'search', debouncedSearchTerm],
        queryFn: async () => await customerService.searchCustomer(debouncedSearchTerm),
        enabled: debouncedSearchTerm.length > 0,
    })

    useEffect(() => {
        if (debouncedSearchTerm !== '') {
            setCustomers(searchCustomer.data || []);

        }
        else {
            setCustomers(getCustomer.data || []);
        }
    }, [debouncedSearchTerm, getCustomer.data, searchCustomer.data]);

    return {
        deleteCustomer,
        pages,
        setPages,
        updateCustomer,
        getTotalPage,
        searchCustomer,
        setSearchTerm,
        searchTerm,
        customers,
    }
}
export default useCustomers;

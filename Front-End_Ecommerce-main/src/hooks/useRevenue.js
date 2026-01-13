import { useQuery } from '@tanstack/react-query'
import * as RevenueService from '@/services/RevenueServices'
import { useState } from 'react'
import dayjs from 'dayjs';



const useRevenue = () => {

    const [year, setYear] = useState(dayjs().year());

    const [startDate, setStartDate] = useState(dayjs().startOf("month"));
    const [endDate, setEndDate] = useState(dayjs().endOf("month"));


    const getRevenueByYear = useQuery({
        queryKey: ['revenueYear', year],
        queryFn: async () => RevenueService.getTotalRevenue(year)
    })

    const getTopProducts = useQuery({
        queryKey: ['topProducts', startDate, endDate],
        queryFn: () =>
            RevenueService.getTopProducts(
                startDate.toDate(),
                endDate.toDate()
            )
    })

    const getRevenueByMonth = useQuery({
        queryKey: ['revenueMonth', year],
        queryFn: () => RevenueService.getRevenueByMonth(year)
    })


    return {
        setYear,
        setEndDate,
        setStartDate,
        getRevenueByMonth,
        getRevenueByYear,
        getTopProducts
    }
}

export default useRevenue
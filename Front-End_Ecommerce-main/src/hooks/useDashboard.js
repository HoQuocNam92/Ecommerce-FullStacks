import { useQuery } from "@tanstack/react-query";
import { GetTopProduct } from "@/services/ProductServices";
import { getCategory } from "@/services/CategoryServices";
import { GetOrderRecent } from "@/services/OrderServices";
import { getStatsByYear } from "@/services/StatsServices";
import { getRevenueByMonth } from "@/services/RevenueServices";
import { useState } from "react";



export default function useDashboard() {
    const [year, setYear] = useState(new Date().getFullYear())

    const productQuery = useQuery({
        queryKey: ["top-products"],
        queryFn: GetTopProduct,
    });

    const categoryQuery = useQuery({
        queryKey: ["categories"],
        queryFn: getCategory,
    });

    const orderQuery = useQuery({
        queryKey: ["orders"],
        queryFn: GetOrderRecent,
    });
    const chartQuery = useQuery({
        queryKey: ["charts"],
        queryFn: () => getRevenueByMonth(year),
    });

    const statsQuery = useQuery({
        queryKey: ["stats"],
        queryFn: () => getStatsByYear(),
    })
    const loading =
        productQuery.isLoading ||
        categoryQuery.isLoading ||
        orderQuery.isLoading ||
        chartQuery.isLoading ||
        statsQuery.isLoading

    const error =
        productQuery.error ||
        categoryQuery.error ||
        orderQuery.error ||
        chartQuery.error ||
        chartQuery.error ||
        statsQuery.error

    const topProducts = productQuery.data || [];
    const categories = categoryQuery?.data || [];
    const recentOrders = orderQuery?.data || [];
    const chartData = chartQuery?.data || [];
    const stats = statsQuery?.data || [];



    return {
        loading,
        topProducts,
        error,
        recentOrders,
        categories,
        chartData,
        stats,
        setYear
    };
}

import { getOrders, getOrdersByAdmin, updateStatusOrder, GetOrderByUser, CreateOrder } from "@/services/OrderServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
export const useOrders = (pages) => {
    const [userId, setUserId] = useState()

    const CreateOrders = useMutation({
        mutationFn: (data) => CreateOrder(data),
        onSuccess: () => GetOrders.refetch()
    })
    const GetOrders = useQuery({
        queryKey: ["GetOrder"],
        queryFn: GetOrderByUser,
        refetchOnWindowFocus: false,
        refetchOnMount: 'always'
    });

    const getOrder = useQuery({
        queryKey: ["Orders", pages],
        queryFn: async () => {
            return await getOrders(pages)
        }
    })

    const getOrderDetails = useQuery({
        queryKey: ["OrdersDetails", userId],
        queryFn: async () => {
            return await getOrdersByAdmin(userId)
        },
        enabled: !!userId
    })

    const UpdateStatusOrder = useMutation({
        mutationFn: (data) => updateStatusOrder(data),
        onSuccess: () => getOrder.refetch()
    });



    return {
        getOrder, getOrderDetails, UpdateStatusOrder, setUserId,
        GetOrders,
        CreateOrders,
    };
}




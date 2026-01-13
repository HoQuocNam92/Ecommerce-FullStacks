import React, { useEffect, useRef, useState } from "react"
import OrdersStats from "@/components/Dashboard/Orders/OrdersStats"
import OrdersFilters from "@/components/Dashboard/Orders/OrdersFilters"
import OrdersTable from "@/components/Dashboard/Orders/OrdersTable"
import { useOrders } from "@/hooks/useOrders"
import { Button } from "@/components/ui"
import { ExportOrdersExcel } from "@/services/OrderServices"
import { PaginationDemo } from "@/components/Pagination/Pagination"
import { Spinner } from "@/components/ui/spinner"
import FormOrderDetails from "./Form/FormOrderDetails"
import { toast } from "sonner"


const Orders = () => {

    const [pages, setPages] = useState(1);
    const [isOpen, setIsOpen] = useState(false);

    const formRef = useRef();

    const { getOrder, UpdateStatusOrder } = useOrders(pages)

    useEffect(() => {
        const handleShowForm = (e) => {
            if (formRef.current && !formRef.current.contains(e.target)) {
                setIsOpen(false)
            }
        }

        if (isOpen) document.addEventListener('mousedown', handleShowForm)
        return () => document.removeEventListener('mousedown', handleShowForm)
    }, [isOpen])
    if (getOrder.isLoading) {
        return <Spinner />
    }

    const handleUpdate = async (data) => {
        try {
            await UpdateStatusOrder.mutateAsync(data)
            toast.success("Cập nhật thành công")
        } catch (error) {
            toast.error(error?.message)
        }
    }
    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Quản lý đơn hàng</h1>
                <p className="text-gray-600 mt-1">Theo dõi và quản lý tất cả đơn hàng</p>
                <div className="mt-3 flex gap-2 items-center">
                    <Button
                        onClick={async () => {
                            const res = await ExportOrdersExcel({});
                            const url = URL.createObjectURL(res.data);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `orders_${Date.now()}.xlsx`;
                            a.click();
                            URL.revokeObjectURL(url);
                        }}
                    >Xuất Excel</Button>
                </div>
            </div>
            <OrdersStats value={{ totalAmout: getOrder.data.totalAmount, totalOrder: getOrder?.data?.totalOrder, totalOrderToDay: getOrder.data.totalOrderToDay, totalAmountToDay: getOrder.data.totalAmountToDay }} />
            {/* <OrdersFilters {...{ searchTerm, setSearchTerm, statusFilter, setStatusFilter, dateFilter, setDateFilter }} /> */}
            <OrdersTable setIsOpen={setIsOpen} isPending={UpdateStatusOrder?.isPending} orders={getOrder.data?.order} handleUpdate={handleUpdate} />
            <PaginationDemo totalPages={getOrder.data?.totalPages} setPages={setPages} pages={pages} />
        </div>
    )
}

export default Orders

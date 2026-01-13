import React, { useState } from "react"
import { Eye, Edit, Trash2, CheckCircle, Clock, Truck, AlertCircle } from "lucide-react"
import dayjs from "dayjs"
import OrderStatus from "./OrderStatus"
import ToUnitMoney from "@/utils/ToUnitMoney"
import { Button } from "@/components/ui"
import { useNavigate } from "react-router-dom"
import FormOrderEdit from "@/components/Dashboard/Orders/Form/FormOrderEdit"

const OrdersTable = ({ orders, handleUpdate, isPending }) => {
    const [open, setOpen] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState(null)
    const nagivate = useNavigate();
    const handleEdit = (order) => {
        setSelectedOrder(order)
        setOpen(true)
    }


    return (
        <div className="bg-white rounded-lg border p-4">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-50 text-left">
                        <th className="p-3">Mã đơn</th>
                        <th className="p-3">Khách hàng</th>
                        <th className="p-3">Số tiền</th>
                        <th className="p-3">Trạng thái</th>
                        <th className="p-3">Thanh toán</th>
                        <th className="p-3">Ngày đặt</th>
                        <th className="p-3 text-center">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((o) => (
                        <tr key={o.id} className="border-t  ">
                            <td className="p-3 font-medium w-[220px]">{o.order_code}</td>
                            <td className="p-3">
                                <div className="font-medium">{o.userName}</div>
                                <div className="text-xs text-gray-500">{o.email}</div>
                            </td>
                            <td className="p-3 font-medium">{ToUnitMoney(o.total_amount)}</td>
                            <td className="p-3">{OrderStatus(o.status)}</td>
                            <td className="p-3 text-xs">{o.payment_method}</td>
                            <td className="p-3 text-xs">  {dayjs(o.created_at).format("DD/MM/YYYY HH:mm")}</td>
                            <td className="p-3 text-center flex justify-center gap-2">

                                <Button onClick={() => nagivate(`/dashboard/order/${o.order_code}`)} ><Eye className="w-4 h-4 text-white" /></Button>
                                <Button onClick={() => handleEdit(o)}>
                                    <Edit className="w-4 h-4" />
                                </Button>
                            </td>
                        </tr>
                    ))}

                    {selectedOrder && (
                        <FormOrderEdit
                            open={open}
                            onClose={() => (setOpen(false), setSelectedOrder(null))}
                            order={selectedOrder}
                            onSubmit={handleUpdate}
                            isPending={isPending}
                            setSelectedOrder={setSelectedOrder}
                        />
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default OrdersTable

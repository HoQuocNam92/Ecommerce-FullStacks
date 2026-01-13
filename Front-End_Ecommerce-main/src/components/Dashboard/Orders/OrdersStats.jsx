import React from "react"
import { Calendar, User, Package, DollarSign } from "lucide-react"
import ToUnitMoney from "@/utils/ToUnitMoney"

const OrdersStats = ({ value }) => {
    const { totalAmout, totalOrder, totalOrderToDay, totalAmountToDay } = value;
    const stats = [
        { title: "Tổng đơn hàng", value: totalOrder, icon: Package, color: "text-blue-600", bg: "bg-blue-50" },
        { title: "Đơn hàng hôm nay", value: totalOrderToDay, icon: Calendar, color: "text-green-600", bg: "bg-green-50" },
        { title: "Tổng doanh thu", value: ToUnitMoney(totalAmout), icon: DollarSign, color: "text-purple-600", bg: "bg-purple-50" },
        { title: "Doanh thu hôm nay", value: ToUnitMoney(totalAmountToDay), icon: DollarSign, color: "text-purple-600", bg: "bg-purple-50" },
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => {
                const Icon = s.icon
                return (
                    <div key={i} className="bg-white p-6 rounded-lg border shadow-sm flex items-center justify-between">
                        <div>
                            <h3 className="text-sm text-gray-500">{s.title}</h3>
                            <p className="text-xl font-bold text-gray-900">{s.value}</p>
                        </div>
                        <div className={`p-3 rounded-lg ${s.bg}`}>
                            <Icon className={`w-6 h-6 ${s.color}`} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default OrdersStats

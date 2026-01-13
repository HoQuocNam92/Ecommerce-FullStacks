

import React from "react"
import {
    DollarSign,
    ShoppingCart,
    Users,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui"
import { Spinner } from "@/components/ui/spinner"
import ToUnitMoney from "@/utils/ToUnitMoney"

const YearlyStats = ({ yearlyStats }) => {

    if (yearlyStats.isLoading) return <Spinner />
    if (!yearlyStats.data) return null

    const data = yearlyStats.data

    const stats = [
        {
            title: "Tổng doanh thu năm",
            value: ToUnitMoney(data.totalRevenue),
            change: `${data.orderGrowthPercent}%`,
            trend: data.orderGrowthPercent >= 0 ? "up" : "down",
            icon: DollarSign,
            color: "text-green-600",
            bgColor: "bg-green-50",
        },
        {
            title: "Tổng đơn hàng",
            value: data.totalOrders.toLocaleString(),
            change: `${data.orderGrowthPercent}%`,
            trend: data.orderGrowthPercent >= 0 ? "up" : "down",
            icon: ShoppingCart,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
        },
        {
            title: "Khách hàng mới",
            value: data.totalUsers.toLocaleString(),
            change: "—",
            trend: "up",
            icon: Users,
            color: "text-purple-600",
            bgColor: "bg-purple-50",
        },
        {
            title: "Trung bình / đơn",
            value: ToUnitMoney(data.avgOrderValue),
            change: "—",
            trend: "up",
            icon: TrendingUp,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
        },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((item, index) => {
                const Icon = item.icon
                return (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                {item.title}
                            </CardTitle>
                            <div className={`p-2 rounded-lg ${item.bgColor}`}>
                                <Icon className={`h-4 w-4 ${item.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{item.value}</div>
                            <div className="flex items-center text-sm mt-1">
                                {item.trend === "up" ? (
                                    <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                                ) : (
                                    <ArrowDownRight className="h-4 w-4 text-red-700 mr-1" />
                                )}
                                <span className={item.trend === "up" ? "text-green-600" : "text-red-600"}>
                                    {item.change}
                                </span>
                                <span className="text-gray-500 ml-1">so với năm trước</span>
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}

export default YearlyStats

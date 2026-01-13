import React from "react"
import YearlyStats from "@/components/Dashboard/RevenueReport/YearlyStats"
import RevenueChart from "@/components/Dashboard/RevenueReport/RevenueChart"
import TopProductsTable from "@/components/Dashboard/RevenueReport/TopProductsTable"
import useRevenue from "@/hooks/useRevenue"
import dayjs from "dayjs"

const RevenueReport = () => {

    const {
        setStartDate,
        setEndDate,
        getRevenueByMonth,
        getRevenueByYear,
        getTopProducts
    } = useRevenue()

    return (
        <div className="space-y-6 p-4">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Báo cáo doanh thu</h1>
                <p className="text-gray-600 mt-2">
                    Thống kê chi tiết về doanh thu và hiệu suất kinh doanh
                </p>
            </div>

            <YearlyStats yearlyStats={getRevenueByYear} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <RevenueChart data={getRevenueByMonth} />
            </div>

            <div className="bg-white rounded-2xl p-4 shadow">
                <div className="flex gap-2 items-center mb-4">
                    <input
                        type="date"
                        onChange={(e) => setStartDate(dayjs(e.target.value))}
                        className="border rounded px-2 py-1"
                    />

                    <input
                        type="date"
                        onChange={(e) => setEndDate(dayjs(e.target.value))}
                        className="border rounded px-2 py-1"
                    />
                </div>

                <TopProductsTable query={getTopProducts.data || []} />
            </div>
        </div>
    )
}

export default RevenueReport

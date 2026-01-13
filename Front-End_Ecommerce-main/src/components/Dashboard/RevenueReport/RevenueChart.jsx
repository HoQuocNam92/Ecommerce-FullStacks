import React from "react"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import ToUnitMoney from "@/utils/ToUnitMoney"

const RevenueChart = ({ data }) => {

    if (data.isLoading) return <Spinner />
    if (!data?.data?.length) return null

    return (
        <Card className="rounded-2xl shadow-md col-span-3">
            <CardHeader>
                <CardTitle>Doanh thu theo tháng</CardTitle>
            </CardHeader>

            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                        data={data.data}
                        margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                        />

                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            width={80}
                            domain={[0, "auto"]}
                            tickFormatter={(v) => {
                                if (v >= 1_000_000)
                                    return (v / 1_000_000).toFixed(1) + "tr"
                                if (v >= 1_000)
                                    return (v / 1_000).toFixed(0) + "k"
                                return v
                            }}
                        />

                        <Tooltip
                            formatter={(v) => ToUnitMoney(v)}
                            labelFormatter={(label) => `Tháng ${label}`}
                        />

                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#4f46e5"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}

export default RevenueChart

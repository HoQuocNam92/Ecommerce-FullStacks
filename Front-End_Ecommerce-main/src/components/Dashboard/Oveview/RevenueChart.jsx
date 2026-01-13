"use client";

import {
    BarChart,
    Bar,
    XAxis,
    CartesianGrid,
    ResponsiveContainer,
    YAxis
} from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart";

export default function RevenueChart({ chartData }) {
    return (
        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Doanh thu theo tháng
            </h3>

            <ChartContainer
                config={{
                    revenue: { label: "Doanh thu", color: "#22c55e" },
                }}
                className="h-[300px] w-full"
            >
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 20, left: 10, bottom: 10 }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#e5e7eb"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                            className="text-gray-500 text-sm"
                        />

                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                            width={80}
                            tickFormatter={(value) =>
                                value >= 1_000_000
                                    ? `${(value / 1_000_000).toFixed(1)}tr`
                                    : value.toLocaleString("vi-VN")
                            }
                            className="text-gray-500 text-sm"
                        />

                        <ChartTooltip
                            cursor={{ fill: "rgba(0,0,0,0.05)" }}
                            content={<ChartTooltipContent />}
                        />

                        <Bar
                            dataKey="revenue"
                            fill="#22c55e"
                            radius={[6, 6, 0, 0]}
                            barSize={32}
                        />
                    </BarChart>

                </ResponsiveContainer>
            </ChartContainer>
        </div>
    );
}



import React from "react";
import useDashboard from "@/hooks/useDashboard";
import StatCard from "./Oveview/StatsCards";
import RevenueChart from "./Oveview/RevenueChart";
import RecentOrders from "./Oveview/RecentOrders";
import PageHeader from "./Oveview/PageHeader";
import { Spinner } from "@/components/ui/spinner";

const Dashboard = () => {
    const { error, stats, chartData, recentOrders, topProducts, loading } = useDashboard();
    if (loading) return <Spinner />
    return (
        <div style={{ padding: "24px", backgroundColor: "#f9fafb", minHeight: "100vh" }}>
            <PageHeader />
            {error && <div style={{ color: 'red', marginBottom: 12 }}>{error?.message}</div>}
            <StatCard stats={stats} />

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "24px",
                    marginBottom: "24px",
                }}
            >
                <RevenueChart chartData={chartData} />
            </div>

            <RecentOrders recentOrders={recentOrders} />

        </div>
    );
};

export default Dashboard;


import {
    DollarSign,
    ShoppingCart,
    Users,
    Package,
    ArrowUpRight,
    ArrowDownRight,
} from "lucide-react";

export default function StatsCards({ stats }) {
    if (!stats) return null;
    const cards = [
        {
            title: "Tổng doanh thu",
            value: stats.totalRevenue.toLocaleString("vi-VN") + " đ",
            change: stats.revenueChange,
            icon: DollarSign,
            color: "#22c55e",
            bgColor: "#dcfce7",
        },
        {
            title: "Đơn hàng",
            value: stats.totalOrders,
            change: stats.orderChange,
            icon: ShoppingCart,
            color: "#3b82f6",
            bgColor: "#dbeafe",
        },
        {
            title: "Khách hàng",
            value: stats.totalUsers,
            change: stats.userChange,
            icon: Users,
            color: "#8b5cf6",
            bgColor: "#ede9fe",
        },
        {
            title: "Sản phẩm",
            value: stats.totalProducts,
            icon: Package,
            color: "#f59e0b",
            bgColor: "#fef3c7",
        },
    ];

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "24px",
                marginBottom: "24px",
            }}
        >
            {cards.map((card, index) => {
                const Icon = card.icon;
                const isUp = card.change >= 0;

                return (
                    <div
                        key={index}
                        style={{
                            backgroundColor: "white",
                            padding: "24px",
                            borderRadius: "16px",
                            border: "1px solid #e5e7eb",
                        }}
                    >
                        {/* Header */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "16px",
                            }}
                        >
                            <h3
                                style={{
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    color: "#6b7280",
                                    margin: 0,
                                }}
                            >
                                {card.title}
                            </h3>

                            <div
                                style={{
                                    padding: "10px",
                                    borderRadius: "12px",
                                    backgroundColor: card.bgColor,
                                }}
                            >
                                <Icon size={18} color={card.color} />
                            </div>
                        </div>

                        {/* Value */}
                        <div
                            style={{
                                fontSize: "28px",
                                fontWeight: "bold",
                                color: "#111827",
                                marginBottom: "8px",
                            }}
                        >
                            {card.value}
                        </div>

                        {/* Trend */}
                        {card.change !== undefined && (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    fontSize: "14px",
                                }}
                            >
                                {isUp ? (
                                    <ArrowUpRight size={16} color="#10b981" />
                                ) : (
                                    <ArrowDownRight size={16} color="#ef4444" />
                                )}

                                <span
                                    style={{
                                        marginLeft: 4,
                                        color: isUp ? "#059669" : "#dc2626",
                                        fontWeight: 500,
                                    }}
                                >
                                    {Math.abs(card.change)}%
                                </span>

                                <span style={{ marginLeft: 4, color: "#6b7280" }}>
                                    so với tháng trước
                                </span>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

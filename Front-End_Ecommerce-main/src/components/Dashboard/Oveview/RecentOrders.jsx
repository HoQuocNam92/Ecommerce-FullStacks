

import ToUnitMoney from "@/utils/ToUnitMoney";
import dayjs from "dayjs";
import { AlertCircle, CheckCircle, Clock, ShoppingCart, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const getPaymentMethod = (payment) => {
    if (payment === "Thanh toán online") {
        return <span className="text-green-600 text-xs">💳 Online</span>;
    } else if (payment === "Thanh toán khi nhận hàng") {
        return <span className="text-blue-600 text-xs">💰 COD</span>;
    } else {
        return <span className="text-gray-600 text-xs">⏳ {payment}</span>;
    }
};

const getStatusBadge = (status) => {
    const statusConfig = {
        completed: {
            label: "Hoàn thành",
            className: "bg-green-100 text-green-800",
            icon: CheckCircle,
        },
        processing: {
            label: "Đang xử lý",
            className: "bg-yellow-100 text-yellow-800",
            icon: Clock,
        },
        shipped: {
            label: "Đã giao",
            className: "bg-blue-100 text-blue-800",
            icon: Truck,
        },
        pending: {
            label: "Chờ xác nhận",
            className: "bg-gray-100 text-gray-800",
            icon: Clock,
        },
        cancelled: {
            label: "Đã hủy",
            className: "bg-red-100 text-red-800",
            icon: AlertCircle,
        },
    };

    const config =
        statusConfig[status] || {
            label: status,
            className: "bg-gray-100 text-gray-800",
            icon: AlertCircle,
        };
    const Icon = config.icon;

    return (
        <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}
        >
            <Icon className="h-3 w-3" />
            {config.label}
        </span>
    );
};

export default function RecentOrders({ recentOrders }) {
    return (
        <div
            style={{
                backgroundColor: "white",
                padding: "24px",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                marginBottom: "24px",
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "16px",
                }}
            >
                <ShoppingCart style={{ width: "20px", height: "20px" }} />
                <h3 style={{ fontSize: "18px", fontWeight: "600", margin: 0 }}>
                    Đơn hàng gần đây
                </h3>
            </div>

            {/* Table */}
            <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%" }}>
                    <thead>
                        <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                            <th style={thStyle}>Mã đơn</th>
                            <th style={thStyle}>Khách hàng</th>
                            <th style={thStyle}>Sản phẩm</th>
                            <th style={thStyle}>Số tiền</th>
                            <th style={thStyle}>Trạng thái</th>
                            <th style={thStyle}>Thanh toán</th>
                            <th style={thStyle}>Thời gian</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrders?.map((order) => (
                            <tr key={order.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                                <td style={tdStyle}>{order.order_code}</td>
                                <td style={tdStyle}>{order.customer}</td>
                                <td className="w-[450px]" style={tdStyle}>{order.product}</td>
                                <td style={tdStyle}>{ToUnitMoney(order.total_amount)}</td>
                                <td style={tdStyle}>{getStatusBadge(order.status)}</td>
                                <td style={tdStyle}>{getPaymentMethod(order.payment)}</td>
                                <td style={tdStyle}>
                                    {dayjs(order?.created_at).format("DD/MM/YYYY HH:mm:ss")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div style={{ textAlign: "center", marginTop: "16px" }}>
                <Link
                    to="/dashboard/orders"
                    style={{
                        color: "#2563eb",
                        fontSize: "14px",
                        fontWeight: "500",
                        textDecoration: 'none'
                    }}
                >
                    Xem tất cả đơn hàng →
                </Link>
            </div>
        </div>
    );
}

// CSS inline tái sử dụng
const thStyle = {
    textAlign: "left",
    padding: "12px 16px",
    fontWeight: "500",
    color: "#374151",
};
const tdStyle = {
    padding: "12px 16px",
};

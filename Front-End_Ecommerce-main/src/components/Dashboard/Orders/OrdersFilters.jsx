import React from "react"
import { Search, Download } from "lucide-react"

const OrdersFilters = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter, dateFilter, setDateFilter }) => {
    return (
        <div className="bg-white p-4 rounded-lg border flex flex-wrap gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-[250px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Tìm kiếm đơn hàng..."
                    className="w-full pl-10 pr-3 py-2 border rounded-lg"
                />
            </div>

            {/* Status Filter */}
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border rounded-lg px-3 py-2">
                <option value="all">Tất cả trạng thái</option>
                <option value="pending">Chờ xác nhận</option>
                <option value="processing">Đang xử lý</option>
                <option value="shipped">Đã giao</option>
                <option value="completed">Hoàn thành</option>
                <option value="cancelled">Đã hủy</option>
            </select>

            {/* Date Filter */}
            <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="border rounded-lg px-3 py-2">
                <option value="all">Tất cả thời gian</option>
                <option value="today">Hôm nay</option>
                <option value="week">Tuần này</option>
            </select>

            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg">
                <Download className="w-4 h-4" /> Xuất Excel
            </button>
        </div>
    )
}

export default OrdersFilters

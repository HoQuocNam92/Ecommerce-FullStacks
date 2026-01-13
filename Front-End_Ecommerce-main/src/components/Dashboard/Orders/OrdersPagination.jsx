import React from "react"

const OrdersPagination = ({ total }) => {
    return (
        <div className="flex items-center justify-between pt-4 border-t">
            <p className="text-sm text-gray-500">Hiển thị {total} đơn hàng</p>
            <div className="flex gap-2">
                <button className="px-3 py-1 border rounded">Trước</button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
                <button className="px-3 py-1 border rounded">Sau</button>
            </div>
        </div>
    )
}

export default OrdersPagination

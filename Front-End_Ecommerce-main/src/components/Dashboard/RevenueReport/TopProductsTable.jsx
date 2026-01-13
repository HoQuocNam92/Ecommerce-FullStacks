import React from "react"
import { Spinner } from "@/components/ui/spinner"
import ToUnitMoney from "@/utils/ToUnitMoney"

const TopProductsTable = ({ query }) => {

    if (query.isLoading) return <Spinner />
    if (!query.data || query.data.length === 0) {
        return <div className="text-gray-500">Không có dữ liệu</div>
    }

    return (
        <div className="bg-white rounded-2xl p-4 shadow">
            <h3 className="text-lg font-semibold mb-4">
                Sản phẩm bán chạy
            </h3>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="text-left border-b">
                            <th className="p-2">Tên</th>
                            <th className="p-2">Đã bán</th>
                            <th className="p-2">Doanh thu ước tính</th>
                        </tr>
                    </thead>
                    <tbody>
                        {query.data.map((p, idx) => (
                            <tr key={idx} className="border-b last:border-none">
                                <td className="p-2">{p.name}</td>
                                <td className="p-2">{p.totalQuantity}</td>
                                <td className="p-2">
                                    {ToUnitMoney(p.totalAmount)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TopProductsTable

import React, { useEffect, useState } from 'react';
import { GetTopProducts } from '@/services/ProductServices';

export default function BestSelling() {
    const [topProducts, setTopProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        loadTopProducts();
    }, [fromDate, toDate, limit]);

    const loadTopProducts = async () => {
        try {
            setLoading(true);
            const params = {
                limit: Number(limit) || 10
            };
            if (fromDate) params.from = fromDate;
            if (toDate) params.to = toDate;

            const products = await GetTopProducts(params);
            setTopProducts(products || []);
        } catch (e) {
            setError(e?.message || 'Lỗi tải dữ liệu');
        } finally {
            setLoading(false);
        }
    };

    const exportToCSV = () => {
        const headers = ['Tên sản phẩm', 'Số lượng bán', 'Doanh thu (₫)'];
        const csvContent = [
            headers.join(','),
            ...topProducts.map(p => [
                `"${p.name || 'N/A'}"`,
                p.sales || 0,
                p.revenue || 0
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `top-products-${Date.now()}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    if (loading) return <div className="p-6">Đang tải...</div>;
    if (error) return <div className="p-6 text-red-600">{error}</div>;

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Sản phẩm bán chạy</h1>
                <p className="text-gray-600 mt-2">Thống kê sản phẩm bán chạy theo thời gian</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg border p-4">
                <h3 className="text-lg font-semibold mb-4">Bộ lọc thời gian</h3>
                <div className="flex gap-4 items-end">
                    <div>
                        <label className="block text-sm font-medium mb-1">Từ ngày</label>
                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            className="border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Đến ngày</label>
                        <input
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            className="border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Số lượng hiển thị</label>
                        <select
                            value={limit}
                            onChange={(e) => setLimit(Number(e.target.value))}
                            className="border rounded px-3 py-2"
                        >
                            <option value={5}>Top 5</option>
                            <option value={10}>Top 10</option>
                            <option value={20}>Top 20</option>
                            <option value={50}>Top 50</option>
                        </select>
                    </div>
                    <button
                        onClick={exportToCSV}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Xuất CSV
                    </button>
                </div>
            </div>

            {/* Results */}
            <div className="bg-white rounded-lg border p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                        Top {limit} sản phẩm bán chạy
                        {fromDate && toDate && (
                            <span className="text-sm font-normal text-gray-600 ml-2">
                                ({fromDate} - {toDate})
                            </span>
                        )}
                    </h2>
                    <div className="text-sm text-gray-500">
                        Tổng: {topProducts.length} sản phẩm
                    </div>
                </div>

                {topProducts.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Không có dữ liệu trong khoảng thời gian này</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="border p-3 text-left">#</th>
                                    <th className="border p-3 text-left">Tên sản phẩm</th>
                                    <th className="border p-3 text-left">Số lượng bán</th>
                                    <th className="border p-3 text-left">Doanh thu</th>
                                    <th className="border p-3 text-left">Trung bình/đơn</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topProducts.map((product, index) => {
                                    const avgPrice = product.sales > 0 ? product.revenue / product.sales : 0;
                                    return (
                                        <tr key={product.id} className="border-b hover:bg-gray-50">
                                            <td className="border p-3">
                                                <span className="font-bold text-blue-600">#{index + 1}</span>
                                            </td>
                                            <td className="border p-3">
                                                <div className="font-medium">{product.name || `Sản phẩm ${product.id}`}</div>
                                                <div className="text-sm text-gray-500">ID: {product.id}</div>
                                            </td>
                                            <td className="border p-3">
                                                <span className="font-medium text-green-600">
                                                    {Number(product.sales || 0).toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="border p-3">
                                                <span className="font-medium">
                                                    {new Intl.NumberFormat('vi-VN').format(Number(product.revenue || 0))} ₫
                                                </span>
                                            </td>
                                            <td className="border p-3">
                                                <span className="text-gray-600">
                                                    {new Intl.NumberFormat('vi-VN').format(avgPrice)} ₫
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}



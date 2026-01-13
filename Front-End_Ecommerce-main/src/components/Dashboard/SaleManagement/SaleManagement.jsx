import React, { useEffect, useState } from 'react';
import { GetSaleProducts, SetProductSale } from '@/services/ProductServices';

export default function SaleManagement() {
    const [saleProducts, setSaleProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadSaleProducts();
    }, []);

    const loadSaleProducts = async () => {
        try {
            setLoading(true);
            const products = await GetSaleProducts();
            setSaleProducts(products || []);
        } catch (e) {
            setError(e?.message || 'Lỗi tải dữ liệu');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveSale = async (productId, discountPercent, onSale) => {
        try {
            await SetProductSale(productId, {
                discount_percent: Number(discountPercent),
                on_sale: onSale
            });
            alert('Cập nhật thành công!');
            loadSaleProducts(); // Reload data
        } catch (e) {
            alert('Lỗi cập nhật: ' + (e?.message || 'Unknown error'));
        }
    };

    if (loading) return <div className="p-6">Đang tải...</div>;
    if (error) return <div className="p-6 text-red-600">{error}</div>;

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Quản lý sản phẩm sale</h1>
                <p className="text-gray-600 mt-2">Quản lý giảm giá và trạng thái sale cho sản phẩm</p>
            </div>

            <div className="bg-white rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-4">Danh sách sản phẩm đang sale</h2>

                {saleProducts.length === 0 ? (
                    <p className="text-gray-500">Chưa có sản phẩm nào đang sale</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="border p-3 text-left">Sản phẩm</th>
                                    <th className="border p-3 text-left">Giá gốc</th>
                                    <th className="border p-3 text-left">Phần trăm giảm</th>
                                    <th className="border p-3 text-left">Giá sale</th>
                                    <th className="border p-3 text-left">Trạng thái</th>
                                    <th className="border p-3 text-left">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {saleProducts.map((product) => {
                                    const originalPrice = Number(product.price || 0);
                                    const discountPercent = Number(product.discount_percent || 0);
                                    const salePrice = originalPrice * (1 - discountPercent / 100);
                                    const isOnSale = Number(product.on_sale || 0) === 1;

                                    return (
                                        <tr key={product.id} className="border-b">
                                            <td className="border p-3">
                                                <div>
                                                    <div className="font-medium">{product.name || product.name_product}</div>
                                                    <div className="text-sm text-gray-500">ID: {product.id}</div>
                                                </div>
                                            </td>
                                            <td className="border p-3">
                                                {new Intl.NumberFormat('vi-VN').format(originalPrice)} ₫
                                            </td>
                                            <td className="border p-3">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    step="1"
                                                    defaultValue={discountPercent}
                                                    className="border rounded px-2 py-1 w-20"
                                                    id={`discount-${product.id}`}
                                                />%
                                            </td>
                                            <td className="border p-3">
                                                <span className="font-medium text-green-600">
                                                    {new Intl.NumberFormat('vi-VN').format(salePrice)} ₫
                                                </span>
                                            </td>
                                            <td className="border p-3">
                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        defaultChecked={isOnSale}
                                                        id={`sale-${product.id}`}
                                                        className="mr-2"
                                                    />
                                                    {isOnSale ? 'Đang sale' : 'Tạm dừng'}
                                                </label>
                                            </td>
                                            <td className="border p-3">
                                                <button
                                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                                    onClick={() => {
                                                        const discount = Number(document.getElementById(`discount-${product.id}`).value || 0);
                                                        const onSale = document.getElementById(`sale-${product.id}`).checked;
                                                        handleSaveSale(product.id, discount, onSale);
                                                    }}
                                                >
                                                    Lưu
                                                </button>
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



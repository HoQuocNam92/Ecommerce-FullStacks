import { SortAsc } from 'lucide-react';
import React from 'react'

const ProductEmpty = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center p-8">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <SortAsc className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
                Không tìm thấy sản phẩm
            </h3>
            <p className="text-gray-500">
                Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm khác
            </p>
        </div>
    );
}

export default ProductEmpty
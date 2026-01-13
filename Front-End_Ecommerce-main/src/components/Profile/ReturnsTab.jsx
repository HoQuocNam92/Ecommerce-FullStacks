import { RotateCcw } from 'lucide-react'
import React from 'react'

const ReturnsTab = () => {
    return (
        <main className="flex-1">
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <RotateCcw className="w-6 h-6 text-red-700" />
                        <h2 className="text-xl font-semibold text-gray-900">Đổi trả hàng</h2>
                    </div>
                </div>
                <div className="p-6">
                    <div className="text-center py-12">
                        <RotateCcw className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có yêu cầu đổi trả</h3>
                        <p className="text-gray-500 mb-6">Bạn chưa có yêu cầu đổi trả hàng nào</p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ReturnsTab
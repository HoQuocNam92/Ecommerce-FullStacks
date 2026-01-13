import React from "react"
import { Card, CardContent } from "@components/ui"
import { Package } from "lucide-react"

const CategoryStats = ({ categories }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Package className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
                            <p className="text-sm text-gray-600">Tổng danh mục</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 rounded-lg">
                            <Package className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">
                                {categories.filter((c) => c.status === "active").length}
                            </p>
                            <p className="text-sm text-gray-600">Đang hoạt động</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <Package className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">
                                {categories.reduce((sum, c) => sum + c.productCount, 0)}
                            </p>
                            <p className="text-sm text-gray-600">Tổng sản phẩm</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default CategoryStats

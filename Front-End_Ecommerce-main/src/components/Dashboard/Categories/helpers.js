import { Badge } from "../../ui"
import { Package } from "lucide-react"

export const categoriesMock = [
    {
        id: 1,
        name: "Điện thoại",
        description: "Các loại điện thoại di động",
        productCount: 156,
        status: "active",
        icon: Package,
        color: "bg-blue-100 text-blue-800",
    },
    {
        id: 2,
        name: "Laptop",
        description: "Máy tính xách tay các loại",
        productCount: 89,
        status: "active",
        icon: Package,
        color: "bg-green-100 text-green-800",
    },
    {
        id: 3,
        name: "Phụ kiện",
        description: "Phụ kiện điện tử",
        productCount: 234,
        status: "active",
        icon: Package,
        color: "bg-purple-100 text-purple-800",
    },
    {
        id: 4,
        name: "Đồng hồ",
        description: "Đồng hồ thông minh",
        productCount: 67,
        status: "inactive",
        icon: Package,
        color: "bg-gray-100 text-gray-800",
    },
]

export const getStatusBadge = (status) => {
    const statusConfig = {
        active: { label: "Hoạt động", className: "bg-green-100 text-green-800" },
        inactive: { label: "Không hoạt động", className: "bg-gray-100 text-gray-800" },
    }

    const config = statusConfig[status] || { label: status, className: "bg-gray-100 text-gray-800" }

    return (
        <Badge variant="outline" className={config.className}>
            {config.label}
        </Badge>
    )
}

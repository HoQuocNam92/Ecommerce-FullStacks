import React from "react"
import { Button, Card, CardContent, CardHeader, CardTitle, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Badge } from "@components/ui"
import { Edit, Trash2, Package } from "lucide-react"

const getStatusBadge = (status) => {
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

const CategoryTable = ({ categories, onEdit, onDelete }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Danh sách danh mục</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Danh mục</TableHead>
                            <TableHead>Số sản phẩm</TableHead>
                            <TableHead>Trạng thái</TableHead>
                            <TableHead className="text-right">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.map((category) => {
                            return (
                                <TableRow key={category.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg bg-blue-600 `}>
                                                <Package className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{category.name}</p>
                                                <p className="text-sm text-gray-500">ID: {category.id}</p>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <Badge variant="secondary">{category.productCount}</Badge>
                                    </TableCell>
                                    <TableCell>{getStatusBadge(category.status)}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => onEdit(category)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => onDelete?.(category)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default CategoryTable

// src/components/products/ProductsTable.jsx
import React from "react"
import { Eye, Edit, Trash2 } from "lucide-react"
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Badge, Card, CardHeader, CardTitle, CardContent } from "@/components/ui"
import ToUnitMoney from "@/utils/ToUnitMoney"
import { useNavigate } from "react-router-dom"
import LazyLoad from "@/components/LazyLoad/LazyLoad"
import toastConfirm from "@/utils/toastConfirm"

const getStatusBadge = (status = "active") => {
    const statusConfig = {
        active: { label: "Đang bán", className: "bg-green-100 text-green-800" },
        out_of_stock: { label: "Hết hàng", className: "bg-red-100 text-red-800" },
        draft: { label: "Bản nháp", className: "bg-gray-100 text-gray-800" }
    }
    const config = statusConfig[status] || { label: status, className: "bg-gray-100 text-gray-800" }
    return <Badge variant="outline" className={config.className}>{config.label}</Badge>
}




const ProductsTable = ({ products, deleteProduct }) => {
    const handleDelete = (product) => {
        toastConfirm("sản phẩm", product.name_product, product.id, deleteProduct)


    };

    const navigate = useNavigate();
    return (
        <Card>
            {products?.length > 0 && (
                <>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Sản phẩm</TableHead>
                                    <TableHead>Danh mục</TableHead>
                                    <TableHead>Giá</TableHead>
                                    <TableHead>Trạng thái</TableHead>
                                    <TableHead className="text-center" >Thao tác</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <LazyLoad src={product?.gallery} alt={product.name_product} className="h-10 w-10 rounded-lg object-cover" />

                                                <div>
                                                    <p className="font-medium text-gray-900 line-clamp-2">{product.name_product}</p>

                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="w-56">{product.name_category}</TableCell>
                                        <TableCell className="font-medium">{ToUnitMoney(product.price)}</TableCell>

                                        <TableCell className="w-32">{getStatusBadge(product.status)}</TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex items-center justify-center gap-2">

                                                <Button className='cursor-pointer' variant="ghost" size="icon" onClick={() => (navigate(`edit/${product?.slug}`))}><Edit className="h-4 w-4" /></Button>
                                                <Button className='cursor-pointer' variant="ghost" size="icon" onClick={() => handleDelete(product)} ><Trash2 className="h-4 w-4" /></Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </>
            )}

        </Card>
    )
}




export default ProductsTable

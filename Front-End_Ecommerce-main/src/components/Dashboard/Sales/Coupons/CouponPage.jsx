

import { Button } from "@/components/ui/button"
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import CouponForm from "@/components/Dashboard/Sales/Coupons/CouponForm"
import useCoupons from "@/hooks/useCoupons"
import dayjs from "dayjs"

export default function CouponPage() {
    const [isOpen, setIsOpen] = useState(false)
    const [editingCoupon, setEditingCoupon] = useState(null)

    const {
        coupons,
        isLoading,
        deleteCoupon
    } = useCoupons()

    const handleEdit = (coupon) => {
        setEditingCoupon(coupon)
        setIsOpen(true)
    }

    const handleDelete = async (id) => {
        if (confirm("Bạn chắc chắn muốn xóa mã này?")) {
            await deleteCoupon(id)
        }
    }

    const renderStatus = (coupon) => {
        const now = dayjs()
        if (now.isBefore(coupon.start_date) || now.isAfter(coupon.end_date)) {
            return <Badge variant="destructive">Hết hạn</Badge>
        }
        if (coupon.used_count >= coupon.max_uses) {
            return <Badge variant="secondary">Hết lượt</Badge>
        }
        return <Badge variant="success">Hoạt động</Badge>
    }

    return (
        <div className="space-y-6 p-4">
            <div className="p-6 space-y-4 bg-card border py-6 rounded-2xl shadow-md">

                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Mã giảm giá</h1>
                    <Button
                        onClick={() => {
                            setEditingCoupon(null)
                            setIsOpen(true)
                        }}
                    >
                        Thêm mã giảm giá
                    </Button>

                    <CouponForm
                        open={isOpen}
                        onClose={() => setIsOpen(false)}
                        defaultData={editingCoupon}
                    />
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Mã</TableHead>
                            <TableHead>Giảm</TableHead>
                            <TableHead>Tối đa</TableHead>
                            <TableHead>Đơn tối thiểu</TableHead>
                            <TableHead>Số lượt</TableHead>
                            <TableHead>Thời gian</TableHead>
                            <TableHead>Trạng thái</TableHead>

                            <TableHead className="text-right">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {isLoading && (
                            <TableRow>
                                <TableCell colSpan={6}>Đang tải...</TableCell>
                            </TableRow>
                        )}

                        {coupons.map(coupon => (
                            <TableRow key={coupon.id}>
                                <TableCell className="font-medium">
                                    {coupon.code}
                                </TableCell>

                                <TableCell>
                                    {coupon.discount_percent}%
                                </TableCell>
                                <TableCell>
                                    {coupon.max_discount_amount?.toLocaleString()}đ
                                </TableCell>

                                <TableCell>
                                    {coupon.min_order_amount?.toLocaleString()}đ
                                </TableCell>

                                <TableCell>
                                    {coupon.used_count}/{coupon.max_uses}
                                </TableCell>

                                <TableCell>
                                    {dayjs(coupon.start_date).format("DD/MM")} -{" "}
                                    {dayjs(coupon.end_date).format("DD/MM")}
                                </TableCell>

                                <TableCell>
                                    {renderStatus(coupon)}
                                </TableCell>

                                <TableCell className="text-right space-x-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleEdit(coupon)}
                                    >
                                        Sửa
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => handleDelete(coupon.id)}
                                    >
                                        Xóa
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

import React, { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useOrders } from "@/hooks/useOrders"
import { Spinner } from "@/components/ui/spinner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui"

const FormOrderDetails = () => {
    const { order_id } = useParams()
    const { setUserId, getOrderDetails } = useOrders()
    const order = getOrderDetails?.data

    const navigate = useNavigate();

    useEffect(() => {
        if (order_id) setUserId(order_id)
    }, [order_id])

    if (getOrderDetails?.isLoading) return <Spinner />
    if (!order) return null

    const items = JSON.parse(order.items)
    const timeline = JSON.parse(order.timeline)
    const shippingAddress = JSON.parse(order.shipping_address)?.[0]

    return (
        <div className="bg-gray-50 p-6">
            <div className="  space-y-6">

                <Card>
                    <CardHeader className="flex flex-row items-start justify-between">
                        <div>
                            <Button onClick={() => navigate(-1)}>
                                Quay lại
                            </Button>
                            <CardTitle className="text-xl">
                                Đơn hàng #{order.order_code}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Ngày tạo: {order.created_at}
                            </p>
                        </div>

                        <Badge
                            variant="outline"
                            className={
                                order.status === "PAID"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                            }
                        >
                            {order.status}
                        </Badge>
                    </CardHeader>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <div className="lg:col-span-2 space-y-6">

                        <Card>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                                <Info label="Khách hàng" value={order.customer} />
                                <Info label="Thanh toán" value={order.payment_method} />
                                <Info label="Trạng thái thanh toán" value={order.payment_status} />
                                <Info label="Vận chuyển" value={order.shipping_method} />
                            </CardContent>
                        </Card>

                        {shippingAddress && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">
                                        Địa chỉ giao hàng
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm space-y-1">
                                    <p className="font-medium">{shippingAddress.full_name}</p>
                                    <p>{shippingAddress.phone}</p>
                                    <p className="text-muted-foreground">
                                        {shippingAddress.address_detail}
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Sản phẩm</CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                {items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-4 border rounded-lg p-4"
                                    >
                                        <img
                                            src={item.thumbnail}
                                            alt={item.product_name}
                                            className="w-20 h-20 rounded object-cover"
                                        />

                                        <div className="flex-1">
                                            <p className="font-medium">
                                                {item.product_name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Màu: {item.color || "-"} | Size: {item.size || "-"}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                SL: {item.quantity}
                                            </p>
                                        </div>

                                        <div className="text-right font-medium text-red-600">
                                            {item.price.toLocaleString()} ₫
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">

                        {timeline?.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">
                                        Lịch sử đơn hàng
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    {timeline.map((t, i) => (
                                        <div
                                            key={i}
                                            className="border-l-4 border-blue-500 pl-4"
                                        >
                                            <p className="font-medium">{t.title}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {t.description}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {t.timestamp}
                                            </p>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        )}

                        {/* Total */}
                        <Card>
                            <CardContent className="pt-6 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Phí vận chuyển</span>
                                    <span>
                                        {order.discount_amount?.toLocaleString() || 0} ₫
                                    </span>
                                </div>
                                <Separator />

                                <div className="flex justify-between text-sm">
                                    <span>Giảm giá</span>
                                    <span>
                                        {order.discount_amount?.toLocaleString() || 0} ₫
                                    </span>
                                </div>
                                <Separator />

                                <div className="flex justify-between text-lg font-bold text-red-600">
                                    <span>Tổng cộng</span>
                                    <span>
                                        {order.final_amount.toLocaleString()} ₫
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Info = ({ label, value }) => (
    <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value || "-"}</p>
    </div>
)

export default FormOrderDetails

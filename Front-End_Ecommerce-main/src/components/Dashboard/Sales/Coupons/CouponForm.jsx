

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import useCoupons from "@/hooks/useCoupons"
import dayjs from "dayjs"

export default function CouponForm({ open, onClose, defaultData }) {
    const { createCoupon, updateCoupon, isCreating, isUpdating } = useCoupons()

    const [form, setForm] = useState({
        code: "",
        discount_percent: "",
        max_discount_amount: "",
        min_order_amount: "",
        max_uses: "",
        start_date: "",
        end_date: ""
    })

    useEffect(() => {
        if (defaultData) {
            setForm({
                code: defaultData.code,
                discount_percent: defaultData.discount_percent,
                max_discount_amount: defaultData.max_discount_amount,
                min_order_amount: defaultData.min_order_amount,
                max_uses: defaultData.max_uses,
                start_date: dayjs(defaultData.start_date).format("YYYY-MM-DD"),
                end_date: dayjs(defaultData.end_date).format("YYYY-MM-DD")
            })
        }
    }, [defaultData])


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        if (defaultData) {
            await updateCoupon({
                id: defaultData.id,
                data: form
            })
        } else {
            await createCoupon(form)
        }

        onClose()
        setForm({
            code: "",
            discount_percent: "",
            max_discount_amount: "",
            min_order_amount: "",
            max_uses: "",
            start_date: "",
            end_date: ""
        })

    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        {defaultData ? "Cập nhật mã giảm giá" : "Thêm mã giảm giá"}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <Label>Mã giảm giá</Label>
                        <Input
                            name="code"
                            value={form.code}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Giảm tối đa (đ)</Label>
                            <Input
                                type="number"
                                name="max_discount_amount"
                                value={form.max_discount_amount}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label>Đơn tối thiểu (đ)</Label>
                            <Input
                                type="number"
                                name="min_order_amount"
                                value={form.min_order_amount}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <Label>Giảm (%)</Label>
                        <Input
                            type="number"
                            name="discount_percent"
                            value={form.discount_percent}
                            onChange={handleChange}
                        />
                    </div>


                    <div>
                        <Label>Số lượt sử dụng</Label>
                        <Input
                            type="number"
                            name="max_uses"
                            value={form.max_uses}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Ngày bắt đầu</Label>
                            <Input
                                type="date"
                                name="start_date"
                                value={form.start_date}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label>Ngày kết thúc</Label>
                            <Input
                                type="date"
                                name="end_date"
                                value={form.end_date}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Hủy
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isCreating || isUpdating}
                    >
                        Lưu
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

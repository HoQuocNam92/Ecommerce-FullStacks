import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui"
import { ORDER_STATUS, PAYMENT_STATUS } from "@/constants/orderStatus"

const FormOrderEdit = ({ open, onClose, order, onSubmit, isPending, setSelectedOrder }) => {


    const [form, setForm] = useState({
        user_id: order?.user_id,
        order_id: order?.order_id,
        order_status: order?.status,
        payment_status: order?.payment_status,
    })

    const handleSubmit = async () => {
        await onSubmit(form)
        setSelectedOrder(null)
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[450px]">
                <DialogHeader>
                    <DialogTitle>Cập nhật trạng thái đơn hàng</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {/* Order status */}
                    <div>
                        <label className="text-sm font-medium">Trạng thái đơn hàng</label>
                        <Select
                            value={form.order_status}
                            onValueChange={(v) =>
                                setForm((prev) => ({ ...prev, order_status: v }))
                            }
                        >
                            <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Chọn trạng thái" />
                            </SelectTrigger>
                            <SelectContent>
                                {ORDER_STATUS.map((s) => (
                                    <SelectItem key={s.value} value={s.value}>
                                        {s.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="text-sm font-medium">Trạng thái thanh toán</label>
                        <Select
                            value={form.payment_status}
                            onValueChange={(v) =>
                                setForm((prev) => ({ ...prev, payment_status: v }))
                            }
                        >
                            <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Chọn trạng thái" />
                            </SelectTrigger>
                            <SelectContent>
                                {PAYMENT_STATUS.map((s) => (
                                    <SelectItem key={s.value} value={s.value}>
                                        {s.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Hủy
                    </Button>
                    <Button onClick={handleSubmit} disabled={isPending}>
                        {isPending ? "Đang lưu..." : "Cập nhật"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default FormOrderEdit

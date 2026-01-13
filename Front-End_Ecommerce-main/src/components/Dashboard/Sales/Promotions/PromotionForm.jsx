import { useEffect, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function PromotionForm({ open, onClose, initialData, onSubmit }) {
    const [form, setForm] = useState({
        product_id: '',
        sale_percent: '',
        start_at: '',
        end_at: ''
    })

    useEffect(() => {
        if (initialData) {
            setForm({
                product_id: initialData.product_id,
                sale_percent: initialData.sale_percent,
                start_at: initialData.start_at?.slice(0, 16),
                end_at: initialData.end_at?.slice(0, 16),
            })
        } else {
            setForm({
                product_id: '',
                sale_percent: '',
                start_at: '',
                end_at: ''
            })
        }
    }, [initialData])

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async () => {
        await onSubmit(form)
        onClose()
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        {initialData ? 'Chỉnh sửa Flash Sale' : 'Tạo Flash Sale'}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Product ID (sau này đổi thành select) */}
                    <Input
                        name="product_id"
                        value={form.product_id}
                        onChange={handleChange}
                        placeholder="Product ID"
                    />

                    <Input
                        name="sale_percent"
                        type="number"
                        value={form.sale_percent}
                        onChange={handleChange}
                        placeholder="Giảm (%)"
                    />

                    <Input
                        name="start_at"
                        type="datetime-local"
                        value={form.start_at}
                        onChange={handleChange}
                    />

                    <Input
                        name="end_at"
                        type="datetime-local"
                        value={form.end_at}
                        onChange={handleChange}
                    />
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Hủy
                    </Button>
                    <Button onClick={handleSubmit}>
                        Lưu
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

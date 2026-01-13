import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import PromotionForm from "@/components/Dashboard/Sales/Promotions/PromotionForm";
import useFlashSale from '@/hooks/useFlashSale'
import { useState } from 'react'
import dayjs from "dayjs";

export default function PromotionPage() {
    const {
        promotions,
        createPromotion,
        updatePromotion,
        deletePromotion
    } = useFlashSale()

    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(null)

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between">
                <h1 className="text-xl font-semibold">Chương trình khuyến mãi</h1>
                <Button onClick={() => {
                    setSelected(null)
                    setOpen(true)
                }}>
                    Tạo chương trình
                </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {promotions.map(promo => (
                    <Card key={promo.id}>
                        <CardContent className="p-4 space-y-2">
                            <div className="flex justify-between">
                                <h2 className="font-semibold">{promo.name}</h2>
                                <Badge>{promo.is_active ? 'Đang chạy' : 'Hết hạn'}</Badge>
                            </div>

                            <p className="text-sm">Giảm {promo.sale_percent}%</p>
                            <p className="text-xs">
                                {dayjs(promo.start_at).format("DD-MM-YYYY")} - {dayjs(promo.end_at).format("DD-MM-YYYY")}
                            </p>

                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    onClick={() => {
                                        setSelected(promo)
                                        setOpen(true)
                                    }}
                                >
                                    Chỉnh sửa
                                </Button>

                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => deletePromotion(promo.id)}
                                >
                                    Xóa
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <PromotionForm
                open={open}
                onClose={() => setOpen(false)}
                initialData={selected}
                onSubmit={(data) =>
                    selected
                        ? updatePromotion({ id: selected.id, data })
                        : createPromotion(data)
                }
            />
        </div>
    )
}

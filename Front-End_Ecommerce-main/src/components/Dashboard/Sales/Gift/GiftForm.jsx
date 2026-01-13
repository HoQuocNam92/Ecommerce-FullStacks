import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function GiftForm({ open, onClose }) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Chương trình tặng kèm</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <Label>Sản phẩm mua</Label>
                        <Input placeholder="Áo sơ mi" />
                    </div>

                    <div>
                        <Label>Sản phẩm tặng</Label>
                        <Input placeholder="Khẩu trang" />
                    </div>

                    <div>
                        <Label>Số lượng tặng</Label>
                        <Input type="number" placeholder="1" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Ngày bắt đầu</Label>
                            <Input type="date" />
                        </div>
                        <div>
                            <Label>Ngày kết thúc</Label>
                            <Input type="date" />
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Hủy</Button>
                    <Button>Lưu</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

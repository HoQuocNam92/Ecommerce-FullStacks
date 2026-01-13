import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import GiftForm from "@/components/Dashboard/Sales/Gift/GiftForm"
import { useState } from "react"

export default function GiftPage() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="p-6 space-y-6">
            <div className="p-6 space-y-4 bg-card   border py-6 rounded-2xl shadow-md">
                <div className="flex justify-between">
                    <h1 className="text-xl font-semibold">Tặng kèm</h1>
                    <Button onClick={() => setIsOpen(!isOpen)}>Thêm chương trình</Button>
                    <GiftForm open={isOpen} onClose={() => setIsOpen(false)} />
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Mua</TableHead>
                            <TableHead>Tặng</TableHead>
                            <TableHead>Số lượng</TableHead>
                            <TableHead>Thời gian</TableHead>
                            <TableHead>Trạng thái</TableHead>
                            <TableHead className="text-right">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        <TableRow>
                            <TableCell>Áo sơ mi</TableCell>
                            <TableCell>Khẩu trang</TableCell>
                            <TableCell>1</TableCell>
                            <TableCell>01/01 - 15/01</TableCell>
                            <TableCell>
                                <Badge variant="success">Hoạt động</Badge>
                            </TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button size="sm" variant="outline">Sửa</Button>
                                <Button size="sm" variant="destructive">Xóa</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

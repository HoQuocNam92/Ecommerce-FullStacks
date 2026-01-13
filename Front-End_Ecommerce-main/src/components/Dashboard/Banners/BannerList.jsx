import React, { useState } from "react"
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
    Button, Badge, Dialog, DialogContent, DialogHeader, DialogTitle
} from "@/components/ui"

import BannerForm from "./BannerForm"
import { Spinner } from "@/components/ui/spinner"
import dayjs from "dayjs"
import toastConfirm from "@/utils/toastConfirm"

const BannerList = ({ createBanner, banners, deleteBanner, updateBanner }) => {

    const [open, setOpen] = useState(false)
    const [selectedBanner, setSelectedBanner] = useState(null)



    const handleEdit = banner => {
        setSelectedBanner(banner)
        setOpen(true)
    }

    const handleCreate = () => {
        setSelectedBanner(null);
        setOpen(true)
    }

    const handleDelete = (data) => {
        toastConfirm("banner", data.title, data.id, deleteBanner)
    }
    if (banners?.isLoading) return <Spinner />
    return (
        <div className="p-6 space-y-4 bg-card   border py-6 rounded-2xl shadow-md ">
            <div className="flex justify-between">
                <h1 className="text-xl font-semibold">Quản lý Banner</h1>
                <Button onClick={handleCreate}>
                    + Thêm banner
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Hình ảnh</TableHead>
                        <TableHead>Tiêu đề</TableHead>
                        <TableHead>Link</TableHead>
                        <TableHead>Thời gian</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead className="text-right">Hành động</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {banners?.data?.res?.map(b => (
                        <TableRow key={b.id}>
                            <TableCell>
                                <img
                                    src={b.image_url}
                                    className="w-32 h-16 object-cover rounded"
                                />
                            </TableCell>

                            <TableCell className="font-medium">{b.title}</TableCell>

                            <TableCell>
                                <a href={b.link_url} className="text-blue-600 underline">
                                    {b.link_url}
                                </a>
                            </TableCell>

                            <TableCell className="text-sm">
                                {dayjs(b.start_date).format("DD-MM-YYYY")} → {dayjs(b.end_date).format("DD-MM-YYYY")}
                            </TableCell>

                            <TableCell>
                                <Badge variant={b.is_active ? "success" : "destructive"}>
                                    {b.is_active ? "Active" : "Inactive"}
                                </Badge>
                            </TableCell>

                            <TableCell className="text-right space-x-2">
                                <Button
                                    className='cursor-pointer'
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleEdit(b)}
                                >
                                    Sửa
                                </Button>
                                <Button className='cursor-pointer' size="sm" variant="destructive" onClick={() => handleDelete({ id: b.id, title: b.title })}>
                                    Xóa
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-xl">
                    <DialogHeader>
                        <DialogTitle>
                            {selectedBanner ? "Cập nhật banner" : "Thêm banner"}
                        </DialogTitle>
                    </DialogHeader>

                    <BannerForm
                        banner={selectedBanner}
                        createBanner={createBanner}
                        updateBanner={updateBanner}
                        onSuccess={() => setOpen(false)}
                    />
                </DialogContent>
            </Dialog>
        </div >
    )
}

export default BannerList

import React, { useRef, useState } from "react"
import { Button, DialogContent, DialogHeader, DialogTitle, Input, Label, Textarea } from "@components/ui"
import { createCategory, updateCategory } from "@/services/CategoryServices"
import { toast } from "sonner"

const CategoryFormDialog = ({ editingCategory, onClose, onSaved }) => {
    const [loading, setLoading] = useState(false)
    const nameRef = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const payload = {
                name: nameRef.current?.value,
            }
            if (editingCategory?.id) {
                await updateCategory(editingCategory.id, payload)
                toast.success("Cập nhật danh mục thành công")
            } else {
                await createCategory(payload)
                toast.success("Thêm danh mục thành công")
            }
            onSaved?.()
            onClose()
        } catch (e) {
            toast.error(e?.message || "Lưu danh mục thất bại")
        } finally {
            setLoading(false)
        }
    }

    return (
        <DialogContent className="max-w-md">
            <DialogHeader>
                <DialogTitle>{editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Tên danh mục</Label>
                    <Input
                        id="name"
                        placeholder="Nhập tên danh mục"
                        defaultValue={editingCategory?.name}
                        ref={nameRef}
                        required
                    />
                </div>

                <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={onClose}>
                        Hủy
                    </Button>
                    <Button disabled={loading} type="submit">{loading ? "Đang lưu..." : (editingCategory ? "Cập nhật" : "Thêm")}</Button>
                </div>
            </form>
        </DialogContent>
    )
}

export default CategoryFormDialog

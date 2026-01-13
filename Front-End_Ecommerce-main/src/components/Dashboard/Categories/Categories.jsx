import React, { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { Button, Dialog, DialogTrigger } from "@components/ui"
import CategoryFormDialog from "./CategoryFormDialog"
import CategoryStats from "./CategoryStats"
import CategoryTable from "./CategoryTable"
import { getCategory, deleteCategory } from "@/services/CategoryServices"

const Categories = () => {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState(null)
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(null)

    const loadCategories = () => getCategory()
        .then((data) => {
            const list = Array.isArray(data?.data) ? data.data : data
            const mapped = (list || []).map((c) => ({
                id: c.id,
                name: c.name,
                description: c.description || "",
                productCount: c.productCount || 0,
                status: c.status || "active",
                icon: "Package",
                color: "bg-blue-100 text-blue-800",
            }))
            setCategories(mapped)
        })
        .catch((e) => setError(e?.message || "Không tải được danh mục"))

    useEffect(() => {
        loadCategories()
    }, [])

    const handleEdit = (category) => {
        setEditingCategory(category)
        setIsAddDialogOpen(true)
    }

    return (
        <div className="p-6 space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Quản lý danh mục</h1>
                    <p className="text-gray-600 mt-2">Quản lý các danh mục sản phẩm</p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" /> Thêm danh mục
                        </Button>
                    </DialogTrigger>
                    <CategoryFormDialog
                        editingCategory={editingCategory}
                        onClose={() => {
                            setIsAddDialogOpen(false)
                            setEditingCategory(null)
                        }}
                        onSaved={loadCategories}
                    />
                </Dialog>
            </div>

            {/* Stats */}
            {error && <div className="text-red-600">{error}</div>}
            <CategoryStats categories={categories} />

            {/* Table */}
            <CategoryTable
                categories={categories}
                onEdit={handleEdit}
                onDelete={async (category) => {
                    if (!confirm(`Xóa danh mục "${category.name}"?`)) return
                    try {
                        await deleteCategory(category.id)
                        const { toast } = await import("sonner")
                        toast.success("Đã xóa danh mục")
                    } catch (e) {
                        const { toast } = await import("sonner")
                        toast.error(e?.message || "Xóa danh mục thất bại")
                    }
                    loadCategories()
                }}
            />
        </div>
    )
}

export default Categories

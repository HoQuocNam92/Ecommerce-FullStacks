import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import { Label } from "@/components/ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";

const CategoryEditDialog = ({ isOpen, setIsOpen, category, onSubmit, categories = [] }) => {
    const [formData, setFormData] = useState({
        name: "",
        parent_id: null
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (category) {
            setFormData({
                name: category.name || "",
                parent_id: category.parent_id || null
            });
        }
    }, [category]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            alert("Vui lòng nhập tên danh mục!");
            return;
        }

        setLoading(true);
        try {
            await onSubmit(formData);
        } catch (error) {
            console.error("Error updating category:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    if (!category) return null;

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa danh mục</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Tên danh mục *</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Nhập tên danh mục..."
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="parent">Danh mục cha</Label>
                        <Select
                            value={formData.parent_id?.toString() || ""}
                            onValueChange={(value) => setFormData(prev => ({
                                ...prev,
                                parent_id: value ? parseInt(value) : null
                            }))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Chọn danh mục cha (tùy chọn)" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">Không có (danh mục gốc)</SelectItem>
                                {categories
                                    .filter(cat => !cat.parent_id && cat.id !== category.id) // Exclude current category and only show root categories
                                    .map((cat) => (
                                        <SelectItem key={cat.id} value={cat.id.toString()}>
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={loading}
                        >
                            Hủy
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Đang cập nhật..." : "Cập nhật"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CategoryEditDialog;


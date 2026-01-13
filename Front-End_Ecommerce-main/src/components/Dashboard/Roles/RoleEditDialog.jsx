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
import { Checkbox } from "@/components/ui";
import { ScrollArea } from "@/components/ui";

const RoleEditDialog = ({ isOpen, setIsOpen, role, onSubmit, permissions = [] }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        permissions: []
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (role) {
            setFormData({
                name: role.name || "",
                description: role.description || "",
                permissions: role.permissions || []
            });
        }
    }, [role]);

    const handlePermissionChange = (permissionId, checked) => {
        setFormData(prev => ({
            ...prev,
            permissions: checked
                ? [...prev.permissions, permissionId]
                : prev.permissions.filter(id => id !== permissionId)
        }));
    };

    const handleSelectAll = () => {
        setFormData(prev => ({
            ...prev,
            permissions: prev.permissions.length === permissions.length
                ? []
                : permissions.map(p => p.id)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            alert("Vui lòng nhập tên vai trò!");
            return;
        }

        setLoading(true);
        try {
            await onSubmit(formData);
        } catch (error) {
            console.error("Error updating role:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const isAllSelected = formData.permissions.length === permissions.length;
    const isIndeterminate = formData.permissions.length > 0 && formData.permissions.length < permissions.length;

    if (!role) return null;

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa vai trò: {role.name}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Tên vai trò *</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Nhập tên vai trò..."
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Mô tả</Label>
                        <Input
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Mô tả vai trò..."
                        />
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label>Phân quyền</Label>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleSelectAll}
                            >
                                {isAllSelected ? "Bỏ chọn tất cả" : "Chọn tất cả"}
                            </Button>
                        </div>

                        <ScrollArea className="h-64 border rounded-md p-4">
                            <div className="space-y-3">
                                {permissions.map((permission) => (
                                    <div key={permission.id} className="flex items-start space-x-3">
                                        <Checkbox
                                            id={`permission-${permission.id}`}
                                            checked={formData.permissions.includes(permission.id)}
                                            onCheckedChange={(checked) =>
                                                handlePermissionChange(permission.id, checked)
                                            }
                                        />
                                        <div className="flex-1">
                                            <Label
                                                htmlFor={`permission-${permission.id}`}
                                                className="text-sm font-medium cursor-pointer"
                                            >
                                                {permission.name}
                                            </Label>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {permission.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>

                        <div className="text-sm text-gray-500">
                            Đã chọn {formData.permissions.length} / {permissions.length} quyền
                        </div>
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

export default RoleEditDialog;


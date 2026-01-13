
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Button,
    Label,
    Input,
    Checkbox
} from '@/components/ui'

const RoleFormDialog = ({
    open,
    onOpenChange,
    editingRole,
    permissions = [],
    onSubmit
}) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [selectedPermissions, setSelectedPermissions] = useState([])

    useEffect(() => {
        if (editingRole) {
            setName(editingRole.name || '')
            setDescription(editingRole.description || '')
            setSelectedPermissions(
                editingRole.permissions?.map(p => p.id) || []
            )
        } else {
            setName('')
            setDescription('')
            setSelectedPermissions([])
        }
    }, [editingRole, open])

    const handlePermissionChange = (permissionId, checked) => {
        setSelectedPermissions(prev =>
            checked
                ? [...prev, permissionId]
                : prev.filter(id => id !== permissionId)
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        onSubmit({
            name,
            description,
            permissionIds: selectedPermissions
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button>Thêm vai trò</Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        {editingRole ? 'Chỉnh sửa vai trò' : 'Thêm vai trò mới'}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* TÊN */}
                    <div className="space-y-2">
                        <Label>Tên vai trò</Label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="VD: Admin, Staff..."
                            required
                        />
                    </div>

                    {/* MÔ TẢ */}
                    <div className="space-y-2">
                        <Label>Mô tả</Label>
                        <textarea
                            className="w-full border rounded-md p-2"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    {/* PERMISSIONS */}
                    <div className="space-y-2">
                        <Label>Quyền hạn</Label>
                        <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto border p-4 rounded-lg">
                            {permissions.map(permission => {
                                const Icon = permission.icon
                                const checked = selectedPermissions.includes(permission.id)

                                return (
                                    <div
                                        key={permission.id}
                                        className="flex items-start gap-3 p-3 border rounded-lg"
                                    >
                                        <Checkbox
                                            checked={checked}
                                            onCheckedChange={(value) =>
                                                handlePermissionChange(permission.id, value)
                                            }
                                        />
                                        <div>
                                            <div className="flex items-center gap-2">
                                                {Icon && <Icon className="w-4 h-4 text-gray-500" />}
                                                <span className="font-medium">
                                                    {permission.name}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                {permission.description}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* ACTION */}
                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Hủy
                        </Button>
                        <Button type="submit">
                            {editingRole ? 'Cập nhật' : 'Thêm'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default RoleFormDialog

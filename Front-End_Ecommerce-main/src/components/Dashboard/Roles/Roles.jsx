import React, { useState } from 'react'
import { Shield, Users } from 'lucide-react'
import StatsCard from './StatsCard'
import RoleFormDialog from './RoleFormDialog'
import RoleTable from './RoleTable'
import useRole from '@/hooks/useRole'
import { permissionIconMap } from '@/constants/permissionIcons'
import { Spinner } from '@/components/ui/spinner'
import { toast } from 'sonner'

const Roles = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingRole, setEditingRole] = useState(null)

    const {
        roles = [],
        loading,
        createRole,
        updateRole,
        deleteRole
    } = useRole();

    const handleEdit = (role) => {
        setEditingRole(role)
        setIsDialogOpen(true)
    }

    const handleSubmit = (data) => {
        if (editingRole) {
            updateRole({ id: editingRole.id, data })
        } else {
            createRole(data)
        }
        setIsDialogOpen(false)
        setEditingRole(null)
    }
    const handleDelete = (id) => {
        toast("Bạn có chắc chắn xóa không ?", {
            description: "Hành động không thể hoàn tác",
            action: {
                label: "Xóa",
                onClick: async () => await deleteRole(id)
            },
            cancel: {
                label: "Hủy"
            }
        })
    }
    const permissions = roles.flatMap(r => r.permissions || [])
        .reduce((acc, p) => {
            if (!acc.find(x => x.name === p.name)) {
                acc.push({
                    id: p.id,
                    name: p.name,
                    description: p.description,
                    icon: permissionIconMap[p.name]
                })
            }
            return acc
        }, [])
    if (loading) return <Spinner />
    return (
        <div className="p-6 space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatsCard
                    icon={Shield}
                    count={roles.length}
                    label="Tổng vai trò"
                    bgColor="bg-blue-100"
                    iconColor="text-blue-600"
                />
                <StatsCard
                    icon={Users}
                    count={roles.reduce((sum, r) => sum + (r.userCount || 0), 0)}
                    label="Người dùng (demo)"
                    bgColor="bg-purple-100"
                    iconColor="text-purple-600"
                />
                <StatsCard
                    icon={Shield}
                    count={permissions.length}
                    label="Quyền hạn"
                    bgColor="bg-orange-100"
                    iconColor="text-orange-600"
                />
            </div>

            <RoleFormDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                editingRole={editingRole}
                permissions={permissions}
                onSubmit={handleSubmit}
            />

            <RoleTable
                roles={roles}
                permissions={permissions}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    )
}

export default Roles

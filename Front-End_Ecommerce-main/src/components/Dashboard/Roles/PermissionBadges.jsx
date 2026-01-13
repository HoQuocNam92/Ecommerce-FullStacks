import React from 'react'
import { Badge } from '@/components/ui'

const PermissionBadges = ({ rolePermissions, permissions }) => {
    if (rolePermissions.includes('all')) {
        return <Badge variant="default">Tất cả quyền</Badge>
    }

    return (
        <div className="flex flex-wrap gap-1">
            {rolePermissions.map(permission => {
                const perm = permissions.find(p => p.id === permission.id)
                return perm ? (
                    <Badge key={permission} variant="secondary" className="text-xs">
                        {perm.name}
                    </Badge>
                ) : null
            })}
        </div>
    )
}

export default PermissionBadges

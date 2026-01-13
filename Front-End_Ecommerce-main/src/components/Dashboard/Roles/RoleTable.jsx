import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Button } from '@/components/ui'
import { Edit, Trash2, Shield } from 'lucide-react'
import PermissionBadges from './PermissionBadges'

const RoleTable = ({ roles, permissions, onEdit, onDelete }) => {
    return (
        <div className='bg-white shadow-md rounded-2xl'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Vai trò</TableHead>
                        <TableHead>Mô tả</TableHead>
                        <TableHead>Quyền hạn</TableHead>
                        <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {roles.map(role => (
                        <TableRow key={role.id} >
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${role.color}`}>
                                        <Shield className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{role.name}</p>
                                        <p className="text-sm text-gray-500">ID: {role.id}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <p className="text-sm text-gray-600 max-w-xs">{role.description}</p>
                            </TableCell>
                            <TableCell>
                                <div className="max-w-xs">
                                    <PermissionBadges rolePermissions={role.permissions} permissions={permissions} />
                                </div>
                            </TableCell>

                            <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <Button variant="ghost" size="icon" onClick={() => onEdit(role)}>
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button onClick={() => onDelete(role.id)} variant="ghost" size="icon">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default RoleTable

import React from 'react'

import dayjs from 'dayjs';

import { Edit, Eye, Lock, Trash2, UserCheck, UserX } from 'lucide-react';
import { Button } from '@/components/ui';
const ListEmployee = ({ getEmployee, handleDeleteEmployee, handleUpdateEmployee }) => {
    return (
        <div>
            <div className="   px-4 sm:px-6 lg:px-8 pb-8">
                {/* {isOpen && <FormEmployee setIsOpen={setIsOpen} updateEmployee={updateEmployee} employee={employee} />} */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">

                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nhân viên
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Thông tin liên hệ
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Ngày sinh
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Giới tính
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Vai trò
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Trạng thái
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Thời gian làm việc
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {getEmployee?.data?.map((employee) => (
                                    <tr key={employee.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 flex-shrink-0">
                                                    {employee.avatar ? (
                                                        <img className="h-10 w-10 rounded-full" src={employee.avatar} alt="" />
                                                    ) : (
                                                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                            <span className="text-sm font-medium text-gray-600">
                                                                {employee.name?.charAt(0) || 'U'}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                                                    <div className="text-sm text-gray-500">
                                                        Tham gia: {dayjs(employee.created_at).format('DD/MM/YYYY')}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{employee.email}</div>
                                            <div className="text-sm text-gray-500">{employee.phone}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {employee.birth && dayjs(employee.birth).format('DD/MM/YYYY')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {employee.gender}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {employee.roleName}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button

                                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${employee.status === "active"
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                    }`}
                                            >
                                                {employee.status === "active" ? (
                                                    <>
                                                        <UserCheck className="w-3 h-3 mr-1" />
                                                        Hoạt động
                                                    </>
                                                ) : (
                                                    <>
                                                        <Lock className="w-3 h-3 mr-1" />
                                                        Khóa
                                                    </>
                                                )}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {dayjs(employee.created_at).format('DD/MM/YYYY')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center space-x-2">

                                                <Button onClick={() => handleUpdateEmployee(employee)} >
                                                    <Edit className="w-4 h-4" />


                                                </Button>
                                                <Button onClick={() => handleDeleteEmployee(employee.id)} >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListEmployee
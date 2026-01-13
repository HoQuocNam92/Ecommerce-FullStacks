import React from 'react'

import dayjs from 'dayjs';
import ToUnitMoney from '@/utils/ToUnitMoney';
import { Edit, Eye, Lock, Trash2, UserCheck, UserX } from 'lucide-react';
import FormCustomer from './FormCustomer';
import { Button } from '@/components/ui';
const ListCustomer = ({ isOpen, setIsOpen, updateCustomer, customer, getCustomer, handleDeleteCustomer, handleUpdateCustomer }) => {
    return (
        <div>
            <div className="   px-4 sm:px-6 lg:px-8 pb-8">
                {isOpen && <FormCustomer setIsOpen={setIsOpen} updateCustomer={updateCustomer} data={customer} />}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">

                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Khách hàng
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Thông tin liên hệ
                                    </th>

                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Đơn hàng
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tổng chi tiêu
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Trạng thái
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {getCustomer?.data?.map((customer) => (
                                    <tr key={customer.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 flex-shrink-0">
                                                    {customer.avatar ? (
                                                        <img className="h-10 w-10 rounded-full" src={customer.avatar} alt="" />
                                                    ) : (
                                                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                            <span className="text-sm font-medium text-gray-600">
                                                                {customer.name?.charAt(0) || 'U'}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                                                    <div className="text-sm text-gray-500">
                                                        Tham gia: {dayjs(customer.created_at).format('DD/MM/YYYY')}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{customer.email}</div>
                                            <div className="text-sm text-gray-500">{customer.phone}</div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {customer.total_orders} đơn
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {ToUnitMoney(customer.total_spent)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button

                                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${customer.status === "active"
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                    }`}
                                            >
                                                {customer.status === "active" ? (
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
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center space-x-2">

                                                <Button onClick={() => handleUpdateCustomer(customer)} >
                                                    <Edit className="w-4 h-4" />


                                                </Button>
                                                <Button onClick={() => handleDeleteCustomer(customer.id)} >
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

export default ListCustomer
import { Button } from '@/components/ui';
import React, { useState } from 'react'

const FormCustomer = ({ updateCustomer, data, setIsOpen }) => {
    const [status, setStatus] = useState(data.is_active);
    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    }
    if (updateCustomer.isPending) {
        setIsOpen(false);
    }
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-100/70 backdrop-blur-sm">
            <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-lg">

                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Chỉnh sửa trạng thái khách hàng
                </h3>

                <div className="mb-4 space-y-1">
                    <p className="text-sm text-gray-600">
                        Khách hàng: <span className="font-medium text-gray-800">{data.name}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                        Email: <span className="font-medium text-gray-800">{data.email}</span>
                    </p>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Trạng thái
                    </label>
                    <select
                        value={status}
                        onChange={handleStatusChange}
                        className="
                            w-full rounded-lg border border-gray-300 px-3 py-2
                            focus:outline-none focus:ring-2 focus:ring-blue-400
                             bg-white cursor-pointer
                            "
                    >
                        <option className='cursor-pointer' value="active">Hoạt động</option>
                        <option className='cursor-pointer' value="lock">Khoá</option>
                    </select>
                </div>

                <div className="flex justify-end gap-3">
                    <Button
                        className="
                    px-4 py-2 rounded-lg
                   bg-gray-100 text-gray-700
                 hover:bg-gray-200 transition
                    "
                        onClick={() => setIsOpen(false)}
                    >
                        Huỷ
                    </Button>

                    <Button
                        onClick={() => updateCustomer.mutate({ id: data.id, status })}
                    >
                        {updateCustomer.isPending ? <div>Đang cập nhật...</div> :
                            'Cập nhật'}

                    </Button>
                </div>

            </div>
        </div>

    );

}

export default FormCustomer
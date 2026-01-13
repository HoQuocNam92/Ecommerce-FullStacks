import { Button } from '@/components/ui'
import { Download, Users } from 'lucide-react'
import React from 'react'

const HeaderEmployee = ({ handleCreateEmployee }) => {
    return (

        <div className=" px-4 sm:px-6 lg:px-8 py-6   ">
            <div className=" !bg-white shadow-sm rounded-lg p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Users className="w-8 h-8 text-blue-600" />
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Quản lý nhân viên</h1>
                            <p className="text-gray-600">Quản lý thông tin và phân khúc nhân viên</p>
                        </div>
                    </div>
                    <div>
                        <Button onClick={handleCreateEmployee}>Tạo nhân viên</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderEmployee
import { Settings } from 'lucide-react'
import React from 'react'
const handelDeleteAccount = () => {
}

const SettingsTab = () => {
    return (
        <main className="flex-1">
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <Settings className="w-6 h-6 text-red-700" />
                        <h2 className="text-xl font-semibold text-gray-900">Cài đặt</h2>
                    </div>
                </div>
                <div className="p-6">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between py-4 border-b border-gray-200">
                            <div>
                                <h3 className="font-medium text-gray-900">Thông báo email</h3>
                                <p className="text-sm text-gray-500">Nhận thông báo về đơn hàng và khuyến mãi</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-700"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between py-4 border-b border-gray-200">
                            <div>
                                <h3 className="font-medium text-gray-900">Thông báo SMS</h3>
                                <p className="text-sm text-gray-500">Nhận thông báo qua tin nhắn</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-700"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between py-4">
                            <div>
                                <h3 className="font-medium text-gray-900">Xóa tài khoản</h3>
                                <p className="text-sm text-gray-500">Xóa vĩnh viễn tài khoản và dữ liệu</p>
                            </div>
                            <button onClick={handelDeleteAccount} className="text-red-600 hover:text-red-700 font-medium">
                                Xóa tài khoản
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default SettingsTab
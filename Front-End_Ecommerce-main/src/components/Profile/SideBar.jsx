import React from "react";
import {
  User,
  MapPin,
  CreditCard,
  Package,
  RotateCcw,
  XCircle,
  Heart,
  Settings,
  LogOut,
  ChevronRight
} from "lucide-react";
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
const SideBar = ({ activeTab }) => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await logout();
    if (res === true) {
      navigate("/auth/signin");

    }
  };
  const menuItems = [
    {
      id: 'profile',
      label: 'Thông tin cá nhân',
      icon: User,
      active: true,
      link: '/account'
    },
    {
      id: 'address',
      label: 'Sổ địa chỉ',
      icon: MapPin,
      active: false,
      link: '/account/address'
    },
    {
      id: 'payment',
      label: 'Phương thức thanh toán',
      icon: CreditCard,
      active: false,
      link: '/account/payment'

    },

    {
      id: 'wishlist',
      label: 'Danh sách yêu thích',
      icon: Heart,
      active: false,
      link: '/account/wishlist'

    },
    {
      id: 'settings',
      label: 'Cài đặt',
      icon: Settings,
      active: false,
      link: '/account/settings'

    }
  ];

  return (
    <aside className="w-64 min-w-64 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        {/* User Info */}
        <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-gray-200">
          <div className="w-12 h-12 bg-red-700 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Tài khoản của tôi</h3>
            <p className="text-sm text-gray-500">Quản lý thông tin cá nhân</p>
          </div>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-left transition-colors ${activeTab === item.id
                  ? 'bg-red-50 text-red-600 border border-red-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
              >
                <Link className="flex justify-between items-center" to={item.link}>
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 ${activeTab === item.id ? 'text-red-700' : 'text-gray-400'
                      }`} />
                    <span className="font-medium">{item.label}</span>
                  </div>

                </Link>
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <Button onClick={handleLogout} className='w-full' >

            <LogOut className="w-5 h-5" />
            <span className="font-medium">Đăng xuất</span>

          </Button>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;

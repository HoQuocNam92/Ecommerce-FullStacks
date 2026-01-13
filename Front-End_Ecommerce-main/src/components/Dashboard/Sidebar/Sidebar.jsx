import React, { useState } from 'react'

import {
  LayoutDashboard,
  Package,
  Tags,
  Users,
  Settings,
  Shield,
  BarChart3,
  ShoppingCart,
  Image,
  Percent,
  TrendingUp,
  MessageSquare,
  ImagePlus,
  UserCog,
  TicketPercent,
  Megaphone,
  Gift
} from "lucide-react"
import { cn } from '@/components/ui'
import SidebarToggle from '@/components/Dashboard/Sidebar/SidebarToggle'
import SidebarLogo from '@/components/Dashboard/Sidebar/SidebarLogo'
import NestedSidebarNav from '@/components/Dashboard/Sidebar/NestedSidebarNav'
import SidebarProfile from '@/components/Dashboard/Sidebar/SidebarProfile'

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)


  const menuItems = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard/overview"
    },

    {
      id: "products",
      title: "Sản phẩm",
      icon: Package,
      submenu: [
        { title: "Danh sách sản phẩm", icon: Package, href: "/dashboard/products" },
        { title: "Quản lý ảnh", icon: Image, href: "/dashboard/products/images" },
        { title: "Sản phẩm bán chạy", icon: TrendingUp, href: "/dashboard/products/best-selling" }
      ]
    },

    {
      id: "categories",
      title: "Danh mục",
      icon: Tags,
      href: "/dashboard/categories"
    },

    {
      id: "orders",
      title: "Đơn hàng",
      icon: ShoppingCart,
      href: "/dashboard/orders"
    },

    {
      id: "customers",
      title: "Khách hàng",
      icon: Users,
      href: "/dashboard/customers"
    },

    {
      id: "employees",
      title: "Nhân viên",
      icon: UserCog,
      href: "/dashboard/employees"
    },

    {
      id: "revenue",
      title: "Doanh thu",
      icon: BarChart3,
      href: "/dashboard/revenue"
    },

    {
      id: "reviews",
      title: "Đánh giá",
      icon: MessageSquare,
      href: "/dashboard/reviews"
    },

    {
      id: "banners",
      title: "Banner",
      icon: ImagePlus,
      href: "/dashboard/banners"
    },

    {
      id: "roles",
      title: "Vai trò",
      icon: Shield,
      href: "/dashboard/roles"
    },
    {
      id: "sales",
      title: "Khuyến mãi",
      icon: Percent,
      href: "/dashboard/promotions",
      submenu: [
        { title: "Mã giảm giá", icon: TicketPercent, href: "/dashboard/discount-code" },
        { title: "Chương trình khuyến mãi", icon: Megaphone, href: "/dashboard/discount-promotions" },
        { title: "Tặng kèm", icon: Gift, href: "/dashboard/buy-get-promotions" }
      ]
    },

    {
      id: "settings",
      title: "Cài đặt",
      icon: Settings,
      href: "/dashboard/settings"
    }
  ]


  return (
    <div className={cn(
      "fixed h-screen bg-white border-r border-gray-200 transition-all duration-300",
      isCollapsed ? "w-24" : "w-64"
    )}>
      <SidebarToggle isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
      <SidebarLogo isCollapsed={isCollapsed} />
      <NestedSidebarNav menuItems={menuItems} isCollapsed={isCollapsed} />
      <SidebarProfile isCollapsed={isCollapsed} />
    </div>
  )
}

export default Sidebar

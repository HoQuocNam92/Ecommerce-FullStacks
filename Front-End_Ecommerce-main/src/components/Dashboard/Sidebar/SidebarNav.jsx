import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/components/ui'

const SidebarNav = ({ menuItems, isCollapsed }) => {
    const location = useLocation()

    return (
        <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href

                return (
                    <Link
                        key={item.href}
                        to={item.href}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                            isActive
                                ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        )}
                    >
                        <Icon className={cn("h-5 w-5", item.color)} />
                        {!isCollapsed && <span>{item.title}</span>}
                    </Link>
                )
            })}
        </nav>
    )
}

export default SidebarNav

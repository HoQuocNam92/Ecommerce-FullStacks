import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { cn } from '@/components/ui'
import { ChevronDown, ChevronRight } from 'lucide-react'

const NestedSidebarNav = ({ menuItems, isCollapsed }) => {
    const location = useLocation()
    const [expandedItems, setExpandedItems] = useState(new Set())
    const toggleExpanded = (itemId) => {
        setExpandedItems(prev => {
            const newSet = new Set(prev)
            if (newSet.has(itemId)) {
                newSet.delete(itemId)
            } else {
                newSet.add(itemId)
            }
            return newSet
        })
    }

    const isActive = (href) => {
        return location.pathname === href || location.pathname.startsWith(href + '/')
    }

    const renderMenuItem = (item) => {
        const Icon = item.icon
        const hasSubmenu = item.submenu && item.submenu.length > 0
        const isExpanded = expandedItems.has(item.id);
        const isItemActive = isActive(item.href);

        if (hasSubmenu) {
            return (
                <div key={item.id}>
                    <button
                        onClick={() => toggleExpanded(item.id)}
                        className={cn(
                            "w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                            isItemActive
                                ? "bg-blue-50 text-red-700"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <Icon className={cn("h-5 w-5", item.color)} />
                            {!isCollapsed && <span>{item.title}</span>}
                        </div>
                        {!isCollapsed && (
                            isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                        )}

                    </button>

                    {isExpanded && !isCollapsed && (
                        <div className="ml-6 mt-1 space-y-1">
                            {item.submenu.map((subItem) => {
                                const SubIcon = subItem.icon
                                const isSubActive = location.pathname === subItem.href

                                return (
                                    <NavLink
                                        key={subItem.href}
                                        to={subItem.href}
                                        className={cn(
                                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                            isSubActive
                                                ? "bg-blue-100 text-blue-700 border-l-2 border-blue-700"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        )}
                                    >
                                        <SubIcon className={cn("h-4 w-4", subItem.color)} />
                                        <span>{subItem.title}</span>
                                    </NavLink>
                                )
                            })}
                        </div>
                    )}
                </div>
            )
        }

        // Regular menu item
        return (
            <NavLink
                key={item.href}
                to={item.href}
                className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isItemActive
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
            >
                <Icon className={cn("h-5 w-5", item.color)} />
                {!isCollapsed && <span>{item.title}</span>}
            </NavLink>
        )
    }

    return (
        <nav className="p-4 space-y-2">
            {menuItems.map(renderMenuItem)}
        </nav>
    )
}

export default NestedSidebarNav



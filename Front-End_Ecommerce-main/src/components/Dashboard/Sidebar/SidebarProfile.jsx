import React from 'react'

const SidebarProfile = ({ isCollapsed }) => {
    if (isCollapsed) return null

    return (
        <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-white font-medium text-sm">A</span>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
                    <p className="text-xs text-gray-500 truncate">admin@example.com</p>
                </div>
            </div>
        </div>
    )
}

export default SidebarProfile

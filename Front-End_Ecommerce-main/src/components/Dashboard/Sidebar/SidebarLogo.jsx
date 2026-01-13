import React from 'react'
import { Link } from 'react-router-dom'

const SidebarLogo = ({ isCollapsed }) => {
    return (
        <div className="flex h-16 items-center justify-center border-b border-gray-200">
            {!isCollapsed ? (
                <h1 className="text-xl font-bold text-gray-800">
                    <Link to='/dashboard'>Admin Panel</Link>
                </h1>
            ) : (
                <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">A</span>
                </div>
            )}
        </div>
    )
}

export default SidebarLogo

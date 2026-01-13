

import React from 'react'
import SearchBar from '@/components/Dashboard/Header/SearchBar'
import NotificationsButton from '@/components/Dashboard/Header/NotificationsButton'
import UserMenu from '@/components/Dashboard/Header/UserMenu'

const Header = () => {
    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <NotificationsButton />
                    <UserMenu />
                </div>
            </div>
        </header>
    )
}

export default Header

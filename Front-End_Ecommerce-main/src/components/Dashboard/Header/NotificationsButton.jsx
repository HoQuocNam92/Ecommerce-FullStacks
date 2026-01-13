import React from 'react'
import { Bell } from 'lucide-react'
import { Button } from '@/components/ui'

const NotificationsButton = () => {
    return (
        <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-700 rounded-full"></span>
        </Button>
    )
}

export default NotificationsButton

import React from 'react'
import { Button } from '@/components/ui'
import { Menu, X } from 'lucide-react'

const SidebarToggle = ({ isCollapsed, onToggle }) => {
    return (
        <div className="absolute -right-3 top-6">
            <Button
                variant="outline"
                size="icon"
                className="h-6 w-6 rounded-full bg-white border border-gray-200 shadow-sm"
                onClick={onToggle}
            >
                {isCollapsed ? <Menu className="h-3 w-3" /> : <X className="h-3 w-3" />}
            </Button>
        </div>
    )
}

export default SidebarToggle

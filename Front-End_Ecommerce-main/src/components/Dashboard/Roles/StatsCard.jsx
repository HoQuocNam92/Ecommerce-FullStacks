import React from 'react'
import { Card, CardContent } from '@/components/ui'

const StatsCard = ({ icon: Icon, count, label, bgColor, iconColor }) => {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center gap-4">
                    <div className={`p-3 ${bgColor} rounded-lg`}>
                        <Icon className={`h-6 w-6 ${iconColor}`} />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-900">{count}</p>
                        <p className="text-sm text-gray-600">{label}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default StatsCard

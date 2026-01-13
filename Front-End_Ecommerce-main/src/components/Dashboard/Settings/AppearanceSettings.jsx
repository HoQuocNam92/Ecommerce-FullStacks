import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, Label, Button } from '@/components/ui'
import { Save } from 'lucide-react'

const AppearanceSettings = ({ onSave }) => {
    return (
        <Card>
            <CardHeader><CardTitle>Cài đặt giao diện</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Chủ đề</Label>
                        <div className="flex gap-2">
                            <Button variant="outline" className="flex-1">Sáng</Button>
                            <Button variant="outline" className="flex-1">Tối</Button>
                            <Button variant="outline" className="flex-1">Tự động</Button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Màu chủ đạo</Label>
                        <div className="flex gap-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-full cursor-pointer border-2 border-gray-300"></div>
                            <div className="w-8 h-8 bg-green-600 rounded-full cursor-pointer border-2 border-transparent"></div>
                            <div className="w-8 h-8 bg-purple-600 rounded-full cursor-pointer border-2 border-transparent"></div>
                            <div className="w-8 h-8 bg-red-600 rounded-full cursor-pointer border-2 border-transparent"></div>
                            <div className="w-8 h-8 bg-orange-600 rounded-full cursor-pointer border-2 border-transparent"></div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button onClick={onSave}><Save className="h-4 w-4 mr-2" />Lưu cài đặt</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default AppearanceSettings

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, Input, Label, Button } from '@/components/ui'
import { Save } from 'lucide-react'

const ShippingSettings = ({ settings, setSettings, onSave }) => {
    return (
        <Card>
            <CardHeader><CardTitle>Cài đặt vận chuyển</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="freeShippingThreshold">Ngưỡng miễn phí vận chuyển (VNĐ)</Label>
                        <Input id="freeShippingThreshold" type="number" value={settings.freeShippingThreshold} onChange={e => setSettings({ ...settings, freeShippingThreshold: parseInt(e.target.value) })} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="defaultShippingCost">Phí vận chuyển mặc định (VNĐ)</Label>
                        <Input id="defaultShippingCost" type="number" value={settings.defaultShippingCost} onChange={e => setSettings({ ...settings, defaultShippingCost: parseInt(e.target.value) })} />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="deliveryTime">Thời gian giao hàng dự kiến</Label>
                    <Input id="deliveryTime" value={settings.deliveryTime} onChange={e => setSettings({ ...settings, deliveryTime: e.target.value })} placeholder="2-3 ngày" />
                </div>
                <div className="flex justify-end">
                    <Button onClick={onSave}><Save className="h-4 w-4 mr-2" />Lưu cài đặt</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default ShippingSettings

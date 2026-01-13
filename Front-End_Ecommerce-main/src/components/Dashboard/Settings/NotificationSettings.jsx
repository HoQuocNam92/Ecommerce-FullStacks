import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, Switch, Label, Separator, Button } from '@/components/ui'
import { Save } from 'lucide-react'

const NotificationSettings = ({ settings, setSettings, onSave }) => {
    const toggle = (key) => (checked) => setSettings({ ...settings, [key]: checked })

    const items = [
        { key: 'emailNotifications', label: 'Thông báo qua email', desc: 'Gửi thông báo qua email' },
        { key: 'smsNotifications', label: 'Thông báo qua SMS', desc: 'Gửi thông báo qua tin nhắn SMS' },
        { key: 'orderUpdates', label: 'Cập nhật đơn hàng', desc: 'Thông báo khi có cập nhật đơn hàng' },
        { key: 'newCustomers', label: 'Khách hàng mới', desc: 'Thông báo khi có khách hàng mới đăng ký' },
        { key: 'lowStock', label: 'Hàng tồn kho thấp', desc: 'Thông báo khi sản phẩm sắp hết hàng' }
    ]

    return (
        <Card>
            <CardHeader><CardTitle>Cài đặt thông báo</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                {items.map((item, idx) => (
                    <React.Fragment key={item.key}>
                        {idx > 0 && <Separator />}
                        <div className="flex items-center justify-between">
                            <div>
                                <Label>{item.label}</Label>
                                <p className="text-sm text-gray-500">{item.desc}</p>
                            </div>
                            <Switch checked={settings[item.key]} onCheckedChange={toggle(item.key)} />
                        </div>
                    </React.Fragment>
                ))}
                <div className="flex justify-end mt-4">
                    <Button onClick={onSave}><Save className="h-4 w-4 mr-2" />Lưu cài đặt</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default NotificationSettings

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, Label, Switch, Input, Textarea, Separator, Button } from '@/components/ui'
import { Save } from 'lucide-react'

const SecuritySettings = ({ settings, setSettings, onSave }) => {
    return (
        <Card>
            <CardHeader><CardTitle>Cài đặt bảo mật</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <Label>Xác thực 2 yếu tố</Label>
                        <p className="text-sm text-gray-500">Yêu cầu xác thực 2 yếu tố cho tài khoản admin</p>
                    </div>
                    <Switch checked={settings.twoFactorAuth} onCheckedChange={checked => setSettings({ ...settings, twoFactorAuth: checked })} />
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="sessionTimeout">Thời gian phiên làm việc (phút)</Label>
                        <Input id="sessionTimeout" type="number" value={settings.sessionTimeout} onChange={e => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) })} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="loginAttempts">Số lần đăng nhập tối đa</Label>
                        <Input id="loginAttempts" type="number" value={settings.loginAttempts} onChange={e => setSettings({ ...settings, loginAttempts: parseInt(e.target.value) })} />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="ipWhitelist">Danh sách IP được phép (mỗi IP một dòng)</Label>
                    <Textarea id="ipWhitelist" rows={3} value={settings.ipWhitelist} onChange={e => setSettings({ ...settings, ipWhitelist: e.target.value })} />
                </div>
                <div className="flex justify-end">
                    <Button onClick={onSave}><Save className="h-4 w-4 mr-2" />Lưu cài đặt</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default SecuritySettings

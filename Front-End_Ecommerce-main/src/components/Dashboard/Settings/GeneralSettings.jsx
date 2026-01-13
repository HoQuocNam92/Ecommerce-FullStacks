import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, Input, Label, Textarea, Button } from '@/components/ui'
import { Save } from 'lucide-react'

const GeneralSettings = ({ settings, setSettings, onSave }) => {
    return (
        <Card>
            <CardHeader><CardTitle>Cài đặt chung</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="siteName">Tên website</Label>
                        <Input id="siteName" value={settings.siteName} onChange={e => setSettings({ ...settings, siteName: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="siteUrl">URL website</Label>
                        <Input id="siteUrl" value={settings.siteUrl} onChange={e => setSettings({ ...settings, siteUrl: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="adminEmail">Email quản trị</Label>
                        <Input id="adminEmail" type="email" value={settings.adminEmail} onChange={e => setSettings({ ...settings, adminEmail: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="timezone">Múi giờ</Label>
                        <Input id="timezone" value={settings.timezone} onChange={e => setSettings({ ...settings, timezone: e.target.value })} />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="siteDescription">Mô tả website</Label>
                    <Textarea id="siteDescription" value={settings.siteDescription} onChange={e => setSettings({ ...settings, siteDescription: e.target.value })} rows={3} />
                </div>
                <div className="flex justify-end">
                    <Button onClick={onSave}><Save className="h-4 w-4 mr-2" />Lưu cài đặt</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default GeneralSettings

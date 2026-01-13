import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, Switch, Input, Label, Separator, Button } from '@/components/ui'
import { Save } from 'lucide-react'

const PaymentSettings = ({ settings, setSettings, onSave }) => {
    const toggle = (key) => (checked) => setSettings({ ...settings, [key]: checked })

    return (
        <Card>
            <CardHeader><CardTitle>Cài đặt thanh toán</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <Label>Stripe</Label>
                            <p className="text-sm text-gray-500">Kích hoạt thanh toán qua Stripe</p>
                        </div>
                        <Switch checked={settings.stripeEnabled} onCheckedChange={toggle('stripeEnabled')} />
                    </div>
                    {settings.stripeEnabled && (
                        <div className="space-y-2">
                            <Label htmlFor="stripeKey">Stripe Public Key</Label>
                            <Input id="stripeKey" value={settings.stripeKey} onChange={e => setSettings({ ...settings, stripeKey: e.target.value })} placeholder="pk_test_..." />
                        </div>
                    )}
                    <Separator />
                    <div className="flex items-center justify-between">
                        <div>
                            <Label>PayPal</Label>
                            <p className="text-sm text-gray-500">Kích hoạt thanh toán qua PayPal</p>
                        </div>
                        <Switch checked={settings.paypalEnabled} onCheckedChange={toggle('paypalEnabled')} />
                    </div>
                    {settings.paypalEnabled && (
                        <div className="space-y-2">
                            <Label htmlFor="paypalClientId">PayPal Client ID</Label>
                            <Input id="paypalClientId" value={settings.paypalClientId} onChange={e => setSettings({ ...settings, paypalClientId: e.target.value })} placeholder="client_id_..." />
                        </div>
                    )}
                    <Separator />
                    <div className="flex items-center justify-between">
                        <div>
                            <Label>Thanh toán khi nhận hàng (COD)</Label>
                            <p className="text-sm text-gray-500">Cho phép khách hàng thanh toán khi nhận hàng</p>
                        </div>
                        <Switch checked={settings.codEnabled} onCheckedChange={toggle('codEnabled')} />
                    </div>
                </div>
                <div className="flex justify-end mt-4">
                    <Button onClick={onSave}><Save className="h-4 w-4 mr-2" />Lưu cài đặt</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default PaymentSettings

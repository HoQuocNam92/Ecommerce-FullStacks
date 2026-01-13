import React, { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui'
import { Globe, Bell, Shield, CreditCard, Truck, Palette } from 'lucide-react'

import GeneralSettings from './GeneralSettings'
import NotificationSettings from './NotificationSettings'
import SecuritySettings from './SecuritySettings'
import PaymentSettings from './PaymentSettings'
import ShippingSettings from './ShippingSettings'
import AppearanceSettings from './AppearanceSettings'

const SettingsPage = () => {
    const [generalSettings, setGeneralSettings] = useState({ /* ... */ })
    const [notificationSettings, setNotificationSettings] = useState({ /* ... */ })
    const [securitySettings, setSecuritySettings] = useState({ /* ... */ })
    const [paymentSettings, setPaymentSettings] = useState({ /* ... */ })
    const [shippingSettings, setShippingSettings] = useState({ /* ... */ })

    const handleSave = (section) => console.log(`Saving ${section} settings...`)

    return (
        <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="general"><Globe className="h-4 w-4" />Chung</TabsTrigger>
                <TabsTrigger value="notifications"><Bell className="h-4 w-4" />Thông báo</TabsTrigger>
                <TabsTrigger value="security"><Shield className="h-4 w-4" />Bảo mật</TabsTrigger>
                <TabsTrigger value="payment"><CreditCard className="h-4 w-4" />Thanh toán</TabsTrigger>
                <TabsTrigger value="shipping"><Truck className="h-4 w-4" />Vận chuyển</TabsTrigger>
                <TabsTrigger value="appearance"><Palette className="h-4 w-4" />Giao diện</TabsTrigger>
            </TabsList>

            <TabsContent value="general">
                <GeneralSettings settings={generalSettings} setSettings={setGeneralSettings} onSave={() => handleSave('general')} />
            </TabsContent>
            <TabsContent value="notifications">
                <NotificationSettings settings={notificationSettings} setSettings={setNotificationSettings} onSave={() => handleSave('notifications')} />
            </TabsContent>
            <TabsContent value="security">
                <SecuritySettings settings={securitySettings} setSettings={setSecuritySettings} onSave={() => handleSave('security')} />
            </TabsContent>
            <TabsContent value="payment">
                <PaymentSettings settings={paymentSettings} setSettings={setPaymentSettings} onSave={() => handleSave('payment')} />
            </TabsContent>
            <TabsContent value="shipping">
                <ShippingSettings settings={shippingSettings} setSettings={setShippingSettings} onSave={() => handleSave('shipping')} />
            </TabsContent>
            <TabsContent value="appearance">
                <AppearanceSettings onSave={() => handleSave('appearance')} />
            </TabsContent>
        </Tabs>
    )
}

export default SettingsPage

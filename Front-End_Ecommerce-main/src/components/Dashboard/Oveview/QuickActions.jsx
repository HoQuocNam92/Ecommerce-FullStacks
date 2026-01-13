import { Package, Users, ShoppingCart, BarChart3, TicketPercent, Percent } from "lucide-react"
import { Link } from "react-router-dom"

export default function QuickActions() {
    return (
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0' }}>Thao tác nhanh</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <button style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', backgroundColor: '#dbeafe', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
                    <Package style={{ width: '32px', height: '32px', color: '#2563eb', marginBottom: '8px' }} />
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#1e40af' }}>Thêm sản phẩm</span>
                </button>
                <button style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', backgroundColor: '#dcfce7', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
                    <Users style={{ width: '32px', height: '32px', color: '#16a34a', marginBottom: '8px' }} />
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#15803d' }}>Quản lý khách hàng</span>
                </button>
                <Link to="/dashboard/orders" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', backgroundColor: '#f3e8ff', borderRadius: '8px', textDecoration: 'none' }}>
                    <ShoppingCart style={{ width: '32px', height: '32px', color: '#9333ea', marginBottom: '8px' }} />
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#7c3aed' }}>Xem đơn hàng</span>
                </Link>
                <Link to="/dashboard/revenue" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', backgroundColor: '#fed7aa', borderRadius: '8px', textDecoration: 'none' }}>
                    <BarChart3 style={{ width: '32px', height: '32px', color: '#ea580c', marginBottom: '8px' }} />
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#c2410c' }}>Báo cáo chi tiết</span>
                </Link>
                <Link to="/dashboard/sale-management" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', backgroundColor: '#fee2e2', borderRadius: '8px', textDecoration: 'none' }}>
                    <TicketPercent style={{ width: '32px', height: '32px', color: '#ef4444', marginBottom: '8px' }} />
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#b91c1c' }}>Quản lý sản phẩm sale</span>
                </Link>
                <Link to="/dashboard/best-selling" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', backgroundColor: '#e0e7ff', borderRadius: '8px', textDecoration: 'none' }}>
                    <Percent style={{ width: '32px', height: '32px', color: '#4f46e5', marginBottom: '8px' }} />
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#4338ca' }}>Sản phẩm bán chạy</span>
                </Link>
            </div>
        </div>
    )
}

# Dashboard Admin Panel

Dashboard admin panel được xây dựng bằng React, shadcn/ui và Tailwind CSS.

## Tính năng

### 1. Dashboard chính
- Thống kê tổng quan (khách hàng, sản phẩm, đơn hàng, doanh thu)
- Biểu đồ doanh thu
- Đơn hàng gần đây
- Thao tác nhanh

### 2. Quản lý sản phẩm
- Danh sách sản phẩm
- Thêm/sửa/xóa sản phẩm
- Tìm kiếm và lọc sản phẩm
- Quản lý trạng thái và tồn kho

### 3. Quản lý danh mục
- Danh sách danh mục sản phẩm
- Thêm/sửa/xóa danh mục
- Thống kê số lượng sản phẩm theo danh mục

### 4. Quản lý nhãn hiệu
- Danh sách nhãn hiệu
- Thêm/sửa/xóa nhãn hiệu
- Thông tin quốc gia và website
- Thống kê sản phẩm theo nhãn hiệu

### 5. Quản lý khách hàng
- Danh sách khách hàng
- Thông tin chi tiết khách hàng
- Phân loại khách hàng theo cấp độ
- Thống kê đơn hàng và doanh thu

### 6. Cài đặt hệ thống
- Cài đặt chung (tên website, URL, email, múi giờ)
- Cài đặt thông báo (email, SMS, các loại thông báo)
- Cài đặt bảo mật (2FA, session timeout, IP whitelist)
- Cài đặt thanh toán (Stripe, PayPal, COD)
- Cài đặt vận chuyển (phí vận chuyển, thời gian giao hàng)
- Cài đặt giao diện (chủ đề, màu sắc)

### 7. Quản lý vai trò
- Danh sách vai trò người dùng
- Phân quyền chi tiết cho từng vai trò
- Thêm/sửa/xóa vai trò
- Quản lý quyền truy cập

## Cấu trúc thư mục

```
src/
├── components/
│   ├── ui/                    # shadcn/ui components
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   ├── table.jsx
│   │   ├── dialog.jsx
│   │   ├── input.jsx
│   │   ├── select.jsx
│   │   ├── tabs.jsx
│   │   ├── badge.jsx
│   │   ├── avatar.jsx
│   │   ├── dropdown-menu.jsx
│   │   ├── switch.jsx
│   │   ├── checkbox.jsx
│   │   ├── textarea.jsx
│   │   ├── separator.jsx
│   │   ├── scroll-area.jsx
│   │   ├── progress.jsx
│   │   ├── popover.jsx
│   │   ├── navigation-menu.jsx
│   │   ├── toast.jsx
│   │   ├── tooltip.jsx
│   │   ├── sheet.jsx
│   │   ├── utils.js
│   │   ├── ui.css
│   │   └── index.js
│   └── Dashboard/             # Dashboard components
│       ├── DashboardLayout.jsx
│       ├── Sidebar.jsx
│       ├── Header.jsx
│       ├── Dashboard.jsx
│       ├── Products.jsx
│       ├── Categories.jsx
│       ├── Brands.jsx
│       ├── Customers.jsx
│       ├── Settings.jsx
│       ├── Roles.jsx
│       └── index.js
```

## Cài đặt và sử dụng

### 1. Cài đặt dependencies
```bash
npm install @radix-ui/react-avatar @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-icons @radix-ui/react-input @radix-ui/react-label @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-sheet @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-tooltip class-variance-authority clsx tailwind-merge
```

### 2. Truy cập dashboard
- URL: `/dashboard`
- Yêu cầu đăng nhập (RequireAuth)

### 3. Navigation
- Sidebar có thể thu gọn để tiết kiệm không gian
- Menu navigation với các icon trực quan
- Breadcrumb navigation

## Tính năng kỹ thuật

### 1. Responsive Design
- Mobile-first approach
- Sidebar thu gọn trên mobile
- Grid layout responsive

### 2. State Management
- React hooks (useState, useEffect)
- Local state cho forms và dialogs
- Props drilling được tối thiểu hóa

### 3. UI Components
- shadcn/ui components với Tailwind CSS
- Consistent design system
- Accessible components (ARIA labels, keyboard navigation)

### 4. Performance
- Lazy loading cho routes
- Optimized re-renders
- Efficient filtering và searching

## Tùy chỉnh

### 1. Theme
- CSS variables trong `ui.css`
- Dark mode support
- Custom color schemes

### 2. Layout
- Sidebar width có thể điều chỉnh
- Header height và content
- Spacing và typography

### 3. Components
- Tất cả UI components có thể tùy chỉnh
- Props cho variants và sizes
- CSS classes có thể override

## Troubleshooting

### 1. CSS không load
- Kiểm tra import `ui.css` trong `index.css`
- Đảm bảo Tailwind CSS đã được cài đặt

### 2. Components không render
- Kiểm tra import paths
- Đảm bảo tất cả dependencies đã được cài đặt

### 3. Routing issues
- Kiểm tra router configuration
- Đảm bảo RequireAuth component hoạt động đúng

## Tương lai

### 1. Tính năng mới
- Real-time notifications
- Advanced charts và analytics
- Bulk operations
- Export/import data

### 2. Cải tiến
- TypeScript support
- Unit tests
- E2E tests
- Performance monitoring

### 3. Integration
- API endpoints
- Database integration
- Authentication system
- File upload system


## Data flow & APIs (Docs)

### Overview data (Trang Dashboard)
- Hook: `src/hooks/useDashboard.js`
- Gọi API:
  - `GET /products` → `GetProduct()` để lấy danh sách sản phẩm
  - `GET /categories` → `getCategory()` để lấy danh sách danh mục
  - `GET /brands` → `GetBrand()` để lấy danh sách nhãn hiệu
  - `GET /orders` → `GetOrders()` để lấy danh sách đơn hàng
- Tính toán client-side:
  - "Tổng khách hàng": đếm `unique user_id` trong danh sách orders
  - "Tổng sản phẩm": độ dài danh sách products
  - "Đơn hàng hôm nay": lọc orders có `created_at` cùng ngày hiện tại
  - "Doanh thu tháng": cộng `total_amount` của orders trong tháng hiện tại
  - "Biểu đồ doanh thu 6 tháng": gom theo tháng từ danh sách orders
  - "Đơn hàng gần đây": lấy 5 đơn mới nhất đã sắp xếp theo `created_at`
  - "Top sản phẩm": tạm thời xếp theo `rating` và `stock` (vì chưa có order items join)
- UI nhận dữ liệu:
  - `components/Dashboard/Dashboard.jsx` sử dụng `useDashboard()` và truyền props cho `StatsCards`, `RevenueChart`, `RecentOrders`, `TopProducts`.

### Orders
- Service: `src/services/OrderServices.js`
  - `GetOrders()` → `GET /orders`
  - `GetOrder(id)` → `GET /orders/:id`
  - `CreateOrder(data)` → `POST /orders`
- Backend mapping:
  - Route: `backend/src/modules/order/order/order.route.js`
  - Controller: `backend/src/modules/order/order/order.controllers.js`
  - Lưu ý: Model hiện có các cột `user_id, total_amount, status, shipping_address, note`. Nếu muốn có `created_at`, đảm bảo DB có cột này và Service trả về.

### Products / Categories / Brands
- Services:
  - `GetProduct()` → `GET /products`
  - `getCategory()` → `GET /categories`
  - `GetBrand()` → `GET /brands`
- Backend mapping: các module tương ứng trong `backend/src/modules/product/*`

### Auth & Axios
- Axios instance: `src/utils/axiosInstance.js`
  - Base URL: `http://localhost:8080/api`
  - Tự động đính kèm `Authorization: Bearer <token>` lấy từ `useAuthStore`
  - Tự refresh token khi 401 bằng `POST /auth/refresh-token`

### Gợi ý mở rộng
- Thêm endpoint backend trả về thống kê thay vì tính client:
  - `GET /analytics/overview` trả về counts, revenue tháng, today orders
  - `GET /analytics/revenue?from=yyyy-mm&to=yyyy-mm`
  - `GET /analytics/top-products?limit=10`
- Thêm `created_at` cho `orders` và join `order_items` để tính top products theo doanh thu/thực bán.

### Customers & Notifications (định tuyến sẵn)
- Customers:
  - Có thể dựng từ `GET /users` (chưa có service, thêm sau nếu backend có route)
  - Thống kê: tổng khách hàng, khách mới tuần/tháng, doanh thu theo khách
- Notifications:
  - Backend module: `backend/src/modules/notification/*`
  - Dự kiến service: `GET /notifications` để hiển thị ở `Header/NotificationsButton.jsx`




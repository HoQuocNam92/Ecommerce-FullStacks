 # 🛒 Ecommerce Fullstack

Ecommerce Fullstack là một hệ thống thương mại điện tử hoàn chỉnh được xây dựng theo mô hình Fullstack:

- **Backend**: Node.js / Express  
- **Frontend**: React 
- **Database**: SQL Server  
- **Cache**: Redis  
- **Hạ tầng**: Docker & Docker Compose  

Mục tiêu của project là mô phỏng một hệ thống Ecommerce thực tế, có thể chạy toàn bộ bằng Docker, phục vụ cho học tập, thực hành và làm portfolio.

---

## 📁 Cấu trúc thư mục

```text
.
├── Back-End_Ecommerce-main/   # Backend (API, Auth, Product, Order, Coupon, User...)
├── Front-End_Ecommerce-main/  # Frontend (Next.js / React)
├── db/                        # Script DB, Stored Procedure, Seed Data
└── docker-compose.yml         # Chạy toàn bộ hệ thống


⚙️ Công nghệ sử dụng
Backend

Node.js

Express

JWT Authentication

SQL Server

Redis (Cache)

RESTful API

Frontend

React / Next.js

TanStack Query / Axios

UI cho User & Admin

DevOps

Docker

Docker Compose

🚀 Hướng dẫn chạy project
1. Clone repository
git clone https://github.com/HoQuocNam92/Ecommerce-FullStacks.git
cd Ecommerce-FullStacks

2. Tạo file .env cho Backend

Trong thư mục Back-End_Ecommerce-main, tạo file .env:

PORT=8080

# SQL Server
DB_HOST=mssql
DB_USER=sa
DB_PASSWORD=your_password
DB_NAME=Ecommerce
DB_PORT=1433

# JWT
ACCESS_TOKEN=your_access_token
REFRESH_TOKEN=your_refresh_token


⚠️ File .env không được push lên GitHub.

3. Chạy toàn bộ hệ thống bằng Docker
docker-compose up --build


Sau khi chạy thành công:

Service	URL
Frontend	http://localhost:3000

Backend	http://localhost:4000

SQL Server	localhost:1433
✨ Tính năng chính

Đăng ký / Đăng nhập (JWT)

Quản lý người dùng

CRUD sản phẩm

Giỏ hàng

Đặt hàng

Áp dụng mã giảm giá

Quản lý đơn hàng (Admin)

Cache dữ liệu bằng Redis

Chạy toàn bộ hệ thống với Docker

🎯 Mục tiêu dự án

Project này được xây dựng nhằm:

Luyện tập Fullstack thực tế (FE – BE – DB)

Hiểu quy trình xây dựng hệ thống Ecommerce

Thực hành Docker & triển khai hệ thống

Làm project portfolio cá nhân

Chuẩn bị nền tảng cho các hệ thống lớn hơn (Microservice, CI/CD, Cloud)

📌 Hướng phát triển

Thanh toán online (VNPAY / Momo / Stripe)

Phân quyền nâng cao (Role, Permission)

Realtime với Socket.IO

Microservice Architecture

CI/CD & Deploy Production

👤 Tác giả

Nam Hồ Quốc
Fullstack Developer

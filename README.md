📌 Mô tả dự án

Website thương mại điện tử chuyên về thời trang, tập trung vào tối ưu trải nghiệm người dùng, cung cấp đầy đủ tính năng mua sắm Online, hệ thống quản trị mạnh mẽ và tích hợp Chatbox AI hỗ trợ tư vấn sản phẩm theo hình ảnh – giá – mô tả.

🛠 Công nghệ sử dụng
Frontend

ReactJS

Redux Toolkit

TailwindCSS

Backend

Laravel

MySQL

Laravel Sanctum (xác thực API)

✨ Chức năng chính
👤 1. Giao diện người dùng (User)

Giao diện Responsive, tối ưu UX/UI bằng TailwindCSS

Tìm kiếm & lọc sản phẩm theo: danh mục, giá, kích cỡ, màu sắc

Đăng ký, đăng nhập, phân quyền User/Admin

Xem chi tiết sản phẩm: mô tả, hình ảnh, đánh giá

Giỏ hàng: thêm/xóa/cập nhật số lượng

Áp dụng mã giảm giá

Thanh toán online qua VNPAY

Theo dõi trạng thái đơn hàng (xử lý → giao hàng → hoàn tất)

Đánh giá & bình luận sản phẩm

🤖 2. Chatbox AI

Tích hợp Chatbox AI sử dụng Dialogflow

Tự động phản hồi thông tin sản phẩm: hình ảnh, giá, mô tả

Kết nối qua server trung gian (Glitch) để xử lý dữ liệu

🛒 3. Quản trị hệ thống (Admin)

Dashboard thống kê doanh thu, sản phẩm bán chạy, tình trạng kho

CRUD sản phẩm + kích cỡ + màu sắc

Quản lý đơn hàng: duyệt – vận chuyển – hoàn tất – hủy

Quản lý bình luận & trả lời khách hàng

Quản lý chương trình khuyến mãi & mã giảm giá theo danh mục

📡 4. API Backend (Laravel)

Xây dựng API chuẩn RESTful

Phân tách module rõ ràng:
Auth / Product / Cart / Order / Promotion / Review

Sử dụng Laravel Sanctum để xác thực

Middleware xử lý phân quyền

Xử lý ngoại lệ & validate dữ liệu đầy đủ

🚀 Hướng dẫn chạy dự án
Frontend
cd frontend
npm install
npm start

Backend
cd backend
composer install

cp .env.example .env
php artisan key:generate

php artisan migrate --seed
php artisan serve

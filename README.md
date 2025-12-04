Mô tả dự án
- Website thương mại điện tử chuyên về thời trang, tập trung vào tối ưu trải nghiệm người dùng, cung cấp tính năng mua sắm đầy đủ, hệ thống quản trị mạnh mẽ và tích hợp Chatbox AI hỗ trợ tư vấn sản phẩm theo hình ảnh – giá – mô tả.

Công nghệ sử dụng
Frontend
- ReactJS
- Redux Toolkit (quản lý trạng thái)
- TailwindCSS
Backend
- Laravel
- MySQL
- Laravel Sanctum (xác thực API)
Chức năng
Giao diện người dùng (User)
- Giao diện Responsive, tối ưu UX/UI bằng TailwindCSS
- Tìm kiếm, lọc và phân loại sản phẩm theo: danh mục, giá, màu sắc, kích cỡ
- Đăng ký, đăng nhập, phân quyền theo vai trò (User/Admin)
- Trang chi tiết sản phẩm: xem đánh giá, hình ảnh, mô tả đầy đủ
- Giỏ hàng: thêm/xóa, cập nhật số lượng, áp dụng mã giảm giá
- Thanh toán online qua VNPAY
- Đặt hàng và theo dõi trạng thái đơn hàng (đang xử lý → đang giao → hoàn tất)
 -Đánh giá & bình luận sản phẩm
Chatbox AI
- Tích hợp Chatbox AI sử dụng Dialogflow
- Tự động phản hồi thông tin sản phẩm: hình ảnh, giá, mô tả
- Kết nối qua server trung gian (Glitch) để xử lý dữ liệu
Quản trị hệ thống (Admin)
Dashboard thống kê: doanh thu, sản phẩm bán chạy, tình trạng kho hàng
- Quản lý sản phẩm: CRUD sản phẩm, kích cỡ, màu sắc
- Quản lý đơn hàng: duyệt – vận chuyển – hoàn tất – hủy
- Quản lý bình luận và trả lời khách hàng
- Quản lý chương trình khuyến mãi, mã giảm giá theo danh mục
API Backend (Laravel)
Xây dựng API chuẩn RESTful
Phân tách rõ ràng các module: Auth, Product, Cart, Order, Promotion, Review

Chạy dự án
1. Frontend
cd frontend
npm install
npm start
2. Backend
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve



Kiểm tra token, phân quyền truy cập bằng Laravel Sanctum

Xử lý ngoại lệ, middleware lọc request

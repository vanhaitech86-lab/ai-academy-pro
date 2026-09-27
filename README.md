# 🚀 AI Academy Pro - Nền Tảng Học Tập & Kinh Doanh AI

> **Dự án**: Nền tảng học tập trực tuyến, bán khóa học, bán tài sản số AI (Mega Prompt pack, Custom GPTs/Gems, n8n/Make workflows) và bộ công cụ AI chuyên nghiệp.  
> **Phong cách**: Hiện đại, 3D Neural Core tương tác, Cyber-luxe Dark Mode (#0B0F1A), Glassmorphism sang trọng, tối ưu 100% cho thiết bị di động.  
> **Cốt lõi**: Thanh toán tự động 24/7 qua cổng SePay (VietQR + Webhook), Chatbot AI hỗ trợ tự động, CI/CD tự động deploy lên Vercel từ GitHub.

---

## 🛠️ 1. Công Nghệ Sử Dụng (Tech Stack)
* **Frontend**: Next.js 15+ (App Router), React 19, TypeScript
* **Styling**: Tailwind CSS, Vanilla CSS Glassmorphism, Neon Glow Tokens
* **Hiệu ứng 3D**: Three.js Interactive Particle Sphere & Neural Core
* **Icons & Animation**: Lucide React, Canvas Confetti Fireworks
* **Cơ sở dữ liệu**: Prisma ORM (Tương thích Supabase PostgreSQL / Neon)
* **Cổng thanh toán**: SePay VietQR (Tự động xác nhận giao dịch qua Webhook thời gian thực)
* **Chatbot AI**: API Route `/api/chat` nạp kiến thức RAG tra cứu khóa học & đơn hàng

---

## 📂 2. Cấu Trúc Thư Mục Dự Án
```text
ai-academy/
├── app/
│   ├── page.tsx                           # Trang chủ hoàn chỉnh (13 phần)
│   ├── layout.tsx                         # Header, Footer, Chatbot, CartProvider
│   ├── globals.css                        # Design System, Glassmorphism, Neon tokens
│   ├── khoa-hoc/
│   │   ├── page.tsx                       # Danh sách khóa học (Bộ lọc, sắp xếp)
│   │   └── [slug]/page.tsx                # Chi tiết khóa học (Video demo, Tab giáo trình)
│   ├── skill-ai/
│   │   ├── page.tsx                       # Kho Skill AI (Prompt, GPTs, Workflow)
│   │   └── [slug]/page.tsx                # Chi tiết Skill & tải về
│   ├── cong-cu-ai/
│   │   ├── page.tsx                       # Công cụ AI chuyên nghiệp
│   │   └── [slug]/page.tsx                # Chi tiết công cụ & dùng thử
│   ├── bang-gia/page.tsx                  # Bảng giá gói thành viên
│   ├── gio-hang/page.tsx                  # Giỏ hàng & Voucher giảm giá
│   ├── thanh-toan/
│   │   ├── page.tsx                       # Thanh toán SePay VietQR (Đếm ngược 15p, auto-detect)
│   │   └── thanh-cong/page.tsx            # Xác nhận thành công với pháo giấy Confetti
│   ├── hoc-vien/
│   │   ├── page.tsx                       # Bảng điều khiển học viên (% tiến độ, chứng chỉ)
│   │   └── khoa-hoc/[slug]/bai/[id]/page.tsx # Lớp học video & syllabus sidebar
│   ├── admin/page.tsx                     # Trang quản trị (Doanh thu, đơn hàng, SePay log)
│   └── api/
│       ├── sepay/webhook/route.ts         # Webhook nhận dữ liệu chuyển khoản SePay
│       ├── orders/route.ts                # API kiểm tra trạng thái đơn hàng
│       └── chat/route.ts                  # API Chatbot AI tư vấn
├── components/
│   ├── three/HeroScene.tsx                # 3D Neural Particle Core tương tác theo chuột
│   ├── layout/
│   │   ├── Header.tsx                     # Thanh điều hướng kính mờ, Giỏ hàng, Mobile Drawer
│   │   └── Footer.tsx                     # Chân trang 4 cột uy tín
│   ├── chatbot/ChatWidget.tsx             # Trợ lý AI góc màn hình với gợi ý nhanh
│   └── home/                              # 11 thành phần cấu tạo trang chủ
├── lib/
│   ├── types.ts                           # Định nghĩa TypeScript Models
│   ├── data.ts                            # Mock data khóa học, skill, công cụ, FAQ
│   ├── sepay.ts                           # Tiện ích sinh mã VietQR và định dạng tiền tệ VND
│   └── cart-context.tsx                   # Quản lý giỏ hàng toàn cục (Context API)
├── prisma/schema.prisma                   # Database Schema PostgreSQL đầy đủ
├── .env.example                           # Biến môi trường mẫu
└── README.md                              # Hướng dẫn chi tiết
```

---

## ⚡ 3. Chạy Thử Nghiệm Tại Máy (Local Dev)
1. Cài đặt các gói phụ thuộc (nếu chưa cài):
   ```bash
   npm install
   ```
2. Khởi chạy máy chủ phát triển:
   ```bash
   npm run dev
   ```
3. Mở trình duyệt tại [http://localhost:3000](http://localhost:3000) để trải nghiệm.

---

## 💳 4. Cơ Chế Thanh Toán Tự Động SePay VietQR
1. Khi khách hàng nhấn **Tiến hành thanh toán**, hệ thống tự sinh mã đơn duy nhất (ví dụ: `AIA-9824`).
2. Màn hình thanh toán xuất mã **VietQR** chuẩn ngân hàng chứa:
   - Số tài khoản: `999988889999`
   - Ngân hàng: `MBBank`
   - Số tiền chính xác
   - Nội dung chuyển khoản: Mã đơn hàng (ví dụ: `AIA-9824`)
3. Khách hàng quét mã qua ứng dụng ngân hàng.
4. SePay phát hiện biến động số dư và gửi Webhook dạng JSON đến `/api/sepay/webhook`.
5. API xác thực mã bí mật (`SEPAY_API_KEY`), trích xuất mã đơn và tự động chuyển trạng thái đơn sang `paid`.
6. Trình duyệt khách hàng tự động chuyển hướng sang trang **Thanh toán thành công** với pháo giấy chúc mừng và mở khóa khóa học trong bảng điều khiển học viên.

---

## 🐙 5. Hướng Dẫn Đẩy Mã Nguồn Lên GitHub
1. Mở PowerShell hoặc Git Bash tại thư mục dự án:
   ```bash
   git init
   git add .
   git commit -m "feat: Khoi tao du an AI Academy Pro voi Next.js, 3D Hero va SePay"
   git branch -M main
   ```
2. Tạo một Repository mới trên [GitHub.com](https://github.com/new) (ví dụ đặt tên: `ai-academy-pro`).
3. Liên kết và đẩy code lên:
   ```bash
   git remote add origin https://github.com/<ten-tai-khoan-cua-ban>/ai-academy-pro.git
   git push -u origin main
   ```

---

## ☁️ 6. Xuất Bản Lên Vercel (Hosting Tự Động)
1. Truy cập [vercel.com](https://vercel.com) và đăng nhập bằng GitHub.
2. Bấm **Add New** → **Project** → Chọn repository `ai-academy-pro`.
3. Trong phần **Environment Variables**, khai báo các biến từ file `.env.example`:
   - `SEPAY_API_KEY`: Mã API Token lấy trong phần Cấu hình Webhook của SePay.
   - `SEPAY_BANK_ACCOUNT`: Số tài khoản ngân hàng của bạn.
   - `SEPAY_BANK_NAME`: Tên ngân hàng (ví dụ: `MBBank`).
   - `DATABASE_URL`: Đường dẫn kết nối PostgreSQL (Supabase / Neon).
   - `OPENAI_API_KEY` hoặc `GOOGLE_GENERATIVE_AI_API_KEY`: Khóa API AI cho Chatbot.
4. Bấm **Deploy**. Vercel sẽ tự động build và cấp domain miễn phí dạng `ai-academy-pro.vercel.app`.
5. Vào bảng điều khiển SePay ([my.sepay.vn](https://my.sepay.vn)) → Thêm cấu hình Webhook:
   - **URL Webhook**: `https://<ten-mien-cua-ban>.vercel.app/api/sepay/webhook`
   - **Phương thức**: `POST`

---

## 📋 7. Danh Sách Kiểm Tra Trước Khi Ra Mắt (Checklist)
- [x] Giao diện 3D mượt mà, điểm Lighthouse tối ưu, tương thích 100% Mobile & Desktop.
- [x] Quy trình mua hàng & giỏ hàng hoạt động mượt mà với mã giảm giá (voucher `AIACADEMY`).
- [x] Luồng thanh toán VietQR SePay tự động với đồng hồ đếm ngược 15 phút.
- [x] Nút mô phỏng xác nhận chuyển khoản cho demo / kiểm thử tức thì.
- [x] Trang cảm ơn thanh toán thành công với hiệu ứng pháo giấy confetti.
- [x] Lớp học video trực quan với mục lục bài giảng và ghi chú học viên.
- [x] Chatbot AI nổi bật góc màn hình hỗ trợ tra cứu khóa học 24/7 và chuyển tiếp Zalo.
- [x] Trang quản trị Admin với thống kê doanh thu và nhật ký webhook SePay.

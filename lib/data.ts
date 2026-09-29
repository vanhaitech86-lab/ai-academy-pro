import { Product, Testimonial, FAQItem } from './types';

export const COURSES: Product[] = [
  {
    id: 'course-1',
    type: 'course',
    title: 'Làm Chủ AI & ChatGPT Toàn Diện: Từ Zero Đến Hero',
    slug: 'lam-chu-ai-chatgpt-toan-dien',
    shortDesc: 'Xây dựng tư duy tương tác AI chuẩn quốc tế, làm chủ ChatGPT, Claude & Gemini để nhân 10 năng suất công việc hàng ngày.',
    description: 'Khóa học được thiết kế bài bản từ nền tảng đến thực chiến dành cho người đi làm, quản lý và chủ doanh nghiệp. Bạn sẽ hiểu sâu cách AI hoạt động, kỹ thuật Prompt Engineering nâng cao, xử lý tài liệu lớn, phân tích dữ liệu và tự động hóa tác vụ văn phòng.',
    price: 1372000,
    salePrice: 686000,
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    badge: 'Bán chạy',
    category: 'Người mới bắt đầu',
    rating: 4.9,
    reviewCount: 428,
    level: 'Người mới bắt đầu',
    duration: '18 giờ · 42 bài học',
    studentsCount: 2840,
    instructor: {
      name: 'Team Phượng Hoàng Lửa',
      avatar: '/images/team-phuong-hoang-lua.jpg',
      title: 'AI -AGENT Học Viện Công Nghệ Trí Tuệ Nhân Tạo Phượng Hoàng Lửa',
      bio: 'Đội ngũ chuyên gia và AI Agent thực chiến hàng đầu tại Học Viện Công Nghệ Trí Tuệ Nhân Tạo Phượng Hoàng Lửa, cố vấn và chuyển đổi số cho hàng trăm doanh nghiệp.'
    },
    features: [
      'Nắm vững 10 khung Prompt Engineering đỉnh cao',
      'Phân tích báo cáo tài chính & dữ liệu Excel trong 30 giây',
      'Ứng dụng AI vào nghiên cứu thị trường và lập kế hoạch kinh doanh',
      'Tặng kho Prompt bí mật trị giá 2.500.000đ',
      'Truy cập trọn đời và cập nhật bài học định kỳ'
    ],
    lessons: [
      {
        id: 'l1',
        productId: 'course-1',
        chapter: 'Chương 1: Khởi động tư duy AI thế hệ mới',
        title: '1.1 Tổng quan kỷ nguyên GenAI và lý do bạn cần bắt đầu ngay',
        duration: '15:20',
        isPreview: true,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      },
      {
        id: 'l2',
        productId: 'course-1',
        chapter: 'Chương 1: Khởi động tư duy AI thế hệ mới',
        title: '1.2 So sánh sức mạnh: ChatGPT-4o vs Claude 3.5 Sonnet vs Gemini Pro',
        duration: '22:45',
        isPreview: true,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      },
      {
        id: 'l3',
        productId: 'course-1',
        chapter: 'Chương 2: Nghệ thuật Prompt Engineering',
        title: '2.1 Cấu trúc 5 thành phần của một Prompt hoàn hảo',
        duration: '28:10',
        isPreview: false
      },
      {
        id: 'l4',
        productId: 'course-1',
        chapter: 'Chương 2: Nghệ thuật Prompt Engineering',
        title: '2.2 Kỹ thuật Few-Shot & Chain-of-Thought suy luận logic',
        duration: '34:00',
        isPreview: false
      },
      {
        id: 'l5',
        productId: 'course-1',
        chapter: 'Chương 3: Thực chiến xử lý văn bản & tài liệu',
        title: '3.1 Tóm tắt sách và trích xuất ý chính từ PDF 500 trang',
        duration: '26:15',
        isPreview: false
      }
    ]
  },
  {
    id: 'course-2',
    type: 'course',
    title: 'Nghệ Thuật Tạo Ảnh AI Chuyên Nghiệp: Midjourney v6 & Flux',
    slug: 'tao-anh-ai-chuyen-nghiep-midjourney-flux',
    shortDesc: 'Biến ý tưởng thành tác phẩm nhiếp ảnh, banner thương mại và concept art đẳng cấp điện ảnh chỉ bằng câu lệnh.',
    description: 'Khóa học chuyên sâu từ cơ bản đến cao cấp về sáng tạo hình ảnh bằng trí tuệ nhân tạo. Bạn sẽ thành thạo cách điều khiển ánh sáng, góc máy, chất liệu và phong cách thẩm mỹ để phục vụ quảng cáo, kiến trúc và thời trang.',
    price: 1372000,
    salePrice: 686000,
    thumbnail: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
    badge: 'Hot',
    category: 'Tạo ảnh AI',
    rating: 5.0,
    reviewCount: 312,
    level: 'Mọi cấp độ',
    duration: '14 giờ · 35 bài học',
    studentsCount: 1950,
    instructor: {
      name: 'Nguyễn Anh Tuấn (Tuấn Art)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      title: 'Visual Creator & Giám đốc Nghệ thuật AI',
      bio: 'Chuyên gia thiết kế mỹ thuật với hơn 10 năm kinh nghiệm, cố vấn visual cho các nhãn hàng F&B và thời trang hàng đầu.'
    },
    features: [
      'Kiểm soát 100% ánh sáng, góc camera & lens điện ảnh',
      'Tạo nhân vật đồng nhất (Character Consistency) qua nhiều bối cảnh',
      'Kỹ thuật Inpainting & Outpainting nâng cao',
      'Đóng gói Preset & bán ảnh trên nền tảng Stock quốc tế'
    ]
  },
  {
    id: 'course-3',
    type: 'course',
    title: 'Xây Dựng Custom GPTs & Gemini Gems Triệu Lượt Dùng',
    slug: 'xay-dung-custom-gpts-gemini-gems',
    shortDesc: 'Tự tạo trợ lý ảo AI thông minh không cần biết code, đóng gói kiến thức chuyên ngành và kiếm tiền từ GPT Store.',
    description: 'Khóa học hướng dẫn bạn từ A-Z cách tạo ra những con bot chuyên gia được huấn luyện bằng dữ liệu độc quyền của bạn, tích hợp Actions API để tra cứu dữ liệu thời gian thực và tự động hóa quy trình nghiệp vụ.',
    price: 1372000,
    salePrice: 686000,
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    badge: 'Mới',
    category: 'GPTs/Gems',
    rating: 4.8,
    reviewCount: 185,
    level: 'Trung cấp',
    duration: '12 giờ · 28 bài học',
    studentsCount: 1240,
    instructor: {
      name: 'Lê Minh Quân',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      title: 'AI Product Lead & Builder',
      bio: 'Nhà sáng lập 3 ứng dụng AI nổi bật trên Product Hunt với hơn 100.000 người dùng hàng tháng.'
    },
    features: [
      'Thiết kế Prompt System chuyên sâu chống Jailbreak bot',
      'Upload & cấu hình Knowledge Base không bị lẫn kiến thức',
      'Tích hợp Webhook & Custom Actions kết nối CRM/Google Sheets',
      'Chiến lược SEO & Marketing cho GPTs lên top bảng xếp hạng'
    ]
  },
  {
    id: 'course-4',
    type: 'course',
    title: 'Tự Động Hóa Doanh Nghiệp Với Make.com & n8n AI Agents',
    slug: 'tu-dong-hoa-doanh-nghiep-make-n8n',
    shortDesc: 'Xây dựng đế chế tự động vận hành: chatbot CSKH thông minh, tự động chốt đơn và đăng bài đa kênh 24/7.',
    description: 'Chuyển đổi quy trình thủ công tốn hàng giờ mỗi ngày thành các luồng tự động không lỗi lầm. Sử dụng Make.com kết hợp AI Agent để xử lý tin nhắn khách hàng, gửi email cá nhân hóa và đồng bộ cơ sở dữ liệu hoàn toàn tự động.',
    price: 1372000,
    salePrice: 686000,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    badge: 'Bán chạy',
    category: 'Tự động hóa',
    rating: 4.9,
    reviewCount: 260,
    level: 'Trung cấp',
    duration: '22 giờ · 50 bài học',
    studentsCount: 1680,
    instructor: {
      name: 'Team Phượng Hoàng Lửa',
      avatar: '/images/team-phuong-hoang-lua.jpg',
      title: 'AI -AGENT Học Viện Công Nghệ Trí Tuệ Nhân Tạo Phượng Hoàng Lửa',
      bio: 'Đội ngũ chuyên gia tư vấn chuyển đổi số tự động hóa cho các tập đoàn bán lẻ, thương mại điện tử và giáo dục.'
    },
    features: [
      'Làm chủ n8n tự host bảo mật thông tin nội bộ',
      'Tích hợp Zalo OA, Telegram, Facebook Messenger vào n8n',
      'Hệ thống AI Agent tự phân loại lead và gửi hợp đồng',
      'Tặng bộ 30 kịch bản kĩ thuật Make Blueprint nhập là chạy ngay'
    ]
  },
  {
    id: 'course-5',
    type: 'course',
    title: 'AI Marketing & Chiến Lược Nội Dung Đa Kênh Viral',
    slug: 'ai-marketing-noi-dung-da-kenh',
    shortDesc: 'Sản xuất 100 video ngắn TikTok/Reels và bài viết bán hàng mỗi tuần chỉ với 1 người vận hành nhờ AI.',
    description: 'Khóa học tiết lộ bí quyết các agency hàng đầu dùng AI để viết kịch bản viral, tạo giọng đọc tự nhiên, cắt dựng clip tự động và chạy quảng cáo tối ưu ngân sách.',
    price: 1372000,
    salePrice: 686000,
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
    badge: 'Hot',
    category: 'Marketing',
    rating: 4.8,
    reviewCount: 198,
    level: 'Mọi cấp độ',
    duration: '15 giờ · 32 bài học',
    studentsCount: 2150,
    instructor: {
      name: 'Đặng Mai Phương',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      title: 'Head of Growth & Viral Content Creator',
      bio: 'Sở hữu kênh TikTok hơn 500k followers về ứng dụng công nghệ và xây dựng thương hiệu cá nhân.'
    },
    features: [
      'Quy trình biến 1 ý tưởng thành 10 định dạng nội dung khác nhau',
      'Sử dụng ElevenLabs & HeyGen tạo video nói như người thật',
      'Kịch bản livestream chốt đơn ứng dụng tâm lý học hành vi',
      'Tối ưu SEO website và Social Media với AI'
    ]
  },
  {
    id: 'course-6',
    type: 'course',
    title: 'Lập Trình Web & Ứng Dụng Với AI: Cursor & Claude 3.7',
    slug: 'lap-trinh-web-ai-cursor-claude',
    shortDesc: 'Tăng tốc độ viết code gấp 5 lần với AI IDE hiện đại, xây dựng Fullstack Web App hoàn chỉnh từ ý tưởng.',
    description: 'Học cách làm việc cùng trợ lý code AI hàng đầu thế giới (Cursor, Windsurf, Claude Code). Dành cho cả lập trình viên muốn tăng tốc và người mới muốn xây dựng sản phẩm công nghệ của riêng mình.',
    price: 1372000,
    salePrice: 686000,
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    badge: 'Mới',
    category: 'Chuyên sâu',
    rating: 5.0,
    reviewCount: 142,
    level: 'Chuyên sâu',
    duration: '20 giờ · 45 bài học',
    studentsCount: 920,
    instructor: {
      name: 'Trần Quang Huy',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
      title: 'Principal Software Engineer',
      bio: '12 năm phát triển hệ thống web quy mô lớn, tác giả nhiều open-source AI tooling phổ biến.'
    },
    features: [
      'Thành thạo Cursor Composer, Rules for AI, System Prompt',
      'Xây dựng Web App Next.js 15, Tailwind, Supabase với tốc độ chớp mắt',
      'Debug lỗi logic phức tạp cùng Claude 3.7 Sonnet',
      'Deploy tự động lên Vercel và CI/CD GitHub Actions'
    ]
  }
];

export const SKILLS: Product[] = [
  // SẢNH I: Skill Hình Ảnh Thương Hiệu Cá Nhân
  {
    id: 'skill-thuong-hieu-ca-nhan',
    type: 'skill',
    title: 'Thương hiệu cá nhân & Text Overlay',
    slug: 'thuong-hieu-ca-nhan',
    shortDesc: 'Chèn chữ tiêu đề + badge thương hiệu lên ảnh để đăng bài, và dựng dây chuyền ảnh đồng nhất',
    description: 'Chèn chữ tiêu đề, font chữ phong cách thương hiệu cao cấp cùng huy hiệu (badge) định vị uy tín trực tiếp lên ảnh. Quy trình đồng bộ giúp bạn tạo hàng loạt ấn phẩm truyền thông cá nhân nhất quán, chuẩn nhận diện chỉ bằng vài thao tác dán câu lệnh.',
    price: 136000,
    salePrice: 68000,
    thumbnail: '/images/kol-ai.jpg',
    badge: 'GPL-3.0',
    license: 'GPL-3.0',
    stars: '122k★',
    hall: 'Sảnh I · Skill Hình Ảnh Thương Hiệu Cá Nhân',
    category: 'Hình ảnh thương hiệu',
    rating: 4.9,
    reviewCount: 320,
    deliveryFormat: 'Câu lệnh AI chuẩn ChatGPT/Gemini + Hướng dẫn gỡ lỗi tiếng Việt',
    features: [
      'Bộ câu lệnh căn chỉnh vị trí chữ và huy hiệu tỷ lệ vàng',
      'Định dạng typography hiện đại, sang trọng cho KOL/KOC',
      'Tự động đồng bộ màu sắc nhận diện thương hiệu cá nhân',
      'Kèm mẫu hướng dẫn chi tiết 4 bước và quyền tham gia nhóm Zalo'
    ]
  },
  {
    id: 'skill-poster-san-pham',
    type: 'skill',
    title: 'Poster sản phẩm',
    slug: 'poster-san-pham',
    shortDesc: 'Một ảnh sản phẩm ra nguyên bộ 10 poster quảng cáo đồng bộ, không cần cài gì',
    description: 'Chỉ cần một bức ảnh chụp sản phẩm đơn giản, AI sẽ tự động tách nền, phối cảnh ánh sáng studio thương mại và sản xuất ra trọn bộ 10 poster quảng cáo đa phong cách, sẵn sàng chạy ads hoặc đăng bán trên sàn TMĐT.',
    price: 136000,
    salePrice: 68000,
    thumbnail: '/images/kol-ai.jpg',
    badge: 'Dán vào AI',
    license: 'Dán vào AI',
    stars: '95k★',
    hall: 'Sảnh I · Skill Hình Ảnh Thương Hiệu Cá Nhân',
    category: 'Hình ảnh thương hiệu',
    rating: 5.0,
    reviewCount: 285,
    deliveryFormat: 'Prompt dán trực tiếp vào ChatGPT / Gemini kèm template ảnh',
    features: [
      '1 ảnh sản phẩm gốc ra 10 bối cảnh visual cao cấp',
      'Tự động canh góc máy và ánh sáng theo chuẩn tạp chí quốc tế',
      'Tối ưu tỷ lệ chuyển đổi cho banner Shopee, TikTok Shop, Facebook Ads',
      'Không cần biết Photoshop, thao tác mượt mà ngay trên điện thoại'
    ]
  },
  {
    id: 'skill-xoa-nen-anh',
    type: 'skill',
    title: 'Xóa nền ảnh',
    slug: 'xoa-nen-anh',
    shortDesc: 'Xoá phông trong vài giây, ra ảnh nền trong suốt để ghép vào đâu cũng được',
    description: 'Bóc tách chủ thể chuẩn xác đến từng sợi tóc tơ và chi tiết phức tạp. Xuất file PNG trong suốt độ phân giải cao trong tích tắc, không viền răng cưa, dễ dàng lồng ghép vào bất cứ nền thiết kế nào.',
    price: 136000,
    salePrice: 68000,
    thumbnail: '/images/kol-ai.jpg',
    badge: 'MIT',
    license: 'MIT',
    stars: '24k★',
    hall: 'Sảnh I · Skill Hình Ảnh Thương Hiệu Cá Nhân',
    category: 'Hình ảnh thương hiệu',
    rating: 4.8,
    reviewCount: 190,
    deliveryFormat: 'Mã nguồn mở đóng gói + Prompt thông minh',
    features: [
      'Xóa phông tự động bằng thuật toán AI sâu, giữ trọn sợi tóc và trang phục',
      'Xuất định dạng trong suốt độ phân giải cực cao',
      'Xử lý mượt mà trên cả ảnh chụp thiếu sáng hoặc hậu cảnh rối',
      'Tốc độ xử lý chỉ từ 2-5 giây mỗi ảnh'
    ]
  },
  {
    id: 'skill-xoa-logo-anh',
    type: 'skill',
    title: 'Xóa logo, vật thể',
    slug: 'xoa-logo-anh',
    shortDesc: 'Xoá logo chìm, chữ thừa, người lạ khỏi ảnh mà không để lại vết',
    description: 'Làm sạch hoàn toàn watermark, chữ đóng dấu bản quyền, vật thể thừa hoặc người qua đường ngẫu nhiên mà không để lại vết nhòe hay biến dạng chi tiết xung quanh. AI tự động nội suy bề mặt liền mạch như ảnh gốc.',
    price: 136000,
    salePrice: 68000,
    thumbnail: '/images/kol-ai.jpg',
    badge: 'Apache-2.0',
    license: 'Apache-2.0',
    stars: '23k★',
    hall: 'Sảnh I · Skill Hình Ảnh Thương Hiệu Cá Nhân',
    category: 'Hình ảnh thương hiệu',
    rating: 4.9,
    reviewCount: 215,
    deliveryFormat: 'Workflow AI Inpainting + Hướng dẫn tiếng Việt',
    features: [
      'Xóa sạch chữ chìm và logo đè lên chi tiết phức tạp',
      'Khôi phục nền texture tự nhiên không tì vết',
      'Hoạt động tốt với ảnh thời trang, ảnh ngoại cảnh và sản phẩm',
      'Dễ dàng sử dụng chỉ với 1 câu lệnh dán vào AI'
    ]
  },
  {
    id: 'skill-chinh-sua-anh',
    type: 'skill',
    title: 'Chỉnh sửa ảnh',
    slug: 'chinh-sua-anh',
    shortDesc: 'Nét, đẹp mặt mà vẫn đúng người thật, cân màu, mịn da — sáu bước một lượt',
    description: 'Quy trình hậu kỳ chân dung toàn diện: làm mịn da tự nhiên giữ nguyên lỗ chân lông, cân chỉnh tone màu cinematic, mắt sáng, răng trắng mà không làm méo mó hoặc mất đi nét đặc trưng của người thật.',
    price: 136000,
    salePrice: 68000,
    thumbnail: '/images/kol-ai.jpg',
    badge: 'BSD-3',
    license: 'BSD-3',
    stars: '86k★',
    hall: 'Sảnh I · Skill Hình Ảnh Thương Hiệu Cá Nhân',
    category: 'Hình ảnh thương hiệu',
    rating: 4.9,
    reviewCount: 410,
    deliveryFormat: 'Preset prompt 6 bước tối ưu sẵn cho ảnh chân dung',
    features: [
      'Giữ trọn diện mạo thật 100%, không bị biến thành tượng sáp',
      'Tự động cân màu da hồng hào, sang trọng chuẩn beauty shot',
      'Xử lý nhanh gọn 6 bước làm đẹp chỉ trong 1 thao tác duy nhất',
      'Thích hợp làm avatar profile, lookbook cá nhân và ảnh bìa mạng xã hội'
    ]
  },
  {
    id: 'skill-tang-chat-luong-4k',
    type: 'skill',
    title: 'Tăng chất lượng 4k',
    slug: 'tang-chat-luong-4k',
    shortDesc: 'Ảnh nhỏ mờ thành ảnh lớn sắc nét chỉ bằng vài cú bấm chuột, in poster khổ lớn được',
    description: 'Phục hồi và nâng cấp độ phân giải hình ảnh từ mờ nhòe, vỡ hạt lên chuẩn 4K siêu nét. Tái tạo chi tiết sắc sảo phục vụ in ấn ấn phẩm khổ lớn hoặc đăng tải ảnh chất lượng cao không bị mạng xã hội nén mờ.',
    price: 136000,
    salePrice: 68000,
    thumbnail: '/images/kol-ai.jpg',
    badge: 'AGPL-3.0',
    license: 'AGPL-3.0',
    stars: '48k★',
    hall: 'Sảnh I · Skill Hình Ảnh Thương Hiệu Cá Nhân',
    category: 'Hình ảnh thương hiệu',
    rating: 5.0,
    reviewCount: 360,
    deliveryFormat: 'Bộ công cụ Upscale AI mã nguồn mở + Lệnh nạp trực tiếp',
    features: [
      'Nâng cấp kích thước ảnh lên gấp 4 đến 8 lần không vỡ hình',
      'Tái hiện chi tiết sợi vải, đồng tử mắt và vân bề mặt chân thực',
      'Đủ tiêu chuẩn in ấn banner, backdrop hội thảo sự kiện lớn',
      'Hỗ trợ xử lý hàng loạt trên máy tính hoặc điện thoại'
    ]
  },
  {
    id: 'skill-multishot',
    type: 'skill',
    title: 'Multishot',
    slug: 'multishot',
    shortDesc: 'Một ảnh ra nhiều góc quay nhất quán, dùng làm keyframe video hoặc storyboard',
    description: 'Từ một bức ảnh duy nhất của nhân vật hoặc sản phẩm, AI tạo ra toàn bộ các góc máy điện ảnh: cận cảnh (close-up), toàn cảnh (wide shot), góc nhìn nghiêng 45 độ, chụp từ trên cao. Cực kỳ hữu ích để làm storyboard hoặc keyframe dựng video.',
    price: 136000,
    salePrice: 68000,
    thumbnail: '/images/kol-ai.jpg',
    badge: 'Dán vào AI',
    license: 'Dán vào AI',
    stars: '72k★',
    hall: 'Sảnh I · Skill Hình Ảnh Thương Hiệu Cá Nhân',
    category: 'Hình ảnh thương hiệu',
    rating: 4.8,
    reviewCount: 175,
    deliveryFormat: 'Prompt chuyên sâu đa góc máy + Mẫu prompt template',
    features: [
      'Tạo 6-8 góc máy khác nhau giữ nguyên trang phục và khuôn mặt',
      'Hoàn hảo để làm phân cảnh kịch bản dựng phim và TVC bán hàng',
      'Tiết kiệm 90% thời gian lên concept visual',
      'Tương thích mạnh mẽ với Midjourney, Flux và Gemini'
    ]
  },
  {
    id: 'skill-hoan-doi-nhan-vat',
    type: 'skill',
    title: 'Hoán đổi nhân vật',
    slug: 'hoan-doi-nhan-vat',
    shortDesc: 'Một nhân vật thương hiệu cố định, đặt vào bối cảnh nào cũng vẫn là một người',
    description: 'Giữ trọn vẹn gương mặt KOL AI độc quyền của bạn qua mọi bối cảnh, trang phục, góc nghiêng và thời gian. Bí quyết cốt lõi để xây dựng đại sứ thương hiệu ảo (Virtual Influencer) thu hút hàng triệu lượt theo dõi.',
    price: 136000,
    salePrice: 68000,
    thumbnail: '/images/kol-ai.jpg',
    badge: 'Dán vào AI',
    license: 'Dán vào AI',
    stars: '110k★',
    hall: 'Sảnh I · Skill Hình Ảnh Thương Hiệu Cá Nhân',
    category: 'Hình ảnh thương hiệu',
    rating: 5.0,
    reviewCount: 450,
    deliveryFormat: 'Bộ quy chuẩn giữ Character Consistency + Prompt hoán đổi thông minh',
    features: [
      'Cố định 100% tỷ lệ khuôn mặt và phong thái của KOL AI',
      'Dễ dàng đưa nhân vật đi khắp địa điểm du lịch, sự kiện, studio',
      'Định hình tài sản số có giá trị lâu dài cho thương hiệu cá nhân',
      'Bao gồm file mẫu và video phân tích lỗi thường gặp'
    ]
  },

  // SẢNH II: Skill Edit Video Bán Hàng
  {
    id: 'skill-dang-1-thoai-thumbnail',
    type: 'skill',
    title: 'Edit video nói chuyện tự động',
    slug: 'dang-1-thoai-thumbnail',
    shortDesc: 'Cắt gọn tự nhiên, mở đầu bằng thumbnail AI tự viết, phụ đề động chạy theo lời nói',
    description: 'Chỉ cần đưa video quay mộc vào, AI tự động nhận diện giọng nói, cắt bỏ toàn bộ khoảng lặng (silence remover), thêm phụ đề nhảy chữ động phong cách hot trend và tự thiết kế ảnh thumbnail giật tít thu hút người xem.',
    price: 136000,
    salePrice: 68000,
    thumbnail: '/images/kol-ai.jpg',
    badge: 'Riêng',
    license: 'Riêng',
    stars: '68k★',
    hall: 'Sảnh II · Skill Edit Video Bán Hàng',
    category: 'Edit video bán hàng',
    rating: 4.9,
    reviewCount: 310,
    deliveryFormat: 'Workflow tự động hóa cắt video + Auto Captions tiếng Việt',
    features: [
      'Tự động lọc bỏ từ ngữ thừa (ừm, à) và khoảng nghỉ chết',
      'Phụ đề tiếng Việt đồng bộ chính xác từng mili-giây',
      'Tự động sinh tiêu đề thumbnail gây tò mò cao',
      'Xuất chuẩn tỷ lệ 9:16 tối ưu cho TikTok, Facebook Reels, Shorts'
    ]
  },
  {
    id: 'skill-dang-2-hieu-ung-cao-cap',
    type: 'skill',
    title: 'Video nói chuyện hiệu ứng cao cấp',
    slug: 'dang-2-hieu-ung-cao-cap',
    shortDesc: 'Zoom theo cảm xúc, overlay hoạt hoạ, âm thanh, crop bám mặt, so sánh trước/sau',
    description: 'Biến một đoạn video độc thoại nhàm chán thành tác phẩm cuốn hút với chuyển động máy quay zoom-in/zoom-out theo nhịp cảm xúc, hiệu ứng âm thanh sound effects (SFX) đắt giá, bám sát khuôn mặt và bảng so sánh trước/sau bắt mắt.',
    price: 136000,
    salePrice: 68000,
    thumbnail: '/images/kol-ai.jpg',
    badge: 'Riêng',
    license: 'Riêng',
    stars: '84k★',
    hall: 'Sảnh II · Skill Edit Video Bán Hàng',
    category: 'Edit video bán hàng',
    rating: 5.0,
    reviewCount: 290,
    deliveryFormat: 'Preset hiệu ứng dựng phim AI + Thư viện âm thanh SFX tuyển chọn',
    features: [
      'Thuật toán auto-crop tự động theo dõi chuyển động khuôn mặt',
      'Hiệu ứng visual zoom nhấn nhá những câu từ đắt giá',
      'Bộ sưu tập hơn 200 âm thanh hiệu ứng thịnh hành nhất hiện nay',
      'Tạo cảm giác như được dựng bởi ekip video editor chuyên nghiệp'
    ]
  },
  {
    id: 'skill-dang-3-huong-dan-toi-gian',
    type: 'skill',
    title: 'Video hướng dẫn tối giản cho coach',
    slug: 'dang-3-huong-dan-toi-gian',
    shortDesc: 'Tiêu đề trắng lớn, các bước hiện dần theo nội dung, nhạc dẫn dắt cảm xúc — sạch, sang',
    description: 'Phong cách tối giản đặc trưng dành cho các chuyên gia đào tạo, diễn giả, coach và cố vấn kinh doanh. Tiêu đề trắng nổi bật trên nền mờ, từng bước hiển thị tuần tự theo lời nói, kết hợp nhạc nền du dương tôn vinh giá trị kiến thức.',
    price: 136000,
    salePrice: 68000,
    thumbnail: '/images/kol-ai.jpg',
    badge: 'Riêng',
    license: 'Riêng',
    stars: '52k★',
    hall: 'Sảnh II · Skill Edit Video Bán Hàng',
    category: 'Edit video bán hàng',
    rating: 4.8,
    reviewCount: 160,
    deliveryFormat: 'Template dựng phim phong cách Minimalist + Sound pack riêng',
    features: [
      'Giao diện text typography sạch sẽ, đẳng cấp học thuật',
      'Hiệu ứng trượt step-by-step đồng bộ giọng đọc tự nhiên',
      'Tạo dựng hình tượng chuyên gia tri thức và uy tín',
      'Định dạng xuất bản tối ưu cho LinkedIn và YouTube Shorts'
    ]
  },
  {
    id: 'skill-dang-4-infographic-trang',
    type: 'skill',
    title: 'Video talking-head kiểu infographic',
    slug: 'dang-4-infographic-trang',
    shortDesc: 'Xen kẽ lớp phủ infographic trắng do AI tự thiết kế, phong cách chuyên nghiệp kiểu HeyGen',
    description: 'Tự động tạo ra các bảng số liệu, biểu đồ minh họa và thẻ tóm tắt màu trắng sang trọng lơ lửng bên cạnh người nói. Phong cách chuyên nghiệp thường thấy trong các video giới thiệu sản phẩm công nghệ cao và B2B.',
    price: 136000,
    salePrice: 68000,
    thumbnail: '/images/kol-ai.jpg',
    badge: 'Riêng',
    license: 'Riêng',
    stars: '91k★',
    hall: 'Sảnh II · Skill Edit Video Bán Hàng',
    category: 'Edit video bán hàng',
    rating: 4.9,
    reviewCount: 220,
    deliveryFormat: 'Bộ quy chuẩn tạo Infographic Overlay động cho video',
    features: [
      'AI tự phân tích văn bản để vẽ biểu đồ minh họa tương ứng',
      'Layout chia màn hình hiện đại người nói - bảng tóm tắt',
      'Nâng tầm giá trị bài thuyết trình và video pitching gọi vốn',
      'Dễ dùng, không cần phần mềm After Effects phức tạp'
    ]
  },
  {
    id: 'skill-cap-do-1-khung-don',
    type: 'skill',
    title: 'Cắt video dài thành nhiều short',
    slug: 'cap-do-1-khung-don',
    shortDesc: 'AI tự tìm đoạn hay nhất trong video dài, cắt thành nhiều short 9:16 bám sát mặt người nói',
    description: 'Chỉ cần dán link hoặc tải lên 1 video podcast hay livestream 60 phút, AI sẽ tự động lắng nghe nội dung, chấm điểm độ viral (virality score), cắt thành 10-15 video ngắn hoàn hảo kèm phụ đề và tự động phóng to căn giữa mặt người nói.',
    price: 136000,
    salePrice: 68000,
    thumbnail: '/images/kol-ai.jpg',
    badge: 'Riêng',
    license: 'Riêng',
    stars: '115k★',
    hall: 'Sảnh II · Skill Edit Video Bán Hàng',
    category: 'Edit video bán hàng',
    rating: 5.0,
    reviewCount: 480,
    deliveryFormat: 'Workflow AI lọc điểm chạm viral + Auto Repurposing',
    features: [
      'Phát hiện đoạn nói có cú twist, cao trào và bài học sâu sắc',
      'Tự động định vị khuôn mặt từ khung ngang 16:9 sang dọc 9:16',
      'Tạo 15 video ngắn trong chưa đầy 10 phút',
      'Tiết kiệm hàng triệu đồng thuê editor mỗi tháng'
    ]
  },
  {
    id: 'skill-cap-do-2-postcard-2-nguoi',
    type: 'skill',
    title: 'Cắt podcast 2 người thành short',
    slug: 'cap-do-2-postcard-2-nguoi',
    shortDesc: 'Video phỏng vấn/podcast 2 người tự cắt short, khung postcard tự chuyển 1↔2 theo ai đang nói',
    description: 'Tự động nhận diện hai người nói trong buổi trò chuyện hoặc phỏng vấn trực tiếp. Hệ thống AI tự động phân bổ khung hình (chia đôi trên/dưới hoặc phóng to cận cảnh người đang phát biểu) một cách mượt mà và thông minh.',
    price: 136000,
    salePrice: 68000,
    thumbnail: '/images/kol-ai.jpg',
    badge: 'Riêng',
    license: 'Riêng',
    stars: '77k★',
    hall: 'Sảnh II · Skill Edit Video Bán Hàng',
    category: 'Edit video bán hàng',
    rating: 4.8,
    reviewCount: 195,
    deliveryFormat: 'Template Speaker Tracking 2 người + Quy trình tự động hóa',
    features: [
      'Nhận diện luồng âm thanh ai nói thì tự động lia camera về người đó',
      'Định dạng postcard 2 tầng kinh điển cho kênh phỏng vấn triệu view',
      'Phụ đề 2 màu riêng biệt cho người hỏi và người trả lời',
      'Giữ trọn cảm xúc tự nhiên của buổi đàm đạo'
    ]
  },
  {
    id: 'skill-multiclip-ghep-nhac-trend',
    type: 'skill',
    title: 'Ghép nhiều clip theo nhạc trend',
    slug: 'multiclip-ghep-nhac-trend',
    shortDesc: 'Nhiều clip rời rạc tự ghép liền mạch, mỗi lần chuyển cảnh rơi đúng nhịp beat của nhạc',
    description: 'Đưa vào hàng chục đoạn video quay ngẫu nhiên khi đi du lịch hoặc chụp mẫu, AI sẽ tự động phân tích nhịp điệu (beat) của bài nhạc xu hướng và cắt chuyển cảnh giật đúng từng phách nhạc, tạo nên cảm giác lôi cuốn đến từng giây.',
    price: 136000,
    salePrice: 68000,
    thumbnail: '/images/kol-ai.jpg',
    badge: 'Riêng',
    license: 'Riêng',
    stars: '103k★',
    hall: 'Sảnh II · Skill Edit Video Bán Hàng',
    category: 'Edit video bán hàng',
    rating: 4.9,
    reviewCount: 340,
    deliveryFormat: 'Bộ quy chuẩn Beat Sync AI + Danh sách nhạc trend cập nhật',
    features: [
      'Tự động bắt sóng beat của bản nhạc nền yêu thích',
      'Sắp xếp các phân cảnh logic theo mạch cảm xúc tăng dần',
      'Tạo video lookbook và giới thiệu sản phẩm cực kỳ bắt tai, bắt mắt',
      'Tối ưu giữ chân người xem (Watch Time) trên TikTok'
    ]
  },
  {
    id: 'skill-multiclip-1-video-highlight',
    type: 'skill',
    title: 'AI tự cắt highlight theo nhạc',
    slug: 'multiclip-1-video-highlight',
    shortDesc: 'Chỉ 1 video dài duy nhất, AI tự chọn đoạn ấn tượng nhất rồi ghép theo nhạc như video quảng cáo',
    description: 'Từ một tệp quay sự kiện hoặc buổi trải nghiệm dịch vụ dài hàng tiếng đồng hồ, AI tự động quét tìm nụ cười, tràng pháo tay, khoảnh khắc bùng nổ để chắt lọc thành 1 video highlight 45 giây tràn đầy năng lượng theo nhạc quảng cáo.',
    price: 136000,
    salePrice: 68000,
    thumbnail: '/images/kol-ai.jpg',
    badge: 'Riêng',
    license: 'Riêng',
    stars: '64k★',
    hall: 'Sảnh II · Skill Edit Video Bán Hàng',
    category: 'Edit video bán hàng',
    rating: 4.9,
    reviewCount: 210,
    deliveryFormat: 'Lệnh trích xuất Highlight AI + Kịch bản ghép nhạc thương mại',
    features: [
      'Tìm kiếm khoảnh khắc có biểu cảm cảm xúc tích cực nhất',
      'Dựng video recap sự kiện chỉ mất vài phút thay vì 2 ngày',
      'Chuẩn nhịp điệu TVC thương mại quốc tế',
      'Dùng được ngay cho quảng cáo Facebook Ads và Instagram'
    ]
  },

  // SẢNH V: Skill VIP Video & Đa Kênh
  {
    id: 'skill-edit-video-zoom',
    type: 'skill',
    title: 'Edit video Zoom tự động',
    slug: 'edit-video-zoom',
    shortDesc: 'Video họp, hội thảo quay bằng Zoom tự cắt gọn, bỏ đoạn chết, dựng thành video hoàn chỉnh',
    description: 'Giải pháp chuyên dụng cho các webinar, lớp học trực tuyến và cuộc họp qua Zoom/Google Meet. AI tự động cắt bỏ phần chờ đợi ban đầu, loại bỏ các đoạn chia sẻ màn hình bị lỗi và dựng thành một bài giảng hoàn thiện, sắc nét.',
    price: 136000,
    salePrice: 68000,
    thumbnail: '/images/kol-ai.jpg',
    badge: 'Riêng',
    license: 'Riêng',
    stars: '45k★',
    hall: 'Sảnh V · Skill VIP Video & Đa Kênh',
    category: 'VIP Video & Đa Kênh',
    rating: 4.8,
    reviewCount: 140,
    deliveryFormat: 'Workflow làm sạch video họp trực tuyến + Hướng dẫn vận hành',
    features: [
      'Xóa sạch các đoạn tạp âm, tiếng ồn rè và âm thanh gián đoạn',
      'Tự động chèn bảng mục lục các phần chính trong buổi họp',
      'Nén kích thước file mà vẫn giữ nguyên độ nét chữ trên slide',
      'Đóng gói thành khóa học bán lẻ ngay lập tức'
    ]
  },
  {
    id: 'skill-video-tu-dong-google-flow',
    type: 'skill',
    title: 'Tạo video tự động với Google Flow',
    slug: 'video-tu-dong-google-flow',
    shortDesc: 'Nhập kịch bản, Google Flow tự dựng video AI hoàn chỉnh, không cần quay dựng thủ công',
    description: 'Quy trình sản xuất video hoàn toàn tự động không cần người đứng trước máy quay. Chỉ cần nhập chủ đề hoặc văn bản kịch bản, AI tự tạo giọng đọc, tìm kiếm hình ảnh/video tư liệu bản quyền và ráp lại thành video hoàn thiện.',
    price: 136000,
    salePrice: 68000,
    thumbnail: '/images/kol-ai.jpg',
    badge: 'AI',
    license: 'AI',
    stars: '132k★',
    hall: 'Sảnh V · Skill VIP Video & Đa Kênh',
    category: 'VIP Video & Đa Kênh',
    rating: 5.0,
    reviewCount: 520,
    deliveryFormat: 'Workflow tích hợp Google Flow AI + Template kịch bản viral',
    features: [
      '100% tự động hóa từ chữ viết sang video hoàn chỉnh',
      'Kho tư liệu B-roll chất lượng cao tự động khớp nội dung',
      'Giọng đọc AI tự nhiên, ấm áp đa ngữ điệu',
      'Thích hợp xây dựng kênh tin tức, review sách, kể chuyện lịch sử'
    ]
  },
  {
    id: 'skill-subagent-cham-soc',
    type: 'skill',
    title: 'Subagent chăm sóc',
    slug: 'subagent-cham-soc',
    shortDesc: 'Trả lời bình luận Facebook/YouTube tự nhiên, đa dạng, không rập khuôn, không bịa thông tin',
    description: 'Trợ lý AI chuyên biệt hoạt động ngầm 24/7 để trả lời hàng ngàn bình luận trên Fanpage, nhóm cộng đồng và kênh YouTube. Văn phong thân thiện, đối đáp khéo léo theo tính cách chủ kênh và điều hướng khách hàng inbox mượt mà.',
    price: 136000,
    salePrice: 68000,
    thumbnail: '/images/kol-ai.jpg',
    badge: 'Riêng',
    license: 'Riêng',
    stars: '89k★',
    hall: 'Sảnh V · Skill VIP Video & Đa Kênh',
    category: 'VIP Video & Đa Kênh',
    rating: 4.9,
    reviewCount: 300,
    deliveryFormat: 'Cấu hình System Prompt Subagent + Script kết nối Fanpage',
    features: [
      'Mỗi câu trả lời một phong cách khác nhau, không bị trùng lặp',
      'Tự động ẩn bình luận chứa số điện thoại hoặc từ ngữ tiêu cực',
      'Tăng 300% tương tác tự nhiên trên các bài viết',
      'Hoàn toàn tuân thủ chính sách chống spam của Meta'
    ]
  },
  {
    id: 'skill-subagent-nghien-cuu',
    type: 'skill',
    title: 'Subagent nghiên cứu',
    slug: 'subagent-nghien-cuu',
    shortDesc: 'Tìm chủ đề/trend đang lên, phân tích đối thủ, lên danh sách ý tưởng nội dung theo mức tiềm năng',
    description: 'Trinh sát viên AI tự động rà soát thị trường mỗi ngày: quét các kênh đối thủ trong ngành, phân tích các video đang tăng trưởng đột biến và gợi ý bảng 20 ý tưởng nội dung tiềm năng nhất kèm góc tiếp cận độc lạ.',
    price: 136000,
    salePrice: 68000,
    thumbnail: '/images/kol-ai.jpg',
    badge: 'Riêng',
    license: 'Riêng',
    stars: '96k★',
    hall: 'Sảnh V · Skill VIP Video & Đa Kênh',
    category: 'VIP Video & Đa Kênh',
    rating: 4.9,
    reviewCount: 270,
    deliveryFormat: 'Workflow nghiên cứu thị trường tự động + Notion Board tích hợp',
    features: [
      'Báo cáo xu hướng mới chớm nở trước khi nó bùng nổ thành trend lớn',
      'Phân tích chi tiết điểm mạnh - điểm yếu trong video của đối thủ',
      'Xếp hạng ý tưởng theo thang điểm Viral Potential (Khả năng bùng nổ)',
      'Tiết kiệm 15 giờ lướt mạng vô bổ mỗi tuần'
    ]
  },
  {
    id: 'skill-seo-video-youtube',
    type: 'skill',
    title: 'Subagent SEO kênh YouTube',
    slug: 'seo-video-youtube',
    shortDesc: 'Tối ưu tiêu đề, mô tả, thẻ tag, timeline và thumbnail để video lên đề xuất nhanh hơn',
    description: 'Chiến binh tối ưu hóa thuật toán YouTube hàng đầu. Phân tích từ khóa tìm kiếm có lượng truy cập cao nhưng ít cạnh tranh, viết mô tả chuẩn SEO, gắn thẻ tags thông minh và thiết lập timeline điều hướng thuật toán đề xuất.',
    price: 136000,
    salePrice: 68000,
    thumbnail: '/images/kol-ai.jpg',
    badge: 'Riêng',
    license: 'Riêng',
    stars: '118k★',
    hall: 'Sảnh V · Skill VIP Video & Đa Kênh',
    category: 'VIP Video & Đa Kênh',
    rating: 5.0,
    reviewCount: 380,
    deliveryFormat: 'Prompt chuyên sâu YouTube SEO Master + Công cụ rà soát từ khóa',
    features: [
      'Viết 5 phương án tiêu đề có CTR (Click-Through Rate) cao nhất',
      'Đoạn mô tả tối ưu hóa bộ máy tìm kiếm của Google & YouTube',
      'Bộ hashtag và tags ngách nhắm trúng đối tượng khán giả mục tiêu',
      'Hỗ trợ video nhanh chóng lọt vào danh sách gợi ý liên quan'
    ]
  },
  {
    id: 'skill-dang-bai-tu-dong-da-kenh',
    type: 'skill',
    title: 'Viết và đăng bài Facebook đúng giọng kênh',
    slug: 'dang-bai-tu-dong-da-kenh',
    shortDesc: 'Học giọng kênh của bạn, viết bài kèm nội dung ảnh/carousel/video, xin duyệt rồi đăng hoặc lên lịch Facebook',
    description: 'AI được nạp các bài viết thành công nhất của bạn để học chuẩn xác văn phong, nhịp điệu và cá tính thương hiệu. Tự động soạn bài viết mới, đề xuất hình ảnh minh họa, gửi bản nháp về Telegram để bạn duyệt trước khi tự động bấm nút đăng.',
    price: 136000,
    salePrice: 68000,
    thumbnail: '/images/kol-ai.jpg',
    badge: 'Riêng',
    license: 'Riêng',
    stars: '140k★',
    hall: 'Sảnh V · Skill VIP Video & Đa Kênh',
    category: 'VIP Video & Đa Kênh',
    rating: 5.0,
    reviewCount: 460,
    deliveryFormat: 'Quy trình n8n đăng bài đa kênh + System Prompt Voice Cloning',
    features: [
      'Giữ trọn vẹn văn phong cá nhân, khán giả không thể nhận ra là AI viết',
      'Hệ thống duyệt bài 1 chạm siêu tiện lợi qua tin nhắn Telegram',
      'Lên lịch đăng bài xuyên suốt 30 ngày chỉ trong 1 buổi làm việc',
      'Đồng bộ đăng tải đồng thời lên Fanpage, Profile và Group'
    ]
  },
  {
    id: 'skill-tao-video-viral',
    type: 'skill',
    title: 'Tạo video viral',
    slug: 'tao-video-viral',
    shortDesc: 'Công thức dựng video dễ viral, bám đúng nhịp xu hướng đang lên',
    description: 'Tổng hợp các cấu trúc kịch bản và nhịp dựng giật gân có tỷ lệ giữ chân người xem trên 80% trong 5 giây đầu tiên. Kèm bộ câu hook tâm lý kích thích người xem bình luận và chia sẻ mạnh mẽ.',
    price: 136000,
    salePrice: 68000,
    thumbnail: '/images/kol-ai.jpg',
    badge: 'Riêng',
    license: 'Riêng',
    stars: '88k★',
    hall: 'Sảnh V · Skill VIP Video & Đa Kênh',
    category: 'VIP Video & Đa Kênh',
    rating: 4.9,
    reviewCount: 350,
    deliveryFormat: 'Bộ công thức Viral Video Architecture + Hook generator',
    features: [
      '50 mẫu câu mở đầu giật gân kích thích sự tò mò tột đỉnh',
      'Sơ đồ chuyển động tâm lý người xem xuyên suốt 60 giây',
      'Mẹo kích thích tranh luận văn minh để bùng nổ tương tác',
      'Phù hợp cho cả video bán hàng chuyển đổi lẫn video xây kênh'
    ]
  },
  {
    id: 'skill-reel-facebook-viral',
    type: 'skill',
    title: 'Xây kênh Facebook tự động',
    slug: 'reel-facebook-viral',
    shortDesc: 'Học kênh mẫu, tự dựng Reel từ kho video của bạn và hẹn lịch đăng đều mỗi ngày — bạn chỉ việc duyệt',
    description: 'Hệ thống tự động hóa toàn diện cho việc xây dựng Fanpage/Reels triệu view. Quét và phân tích những kênh hàng đầu trong ngành, trích xuất kho video có sẵn của bạn để sản xuất đều đặn 2 Reel mỗi ngày, bạn chỉ việc bấm nút đồng ý.',
    price: 136000,
    salePrice: 68000,
    thumbnail: '/images/kol-ai.jpg',
    badge: 'Riêng',
    license: 'Riêng',
    stars: '105k★',
    hall: 'Sảnh V · Skill VIP Video & Đa Kênh',
    category: 'VIP Video & Đa Kênh',
    rating: 5.0,
    reviewCount: 420,
    deliveryFormat: 'Workflow xây kênh tự động hóa 24/7 + Bản hướng dẫn scale hệ thống',
    features: [
      'Tự động lên lịch 60 video Reel trong tháng',
      'Tối ưu hóa thuật toán phân phối nội dung của nền tảng Facebook',
      'Báo cáo tăng trưởng người theo dõi trực quan',
      'Biến kênh mạng xã hội thành cỗ máy hút khách hàng thụ động'
    ]
  }
];

export const TOOLS: Product[] = [
  {
    id: 'tool-1',
    type: 'tool',
    title: 'AI Social Copilot: Tự Động Lên Lịch & Viết Content',
    slug: 'ai-social-copilot',
    shortDesc: 'Công cụ đồng bộ đa kênh (Facebook, LinkedIn, X, Threads) giúp lên kế hoạch và xuất bản nội dung tự động.',
    description: 'Tích hợp AI phân tích xu hướng thị trường, gợi ý chủ đề viral trong ngày và tự động soạn thảo bài viết theo phong cách thương hiệu của bạn.',
    price: 490000,
    salePrice: 290000,
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
    badge: 'Pro',
    category: 'Nội dung & Mạng xã hội',
    rating: 4.9,
    reviewCount: 160,
    deliveryFormat: 'Tài khoản bản quyền Pro 1 năm + Key kích hoạt tức thì',
    features: ['Không giới hạn bài đăng hàng tháng', 'Phân tích khung giờ vàng tương tác cao', 'Gợi ý hashtag tự động']
  },
  {
    id: 'tool-2',
    type: 'tool',
    title: 'AI VoiceStudio: Clone Giọng Nói & Thuyết Minh Chuẩn Việt Nam',
    slug: 'ai-voicestudio-clone-giong-noi',
    shortDesc: 'Chuyển văn bản thành giọng đọc truyền cảm, đa vùng miền (Bắc, Trung, Nam) không có tạp âm máy móc.',
    description: 'Chỉ cần mẫu âm thanh 60 giây, AI có thể tái tạo giọng đọc của chính bạn để lồng tiếng cho video ngắn, podcast và bài giảng trực tuyến.',
    price: 690000,
    salePrice: 390000,
    thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
    badge: 'Miễn phí thử',
    category: 'Âm thanh & Lồng tiếng',
    rating: 5.0,
    reviewCount: 215,
    deliveryFormat: 'Cổng Web App truy cập trực tiếp + 100.000 ký tự credit',
    features: ['Hơn 50 giọng đọc tự nhiên có sẵn', 'Hỗ trợ cảm xúc: vui vẻ, trầm ấm, sôi nổi', 'Tải file MP3 / WAV 320kbps']
  },
  {
    id: 'tool-3',
    type: 'tool',
    title: 'AI ViralClip: Cắt & Tạo Phụ Đề Video Ngắn Trong 1 Click',
    slug: 'ai-viralclip-cat-phu-de-tu-dong',
    shortDesc: 'Tự động biến video dài YouTube / Zoom thành 10 clip ngắn TikTok có gắn phụ đề nhảy chữ bắt mắt.',
    description: 'Phát hiện đoạn kịch tính nhất trong video, tự crop tỷ lệ 9:16 tập trung vào khuôn mặt người nói và thêm sticker hiệu ứng sinh động.',
    price: 550000,
    salePrice: 320000,
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
    badge: 'Hot',
    category: 'Video & Media',
    rating: 4.8,
    reviewCount: 180,
    deliveryFormat: 'Gói thành viên Cloud Editor 6 tháng',
    features: ['Nhận diện tiếng Việt chuẩn 99%', 'Preset phụ đề theo style của MrBeast, Alex Hormozi', 'Xuất video Full HD 60fps']
  },
  {
    id: 'tool-4',
    type: 'tool',
    title: 'AI CodeSense: Trợ Lý Rà Soát Lỗi & Tối Ưu Hiệu Năng',
    slug: 'ai-codesense-tro-ly-code',
    shortDesc: 'Extension tích hợp VS Code và GitHub giúp tìm lỗ hổng bảo mật, giải thích code và viết unit test tự động.',
    description: 'Trợ thủ đắc lực cho lập trình viên và doanh nghiệp công nghệ muốn nâng cao chất lượng mã nguồn trước khi deploy lên production.',
    price: 800000,
    salePrice: 490000,
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    badge: 'Pro',
    category: 'Lập trình & Kỹ thuật',
    rating: 4.9,
    reviewCount: 110,
    deliveryFormat: 'License Key bản quyền trọn đời + Hỗ trợ kỹ thuật 1-1',
    features: ['Hỗ trợ TypeScript, Python, Go, Java', 'Gợi ý refactor giảm 40% memory usage', 'Tích hợp CI/CD tự động kiểm tra Pull Request']
  }
];

export const ROADMAP_STEPS = [
  {
    step: '01',
    title: 'Nhập Môn & Khai Phá Tư Duy AI',
    subtitle: 'Nền tảng vững chắc',
    desc: 'Hiểu bản chất LLM, cách AI suy nghĩ và nắm vững các kỹ thuật Prompt Engineering cơ bản đến nâng cao.',
    icon: 'Brain'
  },
  {
    step: '02',
    title: 'Sáng Tạo Hình Ảnh & Visual Content',
    subtitle: 'Mỹ thuật số & Đồ họa',
    desc: 'Làm chủ Midjourney v6, Flux Pro, Stable Diffusion. Sản xuất tài sản thị giác đỉnh cao phục vụ thương mại.',
    icon: 'Sparkles'
  },
  {
    step: '03',
    title: 'Xây Dựng Custom GPTs & Gemini Gems',
    subtitle: 'Đóng gói trí tuệ chuyên gia',
    desc: 'Tự huấn luyện trợ lý ảo cá nhân bằng kiến thức độc quyền, kết nối API và đưa lên chợ ứng dụng.',
    icon: 'Bot'
  },
  {
    step: '04',
    title: 'Tự Động Hóa Quy Trình Với AI Agent',
    subtitle: 'Vận hành không tốn sức',
    desc: 'Kết nối Make.com, n8n, CRM và mạng xã hội. Tạo hệ thống tự động phân loại data và chăm sóc khách hàng.',
    icon: 'Cpu'
  },
  {
    step: '05',
    title: 'Kinh Doanh & Khởi Nghiệp Cùng AI',
    subtitle: 'Biến kỹ năng thành doanh thu',
    desc: 'Xây dựng dịch vụ AI Agency, bán sản phẩm số (Prompt, GPTs, Workflow) và nhân rộng mô hình kinh doanh.',
    icon: 'Rocket'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Phan Minh Hoàng',
    role: 'CEO & Founder',
    company: 'Skyline Media Agency',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    content: 'Trước đây team marketing của tôi mất 3 ngày để làm xong 1 chiến dịch nội dung. Sau khi áp dụng kiến thức từ AI Academy Pro, thời gian rút ngắn chỉ còn 4 giờ với chất lượng vượt mong đợi!',
    courseTaken: 'Làm Chủ AI & ChatGPT Toàn Diện'
  },
  {
    id: 't2',
    name: 'Lê Thu Hương',
    role: 'Senior Graphic Designer',
    company: 'Freelancer Quốc Tế',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    content: 'Khóa Midjourney thực sự là chìa khóa mở ra cánh cửa thu nhập mới của mình trên Upwork. Các kỹ thuật chỉnh góc máy và ánh sáng trong khóa học không nơi nào dạy chi tiết bằng.',
    courseTaken: 'Nghệ Thuật Tạo Ảnh AI Chuyên Nghiệp'
  },
  {
    id: 't3',
    name: 'Nguyễn Thành Nam',
    role: 'Giám đốc Vận hành',
    company: 'FastDelivery Express',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    content: 'Hệ thống n8n AI Agent học từ khóa học đã giúp công ty xử lý tự động hơn 5.000 tin nhắn mỗi ngày. Tiết kiệm cho chúng tôi ít nhất 3 nhân sự trực fanpage!',
    courseTaken: 'Tự Động Hóa Doanh Nghiệp Với Make & n8n'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Tôi là người không biết lập trình thì có học được không?',
    answer: 'Hoàn toàn được! Hơn 80% nội dung tại AI Academy Pro tập trung vào tư duy tương tác ngôn ngữ tự nhiên (Prompting) và các công cụ No-Code trực quan. Bạn chỉ cần biết sử dụng máy tính cơ bản là có thể học và ứng dụng ngay.'
  },
  {
    id: 'faq-2',
    question: 'Phương thức thanh toán qua SePay hoạt động thế nào?',
    answer: 'Khi bạn đặt hàng, hệ thống sẽ tự động hiển thị mã VietQR chứa đúng số tiền và cú pháp mã đơn của bạn. Bạn chỉ cần mở app ngân hàng quét mã và chuyển khoản. Sau 3 đến 5 giây, giao dịch được xác nhận tự động và khóa học được kích hoạt ngay lập tức mà không cần chờ duyệt thủ công.'
  },
  {
    id: 'faq-3',
    question: 'Tôi có được xem lại bài học và cập nhật kiến thức mới không?',
    answer: 'Có! Khi đăng ký, bạn sở hữu quyền truy cập trọn đời vào khóa học. Do lĩnh vực AI thay đổi nhanh, giảng viên sẽ liên tục bổ sung bài giảng mới định kỳ hàng quý mà bạn không phải đóng thêm bất kỳ khoản phí nào.'
  },
  {
    id: 'faq-4',
    question: 'Chính sách hoàn tiền của AI Academy Pro như thế nào?',
    answer: 'Chúng tôi cam kết hoàn tiền 100% trong vòng 7 ngày kể từ ngày mua nếu bạn cảm thấy nội dung khóa học không đúng như cam kết và chưa học quá 25% thời lượng video.'
  },
  {
    id: 'faq-5',
    question: 'Tôi có được hỗ trợ khi gặp khó khăn trong quá trình học không?',
    answer: 'Tất cả học viên đều được tham gia nhóm hỗ trợ chuyên sâu trên Zalo / Discord có giảng viên và đội ngũ trợ giảng túc trực giải đáp thắc mắc 1-1 hàng ngày.'
  }
];

export const PRICING_PLANS = [
  {
    id: 'plan-basic',
    name: 'Cơ Bản',
    desc: 'Lý tưởng cho cá nhân muốn làm quen và tăng tốc công việc hàng ngày',
    monthlyPrice: 299000,
    yearlyPrice: 2490000,
    highlight: false,
    badge: 'Khởi đầu',
    features: [
      'Truy cập 2 khóa học nền tảng AI',
      'Kho 500+ Prompt bán hàng & văn phòng',
      'Trợ lý Chatbot AI hỗ trợ học tập',
      'Tham gia cộng đồng học viên',
      'Hỗ trợ qua kênh chung'
    ]
  },
  {
    id: 'plan-pro',
    name: 'Chuyên Nghiệp (Pro)',
    desc: 'Dành cho Freelancer, Creator và Chuyên gia muốn dẫn đầu thị trường',
    monthlyPrice: 699000,
    yearlyPrice: 4990000,
    highlight: true,
    badge: 'Phổ biến nhất ★',
    features: [
      'Mở khóa TOÀN BỘ khóa học trên nền tảng',
      'Full kho 1.200+ Prompt & Workflow n8n',
      'Quyền truy cập 20 Custom GPTs / Gems Pro',
      'Cập nhật khóa học mới miễn phí trọn đời',
      'Cấp chứng chỉ hoàn thành xác thực Blockchain',
      'Hỗ trợ 1-1 từ đội ngũ trợ giảng qua Zoom'
    ]
  },
  {
    id: 'plan-enterprise',
    name: 'Doanh Nghiệp',
    desc: 'Giải pháp đào tạo và chuyển đổi số AI trọn gói cho tổ chức & công ty',
    monthlyPrice: 1990000,
    yearlyPrice: 16900000,
    highlight: false,
    badge: 'Tùy chỉnh',
    features: [
      'Cung cấp tài khoản cho tối đa 20 nhân sự',
      'Thiết kế lộ trình đào tạo riêng theo nghiệp vụ',
      'Xây dựng 01 quy trình AI Agent tự động hóa riêng',
      'Báo cáo tiến độ học tập hàng tuần của nhân viên',
      'Buổi Workshop đào tạo trực tiếp cùng chuyên gia'
    ]
  }
];

export const AI_PARTNER_LOGOS = [
  { name: 'OpenAI ChatGPT', logo: 'ChatGPT' },
  { name: 'Anthropic Claude', logo: 'Claude 3.7' },
  { name: 'Google Gemini', logo: 'Gemini' },
  { name: 'Midjourney v6', logo: 'Midjourney' },
  { name: 'Flux.1 AI', logo: 'FLUX' },
  { name: 'n8n Automation', logo: 'n8n' },
  { name: 'Make.com', logo: 'Make' },
  { name: 'Cursor AI', logo: 'Cursor' },
  { name: 'ElevenLabs', logo: 'ElevenLabs' },
  { name: 'Runway Gen-3', logo: 'Runway' }
];

export const SEPAY_CONFIG = {
  bankName: 'Techcombank (Ngân hàng TMCP Kỹ Thương Việt Nam)',
  bankCode: 'TCB',
  accountNumber: '6688991971',
  accountHolder: 'PHAN THI HAI YEN',
  sampleOrderCodePrefix: 'AIA',
  qrImage: '/images/qr-techcombank.png'
};

export interface FreeGift {
  id: string;
  title: string;
  category: 'Ebook' | 'Prompt Pack' | 'Workflow' | 'Custom GPT' | 'Cheatsheet';
  desc: string;
  downloads: number;
  format: string;
  badge?: string;
  thumbnail: string;
  downloadUrl?: string;
  author: string;
}

export const FREE_GIFTS: FreeGift[] = [
  {
    id: 'gift-1',
    title: 'Ebook 100+ Công Thức Prompt Engineering Thực Chiến 2025',
    category: 'Ebook',
    desc: 'Cẩm nang 85 trang tổng hợp các kỹ thuật Few-shot, Chain-of-Thought và ReAct Prompting áp dụng ngay cho công việc quản trị, marketing và bán hàng.',
    downloads: 18450,
    format: 'File PDF (85 Trang)',
    badge: 'Tải nhiều nhất 🔥',
    thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    author: 'AI Academy Pro'
  },
  {
    id: 'gift-2',
    title: 'Kho 300+ Prompt Bán Hàng & Chăm Sóc Khách Hàng Zalo / Fanpage',
    category: 'Prompt Pack',
    desc: 'Tuyển tập câu lệnh giúp AI trả lời tin nhắn khách hàng tự nhiên, giải quyết từ chối giá và chốt đơn thông minh.',
    downloads: 24200,
    format: 'Notion Workspace + Excel',
    badge: 'Khuyên dùng ★',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    author: 'Team Phượng Hoàng Lửa'
  },
  {
    id: 'gift-3',
    title: 'Workflow n8n Tự Động Quét & Viết Lại Tin Tức Theo Phong Cách Riêng',
    category: 'Workflow',
    desc: 'Kịch bản tự động chạy ngầm quét tin tức ngành, dùng Claude 3.5 tóm tắt và thông báo tóm tắt qua Telegram mỗi sáng.',
    downloads: 9800,
    format: 'File Blueprint .json n8n',
    badge: 'Mới ra mắt',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    author: 'AI Automation Lab'
  },
  {
    id: 'gift-4',
    title: 'Custom GPT: Chuyên Gia Soát Xét Hợp Đồng & Pháp Lý Doanh Nghiệp',
    category: 'Custom GPT',
    desc: 'Trợ lý AI được nạp sẵn các điều khoản pháp lý Việt Nam, phát hiện rủi ro và gợi ý chỉnh sửa văn bản pháp quy trong 30 giây.',
    downloads: 14100,
    format: 'Link OpenAI GPTs Store',
    badge: 'Miễn phí vĩnh viễn',
    thumbnail: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    author: 'AI Academy Pro'
  },
  {
    id: 'gift-5',
    title: 'Cheatsheet Tra Cứu Toàn Bộ Style Ánh Sáng & Góc Máy Midjourney v6',
    category: 'Cheatsheet',
    desc: 'Bản đồ trực quan gồm 200+ từ khóa ánh sáng điện ảnh, lens máy ảnh và thông số aspect ratio sắc nét.',
    downloads: 21300,
    format: 'Infographic HD 4K + PDF',
    badge: 'Hot Visual',
    thumbnail: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
    author: 'Tuấn Art'
  },
  {
    id: 'gift-6',
    title: 'Bộ 50 Kịch Bản Video Ngắn TikTok/Reels Đạt Triệu View 2025',
    category: 'Prompt Pack',
    desc: 'Khung kịch bản Hook 3 giây đầu, Body giữ chân và CTA kích thích tương tác cho các nhà sáng tạo nội dung.',
    downloads: 29800,
    format: 'Google Docs Template',
    badge: 'Viral Maker',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
    author: 'Đặng Mai Phương'
  }
];


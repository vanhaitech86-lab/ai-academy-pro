import { Product, Testimonial, FAQItem } from './types';

export const COURSES: Product[] = [
  {
    id: 'course-1',
    type: 'course',
    title: 'Làm Chủ AI & ChatGPT Toàn Diện: Từ Zero Đến Hero',
    slug: 'lam-chu-ai-chatgpt-toan-dien',
    shortDesc: 'Xây dựng tư duy tương tác AI chuẩn quốc tế, làm chủ ChatGPT, Claude & Gemini để nhân 10 năng suất công việc hàng ngày.',
    description: 'Khóa học được thiết kế bài bản từ nền tảng đến thực chiến dành cho người đi làm, quản lý và chủ doanh nghiệp. Bạn sẽ hiểu sâu cách AI hoạt động, kỹ thuật Prompt Engineering nâng cao, xử lý tài liệu lớn, phân tích dữ liệu và tự động hóa tác vụ văn phòng.',
    price: 1990000,
    salePrice: 990000,
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    badge: 'Bán chạy',
    category: 'Người mới bắt đầu',
    rating: 4.9,
    reviewCount: 428,
    level: 'Người mới bắt đầu',
    duration: '18 giờ · 42 bài học',
    studentsCount: 2840,
    instructor: {
      name: 'ThS. Hoàng Hải Long',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      title: 'AI Architect & Giảng viên AI Quốc tế',
      bio: 'Hơn 8 năm kinh nghiệm ứng dụng AI vào tự động hóa doanh nghiệp và đào tạo hơn 15.000 học viên tại Việt Nam.'
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
    price: 2490000,
    salePrice: 1290000,
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
    price: 2200000,
    salePrice: 1150000,
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
    price: 3500000,
    salePrice: 1890000,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    badge: 'Bán chạy',
    category: 'Tự động hóa',
    rating: 4.9,
    reviewCount: 260,
    level: 'Trung cấp',
    duration: '22 giờ · 50 bài học',
    studentsCount: 1680,
    instructor: {
      name: 'ThS. Hoàng Hải Long',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      title: 'AI Architect & Giảng viên AI Quốc tế',
      bio: 'Chuyên gia tư vấn chuyển đổi số tự động hóa cho các tập đoàn bán lẻ và giáo dục.'
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
    price: 2100000,
    salePrice: 1050000,
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
    price: 3200000,
    salePrice: 1690000,
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
  {
    id: 'skill-1',
    type: 'skill',
    title: 'Bộ Mega Prompt 1.200+ Câu Lệnh Bán Hàng & Marketing Đỉnh Cao',
    slug: 'mega-prompt-1200-ban-hang-marketing',
    shortDesc: 'Tuyển tập prompt được tinh chỉnh thực chiến cho 30 ngành nghề: viết bài quảng cáo, kịch bản chốt sale, email marketing.',
    description: 'Không cần mất nhiều giờ suy nghĩ ý tưởng. Chỉ cần copy & điền thông tin doanh nghiệp của bạn, AI sẽ xuất ra nội dung có tỷ lệ chuyển đổi cao ngay lập tức.',
    price: 790000,
    salePrice: 390000,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    badge: 'Bán chạy',
    category: 'Prompt Pack',
    rating: 4.9,
    reviewCount: 520,
    deliveryFormat: 'File Notion Template + Google Sheets + File JSON nạp vào AI Tools',
    features: [
      '1.200 câu lệnh phân loại rõ theo từng mục tiêu chiến dịch',
      'Tương thích ChatGPT, Claude, Gemini, CoPilot',
      'Cập nhật prompt mới mỗi tháng hoàn toàn miễn phí'
    ]
  },
  {
    id: 'skill-2',
    type: 'skill',
    title: 'Workflow Tự Động Viết Bài & Đăng Lên Facebook / Blog qua n8n',
    slug: 'workflow-tu-dong-viet-bai-dang-facebook-n8n',
    shortDesc: 'Hệ thống tự động quét tin tức hot, tóm tắt và viết thành bài chuẩn SEO, tạo ảnh minh họa và hẹn giờ đăng bài.',
    description: 'Quy trình tự động hóa hoàn chỉnh được đóng gói dưới dạng file JSON. Bạn chỉ cần tải lên n8n của mình, nhập API key là hệ thống tự chạy 24/7.',
    price: 1500000,
    salePrice: 690000,
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    badge: 'Hot',
    category: 'Workflow n8n/Make',
    rating: 5.0,
    reviewCount: 310,
    deliveryFormat: 'File Workflow .json + Video hướng dẫn cài đặt 20 phút',
    features: [
      'Tích hợp sẵn bộ lọc ngôn ngữ tự nhiên không bị phát hiện là AI',
      'Tự động generate ảnh bìa bằng DALL-E 3 hoặc Flux API',
      'Thông báo kết quả đăng bài tức thì về Telegram'
    ]
  },
  {
    id: 'skill-3',
    type: 'skill',
    title: 'Combo 20 Trợ Lý Custom GPTs & Gems Chuyên Nghiệp',
    slug: 'combo-20-tro-ly-custom-gpts-gems',
    shortDesc: 'Bộ sưu tập trợ lý ảo chuyên sâu: Luật sư AI, Bác sĩ tài chính, Chuyên gia Google Ads, Copywriter triệu đô.',
    description: 'Được huấn luyện trên kho tài liệu thực tế của chuyên gia. Tiết kiệm chi phí thuê nhân sự với những trợ lý thông minh luôn sẵn sàng phục vụ bạn.',
    price: 1200000,
    salePrice: 590000,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80',
    badge: 'Mới',
    category: 'Custom GPTs / Gems',
    rating: 4.8,
    reviewCount: 195,
    deliveryFormat: 'Đường link truy cập GPTs Store riêng tư + Full System Prompt',
    features: [
      'Truy cập trực tiếp trên giao diện ChatGPT Plus hoặc tài khoản Free',
      'Đính kèm bộ tài liệu knowledge base độc quyền',
      'Hướng dẫn tinh chỉnh theo nhu cầu riêng của doanh nghiệp'
    ]
  },
  {
    id: 'skill-4',
    type: 'skill',
    title: 'Preset Prompt Midjourney Tạo Ảnh Chân Dung Studio & Thời Trang',
    slug: 'preset-prompt-midjourney-chan-dung-studio',
    shortDesc: 'Bộ 300+ prompt và thông số cấu hình tạo ảnh chân dung người thật sắc nét đến từng sợi tóc, phục vụ quảng cáo lookbook.',
    description: 'Giải pháp thay thế các buổi chụp hình đắt đỏ. Tạo người mẫu AI với trang phục theo ý muốn chỉ trong vài phút.',
    price: 900000,
    salePrice: 450000,
    thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    badge: 'Hot',
    category: 'Prompt Tạo Ảnh',
    rating: 4.9,
    reviewCount: 240,
    deliveryFormat: 'Tài liệu PDF tra cứu hình ảnh + Thư viện mã lệnh prompt',
    features: [
      'Công thức ánh sáng Rembrandt, Rim light, Studio cinematic',
      'Bảng từ khóa chất liệu vải, trang sức và makeup chi tiết',
      'Mẹo giữ khuôn mặt người mẫu đồng nhất giữa các bộ trang phục'
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
  bankName: 'MBBank (Ngân hàng Quân Đội)',
  bankCode: 'MB',
  accountNumber: '999988889999',
  accountHolder: 'AI ACADEMY PRO / HOANG HAI LONG',
  sampleOrderCodePrefix: 'AIA'
};

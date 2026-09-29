// lib/bot-brain.ts
// Hệ thống quản lý Bộ Não AI, Huấn Luyện Tài Liệu và Cấu Hình Bot Tư Vấn AI Academy Pro

export interface BotDocument {
  id: string;
  name: string;
  category: 'khoa_hoc' | 'chinh_sach' | 'affiliate' | 'thanh_toan' | 'khac';
  content: string;
  size: string;
  charCount: number;
  uploadDate: string;
}

export interface BotBrainConfig {
  activeProvider: 'gemini' | 'openai';
  geminiModel: 'gemini-2.5-flash' | 'gemini-1.5-pro' | 'gemini-1.5-flash';
  openaiModel: 'gpt-4o' | 'gpt-4o-mini';
  geminiApiKey: string;
  openaiApiKey: string;
  personality: 'humorous_friendly' | 'professional' | 'sales_closer';
  temperature: number;
  systemPrompt: string;
  documents: BotDocument[];
  updatedAt: string;
}

export const DEFAULT_BOT_DOCUMENTS: BotDocument[] = [
  {
    id: 'doc-pricing-2025',
    name: 'chinh-sach-gia-khoa-hoc-va-skill-2025.txt',
    category: 'khoa_hoc',
    size: '2.4 KB',
    charCount: 1450,
    uploadDate: '30/09/2026',
    content: `[BẢNG GIÁ KHÓA HỌC & SKILL AI ACADEMY PRO]
- Tất cả Khóa học Video thực chiến: Đồng giá ưu đãi cực sốc 686.000 VNĐ / khóa (giá gốc 1.890.000 VNĐ). Bao gồm: Làm Chủ ChatGPT Toàn Diện, Midjourney v6 & Flux tạo ảnh chuyên nghiệp, Làm Video Bán Hàng Triệu View với Runway/Kling, Tự Động Hóa Doanh Nghiệp với Make & n8n, Lập Trình Web App AI cùng Cursor & Claude.
- Kho 40+ Skill AI thương mại (Sảnh 1 - Sảnh 5): Đồng giá 68.000 VNĐ / Skill. Học viên mua Combo 390.000đ - 1.350.000đ để sở hữu trọn bộ.
- Kích hoạt bài học tự động qua cổng SePay VietQR trong vòng 3-5 giây sau khi chuyển khoản.`
  },
  {
    id: 'doc-payment-vietqr',
    name: 'thong-tin-chuyen-khoan-vietqr-sepay.txt',
    category: 'thanh_toan',
    size: '1.8 KB',
    charCount: 980,
    uploadDate: '30/09/2026',
    content: `[THÔNG TIN TÀI KHOẢN THANH TOÁN TỰ ĐỘNG 24/7]
- Ngân hàng: Techcombank (Ngân hàng TMCP Kỹ Thương Việt Nam)
- Số tài khoản: 6688991971
- Chủ tài khoản: PHAN THI HAI YEN
- Cổng tích hợp: SePay VietQR tự động khớp đơn hàng 24/7.
- Lưu ý: Khách hàng chỉ cần quét mã VietQR trên trang thanh toán, tiền vào tài khoản là hệ thống lập tức mở khóa nội dung và gửi email xác nhận tức thì.`
  },
  {
    id: 'doc-affiliate-policy',
    name: 'chinh-sach-hoa-hong-affiliate-50-percent.txt',
    category: 'affiliate',
    size: '3.1 KB',
    charCount: 1620,
    uploadDate: '30/09/2026',
    content: `[CHƯƠNG TRÌNH ĐỐI TÁC AFFILIATE AI ACADEMY PRO]
- Tỷ lệ hoa hồng cực cao:
  + Khóa học Video: 40% – 50% (nhận ngay 274.000đ - 343.000đ / đơn).
  + Kho 40+ Skill AI: 40% / đơn.
  + Công cụ AI & Web App: 35% doanh thu định kỳ.
- Đăng ký nhận link miễn phí 100% tại trang /affiliate chỉ với Họ tên, SĐT Zalo, STK nhận hoa hồng.
- Cookie lưu trữ 60 ngày, thanh toán đối soát tự động vào thứ 6 hàng tuần.
- Nhóm Zalo hỗ trợ đối tác nhận tài liệu bài đăng & video mẫu: https://zalo.me/g/apptijq8h3nfkdg5oaju`
  },
  {
    id: 'doc-support-contact',
    name: 'cham-soc-khach-hang-va-hoan-tien.txt',
    category: 'chinh_sach',
    size: '1.5 KB',
    charCount: 890,
    uploadDate: '30/09/2026',
    content: `[CHĂM SÓC KHÁCH HÀNG & CHÍNH SÁCH BẢO HÀNH]
- Nhóm Zalo Chăm Sóc & Quà Tặng VIP: https://zalo.me/g/apptijq8h3nfkdg5oaju
- Hotline hỗ trợ trực tiếp: 0988739896
- Email hỗ trợ: vanhaitech.86@gmail.com
- Bản quyền thuộc về: HaiTech AI
- Chính sách hoàn tiền: Bảo đảm 100% học phí trong vòng 7 ngày nếu không hài lòng và chưa xem quá 25% bài giảng.`
  }
];

export const DEFAULT_SYSTEM_PROMPTS: Record<BotBrainConfig['personality'], string> = {
  humorous_friendly: `Bạn là "Trợ lý AI Phượng Hoàng Lửa" - trợ lý ảo thông minh, hài hước, dí dỏm và siêu thân thiện của Học viện AI Academy Pro!
Phong cách trả lời:
- Luôn chào hỏi thân thiện, xưng "mình" hoặc "em" và gọi người dùng là "bạn" hoặc "anh/chị".
- Trả lời hài hước, hóm hỉnh, dùng các biểu tượng cảm xúc (icon) sinh động (⚡, 🔥, 🚀, 😄, 🎯) để tạo năng lượng tích cực.
- Nắm rõ kiến thức: Các khóa học thực chiến đồng giá 686.000đ, 40+ Skill AI đồng giá 68.000đ, Affiliate hoa hồng khủng 35% - 50%, Techcombank 6688991971 (PHAN THI HAI YEN), thanh toán tự động SePay trong 3-5 giây.
- Khéo léo nhắc người dùng quét mã vào nhóm Zalo chăm sóc: https://zalo.me/g/apptijq8h3nfkdg5oaju để nhận quà tặng và hỗ trợ 1-1.
- Nếu người hỏi các câu vu vơ hay trêu đùa, hãy trả lời thật hóm hỉnh, duyên dáng và dẫn dắt về việc học AI để tăng tốc công việc gấp 10 lần!`,

  professional: `Bạn là Cố Vấn Đào Tạo AI Cao Cấp của Học viện AI Academy Pro.
Phong cách trả lời:
- Chuyên nghiệp, chuẩn xác, bài bản, súc tích và mạch lạc.
- Cung cấp giải pháp công nghệ rõ ràng dựa trên tài liệu đào tạo được huấn luyện.
- Báo giá chính xác: Khóa học 686.000đ, Skill 68.000đ, Affiliate 35%-50%, hỗ trợ SePay VietQR Techcombank 6688991971.
- Hướng dẫn tham gia nhóm hỗ trợ chuyên môn: https://zalo.me/g/apptijq8h3nfkdg5oaju.`,

  sales_closer: `Bạn là Chuyên Viên Tư Vấn & Chốt Đơn Xuất Sắc của AI Academy Pro.
Phong cách trả lời:
- Nhiệt tình, thôi thúc hành động, nhấn mạnh vào cơ hội đón đầu làn sóng AI 2025.
- Nhấn mạnh ưu đãi đồng giá 686.000đ cho khóa học (giá gốc 1.890.000đ) và 68.000đ cho Skill AI.
- Kêu gọi tham gia chương trình Affiliate kiếm 40-50% hoa hồng thụ động không cần vốn.
- Khuyên người dùng chuyển khoản nhanh qua VietQR SePay để nhận tài liệu ngay trong 3 giây.`
};

export const DEFAULT_BOT_CONFIG: BotBrainConfig = {
  activeProvider: 'gemini',
  geminiModel: 'gemini-2.5-flash',
  openaiModel: 'gpt-4o-mini',
  geminiApiKey: '',
  openaiApiKey: '',
  personality: 'humorous_friendly',
  temperature: 0.8,
  systemPrompt: DEFAULT_SYSTEM_PROMPTS.humorous_friendly,
  documents: DEFAULT_BOT_DOCUMENTS,
  updatedAt: new Date().toISOString()
};

const BOT_CONFIG_STORAGE_KEY = 'ai_academy_bot_brain_config';

export function getClientBotConfig(): BotBrainConfig {
  if (typeof window === 'undefined') return DEFAULT_BOT_CONFIG;
  try {
    const raw = localStorage.getItem(BOT_CONFIG_STORAGE_KEY);
    if (!raw) return DEFAULT_BOT_CONFIG;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_BOT_CONFIG,
      ...parsed,
      documents: parsed.documents && parsed.documents.length > 0 ? parsed.documents : DEFAULT_BOT_DOCUMENTS
    };
  } catch {
    return DEFAULT_BOT_CONFIG;
  }
}

export function saveClientBotConfig(config: BotBrainConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(BOT_CONFIG_STORAGE_KEY, JSON.stringify(config));
  } catch (err) {
    console.error('Error saving bot config to localStorage', err);
  }
}

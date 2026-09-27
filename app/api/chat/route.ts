import { NextRequest, NextResponse } from 'next/server';
import { COURSES, FAQS, PRICING_PLANS } from '@/lib/data';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    const query = String(message || '').toLowerCase();

    let reply = '';
    let suggestedCourseSlug: string | undefined = undefined;

    // RAG Knowledge base matching
    if (query.includes('người mới') || query.includes('bắt đầu') || query.includes('chưa biết')) {
      reply = 'Đối với người mới bắt đầu tiếp cận AI, khóa học lý tưởng nhất là "Làm Chủ AI & ChatGPT Toàn Diện: Từ Zero Đến Hero". Khóa học sẽ hướng dẫn bạn từ tư duy Prompt chuẩn, tránh ảo tưởng của AI cho đến cách xử lý văn bản, tài liệu và tự động hóa công việc văn phòng nhanh gấp 10 lần!';
      suggestedCourseSlug = 'lam-chu-ai-chatgpt-toan-dien';
    } else if (query.includes('tạo ảnh') || query.includes('midjourney') || query.includes('flux') || query.includes('vẽ')) {
      reply = 'Bạn hãy tham khảo khóa học "Nghệ Thuật Tạo Ảnh AI Chuyên Nghiệp: Midjourney v6 & Flux". Bạn sẽ học cách kiểm soát hoàn toàn ánh sáng studio, góc camera, trang phục và tạo bộ nhận diện hình ảnh thương mại đồng nhất.';
      suggestedCourseSlug = 'tao-anh-ai-chuyen-nghiep-midjourney-flux';
    } else if (query.includes('n8n') || query.includes('make') || query.includes('tự động') || query.includes('agent')) {
      reply = 'Để tự động hóa hoàn toàn quy trình kinh doanh và chăm sóc khách hàng 24/7, khóa học "Tự Động Hóa Doanh Nghiệp Với Make.com & n8n AI Agents" là giải pháp toàn diện nhất, tặng kèm hơn 30 kịch bản Blueprint dùng ngay!';
      suggestedCourseSlug = 'tu-dong-hoa-doanh-nghiep-make-n8n';
    } else if (query.includes('code') || query.includes('lập trình') || query.includes('cursor')) {
      reply = 'Khóa học "Lập Trình Web & Ứng Dụng Với AI: Cursor & Claude 3.7" sẽ giúp bạn viết code nhanh gấp 5 lần và tự xây dựng sản phẩm web app hoàn chỉnh từ ý tưởng!';
      suggestedCourseSlug = 'lap-trinh-web-ai-cursor-claude';
    } else if (query.includes('sepay') || query.includes('thanh toán') || query.includes('vietqr') || query.includes('chuyển khoản')) {
      reply = 'Hệ thống thanh toán của AI Academy Pro kết nối trực tiếp với cổng SePay VietQR. Khi bạn quét mã QR và chuyển khoản chính xác nội dung, hệ thống sẽ xác nhận tự động trong 3 đến 5 giây và mở khóa bài học ngay lập tức mà không cần chờ duyệt thủ công!';
    } else if (query.includes('hoàn tiền') || query.includes('bảo hành') || query.includes('không hài lòng')) {
      reply = 'AI Academy Pro cam kết hoàn tiền 100% trong vòng 7 ngày nếu bạn cảm thấy khóa học không phù hợp và chưa học quá 25% thời lượng video. Quyền lợi học viên luôn được đặt lên hàng đầu!';
    } else if (query.includes('giá') || query.includes('học phí') || query.includes('bao nhiêu')) {
      reply = 'Các khóa học đơn lẻ hiện đang được ưu đãi giảm 50% chỉ từ 990.000₫ đến 1.890.000₫. Hoặc bạn có thể đăng ký gói thành viên PRO để mở khóa TOÀN BỘ hơn 50 khóa học và kho 1.200+ Prompt độc quyền!';
    } else {
      reply = 'Cảm ơn câu hỏi của bạn! Học viện AI Academy Pro luôn sẵn sàng đồng hành. Bạn có thể xem chi tiết các khóa học trên website hoặc bấm nút Chat Zalo bên dưới để trao đổi 1-1 trực tiếp cùng đội ngũ cố vấn nhé!';
      suggestedCourseSlug = 'lam-chu-ai-chatgpt-toan-dien';
    }

    return NextResponse.json({
      reply,
      suggestedCourseSlug
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

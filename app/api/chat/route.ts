// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { COURSES } from '@/lib/data';
import { BotBrainConfig, DEFAULT_BOT_CONFIG } from '@/lib/bot-brain';
import { getServerBotConfig } from '@/app/api/admin/bot-config/route';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = String(body.message || '').trim();
    if (!message) {
      return NextResponse.json({ error: 'Nội dung tin nhắn trống' }, { status: 400 });
    }

    // Resolve active bot config (priority: client-sent config -> server-persisted config -> default)
    const activeConfig: BotBrainConfig = body.botConfig || getServerBotConfig() || DEFAULT_BOT_CONFIG;
    const documents = activeConfig.documents && activeConfig.documents.length > 0 
      ? activeConfig.documents 
      : DEFAULT_BOT_CONFIG.documents;

    // Build consolidated training knowledge text
    const trainingKnowledge = documents
      .map((doc, idx) => `[TÀI LIỆU HUẤN LUYỆN ${idx + 1}: ${doc.name}]\n${doc.content}`)
      .join('\n\n');

    let reply = '';
    let suggestedCourseSlug: string | undefined = undefined;

    // Check if external Gemini API Key is configured
    const geminiKey = activeConfig.geminiApiKey || process.env.GEMINI_API_KEY;
    const openaiKey = activeConfig.openaiApiKey || process.env.OPENAI_API_KEY;

    if (activeConfig.activeProvider === 'gemini' && geminiKey) {
      try {
        const geminiModel = activeConfig.geminiModel || 'gemini-2.5-flash';
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${geminiKey}`;
        
        const payload = {
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `${activeConfig.systemPrompt}\n\nKHO TRI THỨC VÀ TÀI LIỆU ĐÃ HUẤN LUYỆN:\n${trainingKnowledge}\n\nCÂU HỎI CỦA KHÁCH HÀNG:\n${message}\n\nHãy trả lời bằng tiếng Việt thân thiện, hài hước, dí dỏm, sử dụng icon sinh động và căn cứ chính xác vào tài liệu huấn luyện trên.`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: activeConfig.temperature || 0.8,
            maxOutputTokens: 1000,
          }
        };

        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          const result = await res.json();
          reply = result.candidates?.[0]?.content?.parts?.[0]?.text || '';
        }
      } catch (geminiErr) {
        console.error('Gemini API call failed, falling back to local brain:', geminiErr);
      }
    } else if (activeConfig.activeProvider === 'openai' && openaiKey) {
      try {
        const url = 'https://api.openai.com/v1/chat/completions';
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openaiKey}`
          },
          body: JSON.stringify({
            model: activeConfig.openaiModel || 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: `${activeConfig.systemPrompt}\n\nKHO TRI THỨC VÀ TÀI LIỆU ĐÃ HUẤN LUYỆN:\n${trainingKnowledge}`
              },
              { role: 'user', content: message }
            ],
            temperature: activeConfig.temperature || 0.8
          })
        });

        if (res.ok) {
          const data = await res.json();
          reply = data.choices?.[0]?.message?.content || '';
        }
      } catch (openaiErr) {
        console.error('OpenAI API call failed, falling back to local brain:', openaiErr);
      }
    }

    // Local Intelligent Gemini-Emulated Brain (if no external API key, or if API call failed)
    if (!reply) {
      reply = generateHumorousGeminiResponse(message, trainingKnowledge, activeConfig.personality);
    }

    // Automatically detect course recommendations
    const lower = message.toLowerCase();
    if (lower.includes('người mới') || lower.includes('chatgpt') || lower.includes('bắt đầu')) {
      suggestedCourseSlug = 'lam-chu-ai-chatgpt-toan-dien';
    } else if (lower.includes('tạo ảnh') || lower.includes('midjourney') || lower.includes('flux')) {
      suggestedCourseSlug = 'tao-anh-ai-chuyen-nghiep-midjourney-flux';
    } else if (lower.includes('video') || lower.includes('triệu view') || lower.includes('runway') || lower.includes('kling')) {
      suggestedCourseSlug = 'san-xuat-video-ai-trieu-view-runway-kling';
    } else if (lower.includes('n8n') || lower.includes('make') || lower.includes('tự động')) {
      suggestedCourseSlug = 'tu-dong-hoa-doanh-nghiep-make-n8n';
    } else if (lower.includes('code') || lower.includes('cursor') || lower.includes('lập trình')) {
      suggestedCourseSlug = 'lap-trinh-web-ai-cursor-claude';
    }

    return NextResponse.json({
      reply,
      suggestedCourseSlug,
      brain: activeConfig.activeProvider,
      model: activeConfig.activeProvider === 'gemini' ? activeConfig.geminiModel : activeConfig.openaiModel
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Lỗi xử lý phản hồi từ Bot' },
      { status: 500 }
    );
  }
}

// Hàm giả lập bộ não Gemini thông minh, hài hước, thân thiện dựa trên tài liệu huấn luyện
function generateHumorousGeminiResponse(query: string, trainingDocs: string, personality: string): string {
  const q = query.toLowerCase();

  // 1. Chào hỏi vui vẻ
  if (q.includes('chào') || q.includes('hello') || q.includes('hi bot') || q.includes('ơi')) {
    return 'Dạ Phượng Hoàng Lửa xin chào bạn nè! ⚡ Bạn đang tìm khóa học AI đỉnh cao để nhân 10 năng suất, hay muốn kiếm hoa hồng khủng 50% cùng chương trình Affiliate vậy ta? Bật mí cho mình biết nhu cầu để em tư vấn "tới bến" luôn nhé! 😄🚀';
  }

  // 2. Hỏi về Affiliate / Kiếm tiền / Hoa hồng
  if (q.includes('affiliate') || q.includes('hoa hồng') || q.includes('kiếm tiền') || q.includes('đối tác') || q.includes('giới thiệu')) {
    return 'U là trời, bắt đúng sóng làm giàu rồi bạn ơi! 🔥 Chương trình Đối Tác Affiliate của Học Viện đang chi trả hoa hồng từ 35% đến tận 50% cho mỗi đơn hàng! Bạn chỉ cần vào mục "Affiliate" trên Menu, điền Họ tên + SĐT Zalo để nhận ngay Link và mã QR riêng. Khi có học viên đăng ký qua link của bạn, hoa hồng từ 274.000đ - 343.000đ/đơn sẽ tự động bắn về tài khoản hàng tuần! Nhớ quét mã vào Nhóm Zalo Đối Tác (https://zalo.me/g/apptijq8h3nfkdg5oaju) để lấy sẵn kho hình ảnh & video mẫu nhé! 💰🎉';
  }

  // 3. Hỏi về giá khóa học và skill AI
  if (q.includes('giá') || q.includes('bao nhiêu') || q.includes('học phí') || q.includes('chi phí') || q.includes('skill')) {
    return 'Tin vui chấn động luôn bạn ơi! 🎁 Toàn bộ Khóa học Video thực chiến của Học Viện đang được áp dụng mức giá ưu đãi đồng loạt chỉ 686.000 VNĐ / khóa (giá gốc 1.890.000 VNĐ đó nha). Còn kho 40+ Skill AI thương mại siêu hot thì đồng giá chỉ 68.000 VNĐ / Skill! Mua một lần sở hữu vĩnh viễn, học xong là làm được việc ngay. Giá "hạt dẻ" thế này mà không gom thì tiếc hùi hụi luôn á! ⚡🎯';
  }

  // 4. Hỏi về thanh toán / Techcombank / SePay / VietQR
  if (q.includes('thanh toán') || q.includes('chuyển khoản') || q.includes('vietqr') || q.includes('sepay') || q.includes('ngân hàng') || q.includes('stk')) {
    return 'Thanh toán ở AI Academy Pro thì nhanh như chớp mắt bạn nha! ⚡ Hệ thống tích hợp SePay VietQR tự động 24/7. Bạn chỉ cần quét mã QR hoặc chuyển khoản vào:\n🏦 Ngân hàng: Techcombank\n💳 STK: 6688991971\n👤 Chủ TK: PHAN THI HAI YEN\nNội dung chuyển khoản chính xác là hệ thống tự khớp đơn chỉ trong 3 đến 5 giây, mở khóa bài học ngay tức khắc mà không cần chờ ai duyệt thủ công cả! 😎✨';
  }

  // 5. Hỏi về Zalo / Chăm sóc / Hỗ trợ
  if (q.includes('zalo') || q.includes('chăm sóc') || q.includes('nhóm') || q.includes('hỗ trợ') || q.includes('tư vấn')) {
    return 'Dạ mời bạn gia nhập ngay "Nhóm Zalo Quà Tặng & Chăm Sóc VIP" tại link này nha: https://zalo.me/g/apptijq8h3nfkdg5oaju! Bạn có thể bấm vào biểu tượng Zalo tròn tròn góc phải màn hình để quét mã QR điện thoại siêu tiện lợi. Vào nhóm là có chuyên gia hướng dẫn 1-1 và tặng thêm kho Prompt xịn sò liền! 📲🌟';
  }

  // 6. Hỏi cho người mới bắt đầu học AI
  if (q.includes('người mới') || q.includes('bắt đầu') || q.includes('chưa biết gì') || q.includes('mới học')) {
    return 'Đừng lo bạn nha, ai cũng từng bắt đầu từ con số 0 mà! 🐣 Khóa "Làm Chủ AI & ChatGPT Toàn Diện: Từ Zero Đến Hero" (giá chỉ 686.000đ) sinh ra là dành riêng cho bạn. Khóa học chỉ dạy cầm tay chỉ việc, từ tư duy viết Prompt chuẩn không cần chỉnh, đến cách giao việc cho AI làm báo cáo, tóm tắt sách, dịch thuật tự động. Học xong là sếp khen nức nở vì năng suất tăng gấp 10 luôn! 😉🚀';
  }

  // 7. Tạo ảnh Midjourney, Flux
  if (q.includes('tạo ảnh') || q.includes('vẽ') || q.includes('midjourney') || q.includes('flux') || q.includes('hình ảnh')) {
    return 'Nếu bạn muốn tạo ảnh đẹp mê ly, ánh sáng studio chuẩn điện ảnh hay vẽ người mẫu KOL AI chân thực thì khóa "Nghệ Thuật Tạo Ảnh AI: Midjourney v6 & Flux" là chân ái! Bạn sẽ nắm trọn bí kíp tạo nhân vật đồng nhất trước sau như một, phục vụ bán hàng và quảng cáo cực đỉnh. Giá chỉ 686.000đ thôi nè! 🎨📸';
  }

  // 8. Tự động hóa n8n / Make
  if (q.includes('n8n') || q.includes('make') || q.includes('tự động hóa') || q.includes('workflow')) {
    return 'Bạn muốn làm ít mà hưởng nhiều? Khóa "Tự Động Hóa Doanh Nghiệp Với Make.com & n8n AI Agents" chính là trợ thủ đắc lực giúp bạn xây dựng đội ngũ trợ lý AI tự động đăng bài, tự động trả lời tin nhắn, lưu data khách vào Google Sheets 24/7 không cần nghỉ phép! Đang có giá 686.000đ tặng kèm hơn 30 kịch bản n8n Blueprint dùng ngay nha! 🤖⚙️';
  }

  // 9. Hỏi bảo hành, hoàn tiền
  if (q.includes('hoàn tiền') || q.includes('bảo hành') || q.includes('uy tín') || q.includes('lừa đảo')) {
    return 'Học viện cam kết uy tín 100% bằng chính sách hoàn tiền trong vòng 7 ngày! Nếu bạn vào học và cảm thấy không phù hợp (chưa xem quá 25% bài giảng), bạn sẽ được hoàn lại 100% học phí mà không bị làm khó dễ. Hotline quản lý: 0988739896 luôn sẵn sàng lắng nghe bạn! An tâm tuyệt đối nha bạn thân mến! 🛡️❤️';
  }

  // 10. Trêu đùa hoặc câu hỏi mở
  return `Haha câu hỏi của bạn thú vị ghê! 😄 Mình là Trợ lý AI Phượng Hoàng Lửa - luôn túc trực 24/7 để hỗ trợ bạn. Dựa trên tài liệu đào tạo của Học Viện, nếu bạn cần lộ trình học AI thực chiến, kho Skill 68k, đăng ký làm Affiliate kiếm hoa hồng tới 50%, hay cần quét mã vào nhóm Zalo chăm sóc (https://zalo.me/g/apptijq8h3nfkdg5oaju), cứ ới mình một tiếng là có mặt ngay nhé! ⚡🔥`;
}

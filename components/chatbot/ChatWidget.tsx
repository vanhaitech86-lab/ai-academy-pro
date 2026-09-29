'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  ArrowRight, 
  PhoneCall, 
  MessageSquare,
  HelpCircle
} from 'lucide-react';
import { COURSES } from '@/lib/data';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  suggestedCourseSlug?: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: 'Xin chào! Tôi là Trợ lý AI của Học viện AI Academy Pro ⚡. Tôi có thể hỗ trợ bạn chọn lộ trình học AI phù hợp nhất, hướng dẫn thanh toán tự động SePay hoặc giải đáp mọi thắc mắc 24/7.',
      timestamp: 'Vừa xong'
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Nên học khóa nào cho người mới?',
    'Cách thanh toán tự động qua SePay?',
    'Khóa Midjourney học xong làm được gì?',
    'Chính sách hoàn tiền 7 ngày thế nào?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'bot',
            text: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            suggestedCourseSlug: data.suggestedCourseSlug
          }
        ]);
      } else {
        fallbackReply(query);
      }
    } catch {
      fallbackReply(query);
    } finally {
      setIsTyping(false);
    }
  };

  const fallbackReply = (query: string) => {
    const lower = query.toLowerCase();
    let reply = 'Cảm ơn câu hỏi của bạn! Đội ngũ AI Academy Pro luôn sẵn sàng giải đáp.';
    let slug: string | undefined = undefined;

    if (lower.includes('người mới') || lower.includes('bắt đầu') || lower.includes('chưa biết')) {
      reply = 'Dành cho người mới bắt đầu, chúng tôi khuyên bạn nên học khóa "Làm Chủ AI & ChatGPT Toàn Diện: Từ Zero Đến Hero". Khóa học dạy cách tư duy prompt chuẩn quốc tế và ứng dụng thực tiễn ngay từ ngày đầu tiên!';
      slug = 'lam-chu-ai-chatgpt-toan-dien';
    } else if (lower.includes('midjourney') || lower.includes('ảnh') || lower.includes('flux')) {
      reply = 'Khóa học "Nghệ Thuật Tạo Ảnh AI Chuyên Nghiệp (Midjourney v6 & Flux)" sẽ giúp bạn tạo ảnh chân dung, concept art và ảnh thương mại sắc nét từng chi tiết.';
      slug = 'tao-anh-ai-chuyen-nghiep-midjourney-flux';
    } else if (lower.includes('sepay') || lower.includes('thanh toán') || lower.includes('chuyển khoản')) {
      reply = 'Hệ thống AI Academy Pro tích hợp cổng SePay VietQR tự động 100%. Bạn chỉ cần quét mã QR tại trang thanh toán, tiền vào tài khoản là khóa học tự động mở chỉ sau 3–5 giây mà không cần chụp màn hình chuyển khoản!';
    } else if (lower.includes('hoàn tiền') || lower.includes('bảo hành')) {
      reply = 'AI Academy Pro cam kết hoàn tiền 100% trong vòng 7 ngày nếu bạn không hài lòng về chất lượng khóa học và chưa học quá 25% thời lượng video.';
    } else {
      reply = 'Cảm ơn bạn đã nhắn tin. Đội ngũ HaiTech AI luôn sẵn sàng hỗ trợ bạn qua Hotline 0988739896 hoặc bạn có thể bấm nút Nhóm Zalo Chăm Sóc bên dưới nhé!';
      slug = 'lam-chu-ai-chatgpt-toan-dien';
    }

    setMessages((prev) => [
      ...prev,
      {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedCourseSlug: slug
      }
    ]);
  };

  return (
    <>
      {/* Floating Action Button with Pulse Effect */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 text-white shadow-2xl shadow-purple-500/50 hover:scale-105 active:scale-95 transition-all duration-300"
          aria-label="Mở Trợ lý AI"
        >
          {/* Subtle outer breathing ring */}
          <span className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-400 opacity-60 blur-md group-hover:opacity-100 animate-pulse" />
          
          <div className="relative flex items-center justify-center">
            {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-7 h-7 text-cyan-200" />}
          </div>

          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500 border-2 border-slate-900" />
            </span>
          )}
        </button>
      </div>

      {/* Chat Window Popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[92vw] sm:w-[400px] h-[580px] max-h-[80vh] rounded-3xl bg-slate-950/95 backdrop-blur-2xl border border-white/15 shadow-2xl flex flex-col z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-purple-900/60 via-slate-900 to-cyan-950/60 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center">
                <Bot className="w-5 h-5 text-cyan-300" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-950" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  AI Academy Bot
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </h3>
                <p className="text-[11px] text-cyan-300/80">Tư vấn khóa học & Hỗ trợ SePay 24/7</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages list */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => {
              const course = msg.suggestedCourseSlug
                ? COURSES.find((c) => c.slug === msg.suggestedCourseSlug)
                : null;

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-tr-none'
                        : 'bg-slate-900 border border-white/10 text-slate-200 rounded-tl-none shadow-md'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Optional Suggested Course Card */}
                  {course && (
                    <div className="mt-2 w-full max-w-[85%] p-3 rounded-xl bg-slate-900/90 border border-purple-500/30 flex items-center justify-between gap-3 shadow-lg">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-white truncate">{course.title}</p>
                        <p className="text-[11px] text-cyan-400 font-bold">
                          {new Intl.NumberFormat('vi-VN').format(course.salePrice)} ₫
                        </p>
                      </div>
                      <Link
                        href={`/khoa-hoc/${course.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="shrink-0 px-2.5 py-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-lg flex items-center gap-1 transition-colors"
                      >
                        <span>Xem</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  )}

                  <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-white/10 w-fit">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-4 py-2 bg-slate-900/50 border-t border-white/5 overflow-x-auto whitespace-nowrap flex gap-1.5">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1 rounded-full text-[11px] bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-cyan-300 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-slate-950 border-t border-white/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nhập câu hỏi của bạn..."
                className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 font-bold transition-all shadow-md shadow-cyan-500/30"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Human Hand-off Link */}
            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 px-1">
              <span className="flex items-center gap-1">
                <HelpCircle className="w-3 h-3 text-slate-500" />
                Cần người thật hỗ trợ?
              </span>
              <a
                href="https://zaloapp.com/qr/g/apptijq8h3nfkdg5oaju?src=qr"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <PhoneCall className="w-3 h-3" />
                Nhóm Zalo Chăm Sóc
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

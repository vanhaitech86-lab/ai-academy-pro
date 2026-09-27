'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send, Sparkles, CheckCircle2, Gift, ArrowRight } from 'lucide-react';

export default function CtaSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-purple-900/60 via-indigo-950/80 to-cyan-950/60 border border-white/15 p-8 sm:p-12 lg:p-16 text-center overflow-hidden shadow-2xl">
          {/* Subtle backdrop particles & glow */}
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-amber-300 uppercase tracking-widest mb-6">
              <Gift className="w-4 h-4 text-amber-400" />
              <span>Quà Tặng Khởi Đầu Miễn Phí</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Nhận Ngay Bộ <span className="gradient-text-neon">100+ Prompt AI</span> Tuyển Chọn Trị Giá 500.000₫
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Nhập email để tải xuống trọn bộ tài liệu: Prompt bán hàng, câu lệnh tối ưu quy trình làm việc và cẩm nang tránh các lỗi phổ biến khi dùng ChatGPT.
            </p>

            {submitted ? (
              <div className="mt-8 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-semibold inline-flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Chúc mừng bạn! Link tải kho tài liệu đã được gửi đến email của bạn.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập địa chỉ email của bạn..."
                  className="flex-1 px-5 py-3.5 rounded-2xl bg-slate-900/90 border border-white/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-95 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/30 transition-all shrink-0"
                >
                  <span>Tải miễn phí ngay</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/qua-tang"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs sm:text-sm font-bold transition-all shadow-lg"
              >
                <Gift className="w-4 h-4 text-amber-400" />
                <span>Xem Toàn Bộ Kho Quà Tặng & Ebook Miễn Phí</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <p className="mt-4 text-xs text-slate-400">
              Cam kết bảo mật 100%. Không spam, bạn có thể hủy đăng ký bất cứ lúc nào.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

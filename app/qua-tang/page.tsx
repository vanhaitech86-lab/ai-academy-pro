'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FREE_GIFTS, FreeGift } from '@/lib/data';
import { useAuth } from '@/lib/auth-context';
import confetti from 'canvas-confetti';
import { 
  Gift, 
  Download, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  X, 
  Mail, 
  User, 
  ExternalLink,
  BookOpen,
  Filter
} from 'lucide-react';

export default function FreeGiftsPage() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [claimingGift, setClaimingGift] = useState<FreeGift | null>(null);
  const [claimEmail, setClaimEmail] = useState(user?.email || '');
  const [claimName, setClaimName] = useState(user?.name || '');
  const [claimSuccess, setClaimSuccess] = useState(false);

  const categories = ['Tất cả', 'Ebook', 'Prompt Pack', 'Workflow', 'Custom GPT', 'Cheatsheet'];

  const filteredGifts = selectedCategory === 'Tất cả'
    ? FREE_GIFTS
    : FREE_GIFTS.filter((g) => g.category === selectedCategory);

  const handleOpenClaim = (gift: FreeGift) => {
    setClaimingGift(gift);
    setClaimSuccess(false);
    if (user) {
      setClaimEmail(user.email);
      setClaimName(user.name);
    }
  };

  const handleSubmitClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimEmail) return;

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });

    setClaimSuccess(true);
  };

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-pink-500/20 border border-amber-500/30 text-xs font-bold text-amber-300 uppercase tracking-widest mb-4 shadow-[0_0_20px_-5px_rgba(245,158,11,0.4)]">
          <Gift className="w-4 h-4 text-amber-400 animate-bounce" />
          <span>Quà Tặng Độc Quyền Miễn Phí 100%</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Kho Tài Nguyên, Prompt & <br />
          <span className="gradient-text-neon">Ebook AI Miễn Phí</span>
        </h1>

        <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
          Được biên soạn và tinh chỉnh bởi các chuyên gia hàng đầu tại AI Academy Pro. Tải về và ứng dụng ngay để nâng cao năng suất công việc gấp nhiều lần hoàn toàn miễn phí.
        </p>

        {/* Category Filters */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gifts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGifts.map((gift) => (
          <div
            key={gift.id}
            className="group relative rounded-3xl bg-slate-900/80 border border-white/10 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-amber-500/40 hover:shadow-[0_10px_30px_-10px_rgba(245,158,11,0.25)] hover:-translate-y-2"
          >
            {/* Thumbnail */}
            <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden">
              <img
                src={gift.thumbnail}
                alt={gift.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              {gift.badge && (
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/90 text-slate-950 shadow-md">
                  {gift.badge}
                </span>
              )}

              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-black/60 backdrop-blur-md text-cyan-300 border border-white/10">
                {gift.category}
              </span>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-slate-300">
                <span className="flex items-center gap-1 font-semibold text-white">
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  {gift.format}
                </span>
                <span className="text-amber-400 font-bold">
                  {gift.downloads.toLocaleString('vi-VN')} lượt tải
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[11px] text-slate-500 block">Tác giả: {gift.author}</span>
                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 mt-1 leading-snug">
                  {gift.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed">
                  {gift.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                  100% Miễn phí
                </span>

                <button
                  onClick={() => handleOpenClaim(gift)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-95 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/30 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải miễn phí</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Claim Modal */}
      {claimingGift && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-slate-950 rounded-3xl border border-white/20 p-6 sm:p-8 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Background lighting */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <button
              onClick={() => setClaimingGift(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!claimSuccess ? (
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Gift className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-400 uppercase">Tài nguyên miễn phí</span>
                    <h3 className="text-base font-bold text-white line-clamp-1">{claimingGift.title}</h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300">
                  Nhập thông tin bên dưới để nhận đường link truy cập và tải file tài liệu <strong className="text-white">({claimingGift.format})</strong> trực tiếp về máy.
                </p>

                <form onSubmit={handleSubmitClaim} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1.5">Họ và tên của bạn</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={claimName}
                        onChange={(e) => setClaimName(e.target.value)}
                        placeholder="Ví dụ: Nguyễn Văn An"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1.5">Địa chỉ email nhận tài liệu</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={claimEmail}
                        onChange={(e) => setClaimEmail(e.target.value)}
                        placeholder="email.cua.ban@gmail.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 hover:scale-[1.01] transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Mở Khóa & Tải Tài Liệu Ngay</span>
                  </button>
                </form>

                <p className="text-[11px] text-slate-500 text-center">
                  Cam kết bảo mật 100%. Không spam, hỗ trợ giải đáp kỹ thuật qua email.
                </p>
              </div>
            ) : (
              <div className="text-center space-y-5 py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="text-xl font-bold text-white">Mở Khóa Thành Công!</h3>

                <p className="text-xs sm:text-sm text-slate-300">
                  Tài liệu <strong className="text-amber-300">"{claimingGift.title}"</strong> đã sẵn sàng. Bản sao tài liệu cũng đã được gửi về hòm thư <strong className="text-cyan-300">{claimEmail}</strong>.
                </p>

                <div className="space-y-3 pt-2">
                  <a
                    href="https://drive.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30"
                  >
                    <Download className="w-4 h-4" />
                    <span>Tải File / Mở Notion Template Ngay</span>
                  </a>

                  <button
                    onClick={() => setClaimingGift(null)}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold"
                  >
                    Đóng cửa sổ
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

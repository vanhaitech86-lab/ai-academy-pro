'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SKILLS } from '@/lib/data';
import { useCart } from '@/lib/cart-context';
import { 
  Wand2, 
  ArrowRight, 
  Crown, 
  Zap, 
  Briefcase, 
  Check, 
  ShoppingCart, 
  Camera
} from 'lucide-react';

export default function SkillCarousel() {
  const { addToCart } = useCart();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'all' | 'hall-1' | 'hall-2' | 'hall-5'>('all');
  const [showPurchasedModal, setShowPurchasedModal] = useState<string | null>(null);

  const handleBuyNow = (skill: (typeof SKILLS)[0]) => {
    addToCart(skill);
    router.push('/gio-hang');
  };

  const hall1Skills = SKILLS.filter((s) => s.hall?.includes('Sảnh I'));
  const hall2Skills = SKILLS.filter((s) => s.hall?.includes('Sảnh II'));
  const hall5Skills = SKILLS.filter((s) => s.hall?.includes('Sảnh V'));

  const renderSkillCard = (skill: (typeof SKILLS)[0]) => (
    <div key={skill.id} className="stage-3d w-[240px] sm:w-[250px] shrink-0 snap-start">
      <article className="layer-3d group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/90 shadow-card hover:shadow-brand hover:border-pink-500/40 transition-all duration-300">
        {/* Thumbnail Box */}
        <div className="relative aspect-[3/4] overflow-hidden bg-slate-950">
          <img
            src={skill.thumbnail}
            alt={skill.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            loading="lazy"
          />
          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

          {/* Top-left Badge */}
          <span className="absolute left-2.5 top-2.5 rounded-full bg-slate-950/80 px-2.5 py-0.5 text-[10px] font-semibold text-slate-200 border border-white/10 backdrop-blur-md">
            {skill.badge || 'Dán vào AI'}
          </span>

          {/* Top-right Price Badge */}
          <span className="absolute right-2.5 top-2.5 rounded-full px-2.5 py-0.5 text-[11px] font-black bg-brand-gradient text-white shadow-brand">
            68k
          </span>

          {/* Title Overlay */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-3 pb-3 pt-10">
            <h3 className="line-clamp-2 font-display text-sm sm:text-base font-bold leading-snug text-white drop-shadow-md">
              {skill.title}
            </h3>
          </div>

          <Link
            href={`/skill-ai/${skill.slug}`}
            className="absolute inset-0 z-10 rounded-t-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-500"
            aria-label={`Xem chi tiết ${skill.title}`}
          />
        </div>

        {/* Content Box */}
        <div className="flex flex-1 flex-col gap-2 p-3 sm:p-3.5">
          <p className="line-clamp-3 min-h-[3.2rem] text-[11px] leading-relaxed text-slate-400">
            {skill.shortDesc}
          </p>

          <div className="-my-1 flex min-h-7 items-center justify-between gap-1 text-[11px] text-slate-400">
            <span className="truncate text-slate-500">Nền tảng mã nguồn mở uy tín</span>
            <span className="shrink-0 font-semibold text-amber-400">{skill.stars || '100k★'}</span>
          </div>

          {/* Buy Button */}
          <button
            onClick={() => handleBuyNow(skill)}
            className="mt-auto w-full rounded-full bg-brand-gradient px-3 py-2 text-xs font-bold leading-tight text-white shadow-brand transition hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>🛒 Mua · 68.000 ₫</span>
            <span className="block text-[10px] font-normal opacity-90">Tiết kiệm 50%</span>
          </button>

          {/* Detail Link */}
          <Link
            href={`/skill-ai/${skill.slug}`}
            className="block w-full rounded-full border border-white/10 bg-white/5 py-1.5 text-center text-xs font-semibold text-slate-300 transition hover:border-pink-500/50 hover:bg-white/10 hover:text-white"
          >
            Xem chi tiết
          </Link>

          {/* Already bought */}
          <button
            onClick={() => setShowPurchasedModal(skill.title)}
            className="-my-1 inline-flex min-h-6 items-center justify-center text-[11px] text-slate-500 underline-offset-2 transition hover:text-pink-400 hover:underline"
          >
            Đã mua rồi?
          </button>
        </div>
      </article>
    </div>
  );

  return (
    <section className="relative overflow-hidden py-20 bg-[#0f1b33]/40" id="kho-skill">
      {/* Aurora Ambient Background Blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-60">
        <div className="absolute -left-[10%] -top-[10%] h-[38rem] w-[38rem] rounded-full bg-pink-600/20 blur-[130px] animate-pulse-glow" />
        <div className="absolute -right-[10%] top-[20%] h-[35rem] w-[35rem] rounded-full bg-purple-600/20 blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[25%] h-[36rem] w-[36rem] rounded-full bg-rose-600/15 blur-[130px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Tag Pill */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-pink-300 backdrop-blur-md">
            <span className="h-2 w-2 animate-pulse rounded-full bg-pink-400" />
            Sàn giao dịch Skill · 5 Sảnh · 40 Skill · Đồng giá 68.000 ₫ / Skill
          </span>

          <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-white">
            Thế giới <em className="text-gradient not-italic">Skill bán hàng</em> chuyên nghiệp.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
            Mỗi Skill là một <strong>câu lệnh soạn sẵn</strong> — dán vào ChatGPT hoặc Gemini bạn đang có, kèm ảnh của bạn, là ra thứ đăng bán được ngay.{' '}
            <strong className="text-amber-300">Không cài gì, làm được cả trên điện thoại.</strong>
          </p>
        </div>

        {/* Spotlight Showcase Banner with User's Uploaded KOL */}
        <div className="mt-12 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-purple-950/40 to-slate-900/90 p-5 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-pink-500/15 rounded-full blur-[90px] pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left: KOL Image with studio graphics */}
            <div className="md:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border-2 border-pink-500/30 shadow-[0_10px_35px_-10px_rgba(244,63,94,0.4)] aspect-[4/4]">
                <img
                  src="/images/kol-ai.jpg"
                  alt="HAITECH AI - KOL AI"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Studio Live Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-bold text-white">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span className="text-red-400">● LIVE</span>
                  <span className="text-slate-400">|</span>
                  <span className="text-slate-200">4K 60FPS</span>
                </div>

                {/* Brand Badge on image */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-xs">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-amber-300" />
                    <span className="font-bold text-white">HAITECH AI · KOL AI STUDIO</span>
                  </div>
                  <span className="text-[10px] font-extrabold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full">
                    KOL AI GO GLOBAL
                  </span>
                </div>
              </div>
            </div>

            {/* Right: KOL Skill System Intro */}
            <div className="md:col-span-7 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-300 w-fit mb-3">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>Mô Hình Đại Sứ Số & Xây Kênh Triệu View</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Tự làm ảnh, video TVC & giọng đọc bán hàng chuẩn KOL chuyên nghiệp
              </h3>

              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Không cần thuê người mẫu đắt đỏ hay ekip dựng phim phức tạp. Bộ câu lệnh và kịch bản thực chiến được đúc kết từ hệ thống <strong className="text-white">KOL AI hàng đầu</strong>, giúp bạn tự tạo dựng hình ảnh thương hiệu cá nhân nhất quán, cắt dựng clip tự động và bùng nổ doanh số.
              </p>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-lg font-black text-amber-300">40+ Skill</div>
                  <div className="text-[11px] text-slate-400">Đóng gói sẵn dùng ngay</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-lg font-black text-pink-400">100% Tiếng Việt</div>
                  <div className="text-[11px] text-slate-400">Dễ hiểu cho người mới</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 col-span-2 sm:col-span-1">
                  <div className="text-lg font-black text-cyan-400">68.000 ₫</div>
                  <div className="text-[11px] text-slate-400">Đồng giá mỗi Skill</div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/skill-ai"
                  className="px-6 py-3 rounded-full bg-brand-gradient text-white text-xs font-bold shadow-brand transition hover:opacity-95 hover:scale-105 flex items-center gap-2"
                >
                  <span>Khám phá toàn bộ 40 Skill</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href="https://zalo.me/g/apptijq8h3nfkdg5oaju"
                  onClick={(e) => {
                    e.preventDefault();
                    window.dispatchEvent(new CustomEvent('open-zalo-modal'));
                  }}
                  className="px-5 py-3 rounded-full border border-blue-400/40 bg-blue-600/20 hover:bg-blue-600/30 text-white text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Nhóm Zalo Chăm Sóc VIP</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Hall Filter Tabs */}
        <div className="mt-14 flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-brand-gradient text-white shadow-brand'
                : 'bg-slate-900 border border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            Tất cả các Sảnh (24 Skill)
          </button>
          <button
            onClick={() => setActiveTab('hall-1')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'hall-1'
                ? 'bg-brand-gradient text-white shadow-brand'
                : 'bg-slate-900 border border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            Sảnh I · Hình ảnh thương hiệu
          </button>
          <button
            onClick={() => setActiveTab('hall-2')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'hall-2'
                ? 'bg-brand-gradient text-white shadow-brand'
                : 'bg-slate-900 border border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            Sảnh II · Edit video bán hàng
          </button>
          <button
            onClick={() => setActiveTab('hall-5')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'hall-5'
                ? 'bg-brand-gradient text-white shadow-brand'
                : 'bg-slate-900 border border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            Sảnh V · VIP Video & Đa Kênh
          </button>
        </div>

        {/* Sections for Halls */}
        <div className="mt-10 space-y-16">
          {/* SẢNH I */}
          {(activeTab === 'all' || activeTab === 'hall-1') && (
            <div id="gian-1">
              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-pink-400">Skill Hall</p>
                  <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">
                    Sảnh I · Skill Hình Ảnh Thương Hiệu Cá Nhân
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-400">
                    Tám việc làm ảnh hay phải thuê người khác — giờ tự làm, ngay trên máy hoặc ngay trong AI bạn đang dùng
                  </p>
                </div>
                <Link
                  href="/skill-ai"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-400 hover:text-pink-300 transition whitespace-nowrap"
                >
                  <span>Xem cả 8 Skill</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Horizontal Scrollable Carousel */}
              <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-800 [&::-webkit-scrollbar-thumb:hover]:bg-pink-500/50 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-slate-900">
                {hall1Skills.map(renderSkillCard)}
              </div>
            </div>
          )}

          {/* SẢNH II */}
          {(activeTab === 'all' || activeTab === 'hall-2') && (
            <div id="gian-2">
              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-pink-400">Skill Hall</p>
                  <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">
                    Sảnh II · Skill Edit Video Bán Hàng
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-400">
                    8 kiểu edit dựng sẵn — đưa video vào, AI tự cắt, tự dựng, tự xuất file hoàn chỉnh
                  </p>
                </div>
                <Link
                  href="/skill-ai"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-400 hover:text-pink-300 transition whitespace-nowrap"
                >
                  <span>Xem cả 8 Skill</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-800 [&::-webkit-scrollbar-thumb:hover]:bg-pink-500/50 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-slate-900">
                {hall2Skills.map(renderSkillCard)}
              </div>
            </div>
          )}

          {/* SẢNH V */}
          {(activeTab === 'all' || activeTab === 'hall-5') && (
            <div id="gian-3">
              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-pink-400">Skill Hall</p>
                  <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">
                    Sảnh V · Skill VIP Video &amp; Đa Kênh
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-400">
                    Tám Skill nâng cao cho video và kênh nội dung — từ edit, SEO YouTube đến tự động hoá đăng đa kênh
                  </p>
                </div>
                <Link
                  href="/skill-ai"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-400 hover:text-pink-300 transition whitespace-nowrap"
                >
                  <span>Xem cả 8 Skill</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-800 [&::-webkit-scrollbar-thumb:hover]:bg-pink-500/50 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-slate-900">
                {hall5Skills.map(renderSkillCard)}
              </div>
            </div>
          )}
        </div>

        {/* 3 Value Pillars from theskill */}
        <div className="mt-20 grid gap-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-md sm:grid-cols-3 sm:p-10 shadow-card">
          <div className="flex flex-col">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-brand">
              <Crown className="h-6 w-6" />
            </div>
            <h4 className="text-xl font-bold text-white">Đẳng cấp KOL</h4>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
              Skill Pack được đúc kết từ hệ thống KOL AI Go Global, tối ưu thẩm mỹ và sức hút thương mại quốc tế.
            </p>
          </div>

          <div className="flex flex-col">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-brand">
              <Zap className="h-6 w-6" />
            </div>
            <h4 className="text-xl font-bold text-white">Nhận hàng ngay</h4>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
              Chuyển khoản VietQR xong là hệ thống tự động mở link tải trong 3 giây — không cần chờ ai duyệt bằng tay.
            </p>
          </div>

          <div className="flex flex-col">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-brand">
              <Briefcase className="h-6 w-6" />
            </div>
            <h4 className="text-xl font-bold text-white">Dùng cho công việc</h4>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
              Sản phẩm bạn làm ra hoàn toàn thuộc về bạn — tự do sử dụng cho bài đăng, chạy quảng cáo và affiliate marketing.
            </p>
          </div>
        </div>

        {/* 3 Combo Packages (Gói trọn) */}
        <div className="mt-20" id="goi-tron">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-pink-400">Gói Tiết Kiệm</p>
            <h3 className="mt-2 text-3xl font-extrabold text-white">Combo Tiết Kiệm Tối Đa</h3>
            <p className="mt-2 text-sm text-slate-400">Lựa chọn giải pháp trọn gói để tối ưu chi phí và tăng tốc hiệu quả</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Combo 1 */}
            <div className="flex flex-col rounded-3xl border-2 border-pink-500 bg-slate-900/90 p-7 text-left shadow-brand transition hover:-translate-y-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-pink-400">Đáng mua nhất</p>
              <h4 className="mt-2 font-display text-2xl font-bold text-white">Combo 10 Skill tự chọn</h4>
              
              <div className="mt-4 flex items-end gap-3">
                <span className="font-display text-4xl font-extrabold text-white">$39</span>
                <span className="pb-1.5 text-xs font-medium text-slate-400">1.053.000 ₫</span>
              </div>

              <div className="mt-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-slate-500 line-through">$50</span>
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-bold bg-pink-500 text-white">−22%</span>
                  <span className="text-slate-400">giá trị lẻ</span>
                </div>
                <p className="text-xs font-semibold text-pink-400">Tiết kiệm $11</p>
              </div>

              <p className="mt-2 text-xs text-slate-400">Còn $3.90 mỗi Skill — rẻ hơn $11 so với mua lẻ</p>

              <ul className="mt-6 flex-1 space-y-2.5 text-xs text-slate-300">
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                  <span>Chọn bất kỳ 10 Skill trong các sảnh</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                  <span>Câu lệnh làm việc cho AI, kèm cách gỡ lỗi hay gặp</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                  <span>Chỉ còn $3.90 mỗi Skill thay vì $5</span>
                </li>
              </ul>

              <Link
                href="/skill-ai"
                className="mt-6 block w-full rounded-full bg-brand-gradient py-3 text-center text-xs font-bold text-white shadow-brand transition hover:opacity-95 hover:scale-[1.02]"
              >
                Chọn combo 10 Skill →
              </Link>
            </div>

            {/* Combo 2 */}
            <div className="flex flex-col rounded-3xl border border-white/10 bg-slate-900/80 p-7 text-left shadow-card transition hover:-translate-y-1 hover:border-pink-500/30">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-pink-400/80">Combo · Không bán lẻ</p>
              <h4 className="mt-2 font-display text-2xl font-bold text-white">Combo Mật Mã · 6 sản phẩm</h4>

              <div className="mt-4 flex items-end gap-3">
                <span className="font-display text-4xl font-extrabold text-white">$50</span>
                <span className="pb-1.5 text-xs font-medium text-slate-400">1.350.000 ₫</span>
              </div>

              <div className="mt-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-slate-500 line-through">$100</span>
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-bold bg-pink-500 text-white">−50%</span>
                  <span className="text-slate-400">giá trị lẻ</span>
                </div>
                <p className="text-xs font-semibold text-pink-400">Tiết kiệm $50</p>
              </div>

              {/* 6 Grid Icons / Thumbnails */}
              <div className="mt-5 grid grid-cols-6 gap-1.5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="relative aspect-[3/4] overflow-hidden rounded-lg border border-white/20 bg-slate-950">
                    <img
                      src="/images/kol-ai.jpg"
                      alt={`Mật mã ${i}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <ul className="mt-6 flex-1 space-y-2.5 text-xs text-slate-300">
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                  <span>Trọn bộ 5 Skill Affiliate Marketing x AI ở Sảnh V</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                  <span>6 sản phẩm độc quyền, không tách lẻ</span>
                </li>
              </ul>

              <Link
                href="/skill-ai"
                className="mt-6 block w-full rounded-full bg-brand-gradient py-3 text-center text-xs font-bold text-white shadow-brand transition hover:opacity-95 hover:scale-[1.02]"
              >
                Xem combo 6 sản phẩm →
              </Link>
            </div>

            {/* Combo 3: KOL AI SYSTEM */}
            <div
              className="flex flex-col rounded-3xl border border-white/20 p-7 text-white shadow-2xl relative overflow-hidden transition hover:-translate-y-1"
              style={{
                background: 'linear-gradient(160deg, #4a044e 0%, #2e0854 70%, #170326 100%)',
              }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-300">
                Gói lớn nhất · Tiết kiệm nhiều nhất
              </p>
              <h4 className="mt-2 font-display text-2xl font-black text-white">KOL AI SYSTEM</h4>

              <div className="mt-4 flex items-end gap-3">
                <span className="font-display text-4xl font-extrabold text-white">$145</span>
                <span className="pb-1.5 text-xs font-medium text-amber-200/80">3.868.000 ₫</span>
              </div>

              <div className="mt-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-white/50 line-through">$326</span>
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-bold bg-amber-300 text-black">−55%</span>
                  <span className="text-white/50">giá trị lẻ</span>
                </div>
                <p className="text-xs font-semibold text-amber-300">Tiết kiệm $181</p>
              </div>

              <ul className="mt-6 flex-1 space-y-2.5 text-xs text-white/90">
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                  <span>Toàn bộ 40 Skill trong sàn, gồm cả Skill ra mắt sau này</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                  <span>Trọn bộ Combo Mật Mã 6 sản phẩm</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                  <span>Sách Mật Mã Tự Do bản đầy đủ</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                  <span>Đồng hành phát triển 1 năm cùng KOL AI SYSTEM</span>
                </li>
              </ul>

              <a
                href="https://zalo.me/g/apptijq8h3nfkdg5oaju"
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent('open-zalo-modal'));
                }}
                className="mt-6 block w-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 py-3 text-center text-xs font-extrabold text-white shadow-lg transition hover:scale-[1.02] cursor-pointer"
              >
                Tham gia Nhóm Zalo Chăm Sóc & Tư Vấn →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: "Đã mua rồi?" */}
      {showPurchasedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-blue-500/30 bg-slate-900 p-6 shadow-2xl text-center">
            <h4 className="text-lg font-bold text-white">Tra cứu & Kích hoạt Skill</h4>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              Bạn đã mua <strong>{showPurchasedModal}</strong>? Quét mã Zalo dưới đây để tham gia nhóm chăm sóc nhận link tải file hoặc đăng nhập tài khoản học viên:
            </p>

            {/* QR Code */}
            <div className="my-4 p-3 bg-white rounded-2xl shadow-xl inline-block border-2 border-blue-400">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent('https://zalo.me/g/apptijq8h3nfkdg5oaju')}`}
                alt="Mã QR Nhóm Zalo Quà Tặng Skill - Tool AI"
                className="w-48 h-auto rounded-xl object-contain mx-auto"
              />
              <span className="block mt-1 text-[11px] font-bold text-slate-800">
                Nhóm Quà Tặng Skill - Tool AI
              </span>
            </div>

            <div className="mt-2 space-y-2">
              <a
                href="https://zalo.me/g/apptijq8h3nfkdg5oaju"
                target="_blank"
                rel="noreferrer"
                className="block w-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 py-2.5 text-center text-xs font-bold text-white shadow-lg hover:opacity-95"
              >
                Vào Nhóm Zalo Hỗ Trợ 1-1 Ngay
              </a>
              <Link
                href="/dang-nhap"
                className="block w-full rounded-full bg-brand-gradient py-2.5 text-center text-xs font-bold text-white shadow-brand"
              >
                Đăng nhập tài khoản học viên
              </Link>
              <button
                onClick={() => setShowPurchasedModal(null)}
                className="block w-full py-2 text-center text-xs text-slate-400 hover:text-slate-300"
              >
                Đóng cửa sổ
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

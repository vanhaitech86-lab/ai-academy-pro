'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SKILLS } from '@/lib/data';
import { useCart } from '@/lib/cart-context';
import { 
  Wand2, 
  Search, 
  Crown, 
  Zap, 
  Briefcase, 
  Check, 
  ShoppingCart, 
  Camera,
  ChevronDown
} from 'lucide-react';

export default function SkillAiPage() {
  const { addToCart, cart } = useCart();
  const router = useRouter();
  const [filter, setFilter] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPurchasedModal, setShowPurchasedModal] = useState<string | null>(null);

  const categories = [
    'Tất cả',
    'Sảnh I · Hình ảnh thương hiệu',
    'Sảnh II · Edit video bán hàng',
    'Sảnh V · VIP Video & Đa Kênh',
  ];

  const filtered = SKILLS.filter((skill) => {
    const matchCategory =
      filter === 'Tất cả' ||
      (filter === 'Sảnh I · Hình ảnh thương hiệu' && skill.hall?.includes('Sảnh I')) ||
      (filter === 'Sảnh II · Edit video bán hàng' && skill.hall?.includes('Sảnh II')) ||
      (filter === 'Sảnh V · VIP Video & Đa Kênh' && skill.hall?.includes('Sảnh V'));

    const matchSearch =
      !searchQuery.trim() ||
      skill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  const handleBuyNow = (skill: (typeof SKILLS)[0]) => {
    addToCart(skill);
    router.push('/gio-hang');
  };

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Ambient background glows */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden opacity-50">
        <div className="absolute -left-[10%] -top-[10%] h-[38rem] w-[38rem] rounded-full bg-pink-600/20 blur-[130px]" />
        <div className="absolute -right-[10%] top-[20%] h-[35rem] w-[35rem] rounded-full bg-purple-600/20 blur-[140px]" />
      </div>

      {/* Header section matching theskill */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-pink-300 backdrop-blur-md mb-4">
          <span className="h-2 w-2 animate-pulse rounded-full bg-pink-400" />
          Sàn giao dịch Skill · 5 Sảnh · 40 Skill · Đồng giá 68.000 ₫ / Skill
        </span>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
          Thế giới <em className="text-gradient not-italic">Skill bán hàng</em> chuyên nghiệp.
        </h1>

        <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
          Mỗi Skill là một <strong>câu lệnh soạn sẵn</strong> — dán vào ChatGPT hoặc Gemini bạn đang có, kèm ảnh của bạn, là ra thứ đăng bán được ngay.{' '}
          <strong className="text-amber-300">Không cài gì, làm được cả trên điện thoại.</strong>
        </p>

        {/* Search bar */}
        <div className="mt-8 max-w-xl mx-auto relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm Skill (ví dụ: poster, xóa phông, edit video, subagent...)"
            className="w-full pl-12 pr-4 py-3 rounded-full bg-slate-900/90 border border-white/15 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 shadow-xl"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>

        {/* Filter categories */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                filter === c
                  ? 'bg-brand-gradient text-white shadow-brand'
                  : 'bg-slate-900 border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Spotlight Showcase Banner with User's Uploaded KOL */}
      <div className="mb-16 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-purple-950/40 to-slate-900/90 p-5 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-pink-500/30 shadow-[0_10px_35px_-10px_rgba(244,63,94,0.4)] aspect-[4/4]">
              <img
                src="/images/kol-ai.jpg"
                alt="HAITECH AI - KOL AI"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-bold text-white">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="text-red-400">● LIVE</span>
                <span className="text-slate-400">|</span>
                <span className="text-slate-200">4K 60FPS</span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-xs">
                <div className="flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-amber-300" />
                  <span className="font-bold text-white text-[11px]">HAITECH AI · KOL AI</span>
                </div>
                <span className="text-[10px] font-extrabold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full">
                  68.000 ₫ / SKILL
                </span>
              </div>
            </div>
          </div>

          <div className="md:col-span-8 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-300 w-fit mb-3">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>Đẳng Cấp KOL AI Bán Hàng</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Kho câu lệnh và kịch bản AI biến bất kỳ ai thành KOL bán hàng chuyên nghiệp
            </h2>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              Dán câu lệnh vào ChatGPT hoặc Gemini kèm ảnh sản phẩm/chân dung của bạn — ra ngay bộ ảnh poster, video ngắn TikTok và giọng đọc cuốn hút. Không cần cài cắm phần mềm hay thiết bị đắt tiền.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href="#goi-tron"
                className="px-5 py-2.5 rounded-full bg-brand-gradient text-white text-xs font-bold shadow-brand transition hover:opacity-95"
              >
                Xem các gói Combo tiết kiệm →
              </a>
              <a
                href="https://zaloapp.com/qr/g/apptijq8h3nfkdg5oaju?src=qr"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full border border-blue-400/40 bg-blue-600/20 hover:bg-blue-600/30 text-white text-xs font-semibold transition"
              >
                Nhóm Zalo Chăm Sóc VIP →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of skills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((skill) => (
          <div key={skill.id} className="stage-3d">
            <article className="layer-3d group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/90 shadow-card hover:shadow-brand hover:border-pink-500/40 transition-all duration-300">
              {/* Thumbnail Box */}
              <div className="relative aspect-[3/4] overflow-hidden bg-slate-950">
                <img
                  src={skill.thumbnail}
                  alt={skill.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                <span className="absolute left-2.5 top-2.5 rounded-full bg-slate-950/80 px-2.5 py-0.5 text-[10px] font-semibold text-slate-200 border border-white/10 backdrop-blur-md">
                  {skill.badge || 'Dán vào AI'}
                </span>

                <span className="absolute right-2.5 top-2.5 rounded-full px-2.5 py-0.5 text-[11px] font-black bg-brand-gradient text-white shadow-brand">
                  68k
                </span>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-3.5 pb-3 pt-10">
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

                <button
                  onClick={() => handleBuyNow(skill)}
                  className="mt-auto w-full rounded-full bg-brand-gradient px-3 py-2 text-xs font-bold leading-tight text-white shadow-brand transition hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>🛒 Mua · 68.000 ₫</span>
                  <span className="block text-[10px] font-normal opacity-90">Tiết kiệm 50%</span>
                </button>

                <Link
                  href={`/skill-ai/${skill.slug}`}
                  className="block w-full rounded-full border border-white/10 bg-white/5 py-1.5 text-center text-xs font-semibold text-slate-300 transition hover:border-pink-500/50 hover:bg-white/10 hover:text-white"
                >
                  Xem chi tiết
                </Link>

                <button
                  onClick={() => setShowPurchasedModal(skill.title)}
                  className="-my-1 inline-flex min-h-6 items-center justify-center text-[11px] text-slate-500 underline-offset-2 transition hover:text-pink-400 hover:underline"
                >
                  Đã mua rồi?
                </button>
              </div>
            </article>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-slate-400">
          <p className="text-lg">Không tìm thấy Skill nào khớp với từ khóa "{searchQuery}".</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilter('Tất cả');
            }}
            className="mt-4 px-4 py-2 rounded-full bg-brand-gradient text-white text-xs font-bold"
          >
            Xem lại tất cả
          </button>
        </div>
      )}

      {/* 3 Value Pillars */}
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

      {/* Combo Packages */}
      <div className="mt-20" id="goi-tron">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-pink-400">Gói Tiết Kiệm</p>
          <h3 className="mt-2 text-3xl font-extrabold text-white">Combo Tiết Kiệm Tối Đa</h3>
          <p className="mt-2 text-sm text-slate-400">Lựa chọn giải pháp trọn gói để tối ưu chi phí và tăng tốc hiệu quả</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
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
            <a
              href="https://zaloapp.com/qr/g/apptijq8h3nfkdg5oaju?src=qr"
              target="_blank"
              rel="noreferrer"
              className="mt-6 block w-full rounded-full bg-brand-gradient py-3 text-center text-xs font-bold text-white shadow-brand transition hover:opacity-95 hover:scale-[1.02]"
            >
              Chọn combo 10 Skill qua Zalo →
            </a>
          </div>

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
            <div className="mt-5 grid grid-cols-6 gap-1.5">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="relative aspect-[3/4] overflow-hidden rounded-lg border border-white/20 bg-slate-950">
                  <img src="/images/kol-ai.jpg" alt={`Mật mã ${i}`} className="h-full w-full object-cover" />
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
            <a
              href="https://zaloapp.com/qr/g/apptijq8h3nfkdg5oaju?src=qr"
              target="_blank"
              rel="noreferrer"
              className="mt-6 block w-full rounded-full bg-brand-gradient py-3 text-center text-xs font-bold text-white shadow-brand transition hover:opacity-95 hover:scale-[1.02]"
            >
              Xem combo 6 sản phẩm qua Zalo →
            </a>
          </div>

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
              href="https://zaloapp.com/qr/g/apptijq8h3nfkdg5oaju?src=qr"
              target="_blank"
              rel="noreferrer"
              className="mt-6 block w-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 py-3 text-center text-xs font-extrabold text-white shadow-lg transition hover:scale-[1.02]"
            >
              Tham gia Nhóm Zalo Chăm Sóc & Tư Vấn →
            </a>
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
                src="/images/zalo-group-qr.png"
                alt="Mã QR Nhóm Zalo Quà Tặng Skill - Tool AI"
                className="w-48 h-auto rounded-xl object-contain mx-auto"
              />
              <span className="block mt-1 text-[11px] font-bold text-slate-800">
                Nhóm Quà Tặng Skill - Tool AI
              </span>
            </div>

            <div className="mt-2 space-y-2">
              <a
                href="https://zaloapp.com/qr/g/apptijq8h3nfkdg5oaju?src=qr"
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
    </div>
  );
}

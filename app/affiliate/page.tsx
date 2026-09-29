'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { 
  Share2, 
  Copy, 
  CheckCircle2, 
  TrendingUp, 
  DollarSign, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  QrCode, 
  Download, 
  Zap, 
  Percent, 
  PhoneCall, 
  ExternalLink,
  ChevronRight,
  Gift,
  HelpCircle
} from 'lucide-react';
import { formatVND } from '@/lib/sepay';

export default function AffiliatePage() {
  const [partnerName, setPartnerName] = useState('');
  const [partnerPhone, setPartnerPhone] = useState('');
  const [partnerBank, setPartnerBank] = useState('');
  const [partnerAccount, setPartnerAccount] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [salesCount, setSalesCount] = useState(5); // slider for calculator

  const handleGenerateLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerName.trim() || !partnerPhone.trim()) return;

    // Generate clean ref code
    const cleanRef = partnerName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]/g, '')
      .toUpperCase()
      .slice(0, 10) + partnerPhone.slice(-4);

    const link = `https://ai-academy-pro-one.vercel.app/?ref=${cleanRef}`;
    setGeneratedLink(link);
    setCopied(false);

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleCopy = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Commission calculation based on average course price 686.000đ with 40% commission
  const avgCoursePrice = 686000;
  const commissionRate = 0.4;
  const monthlyEarnings = salesCount * 30 * avgCoursePrice * commissionRate;

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-purple-500/20 border border-amber-500/30 text-xs font-bold text-amber-300 uppercase tracking-widest mb-4 shadow-[0_0_20px_-5px_rgba(245,158,11,0.4)]">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
          <span>Chương Trình Đối Tác Toàn Quốc · Hoa Hồng Lên Đến 50%</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
          Kiếm Thu Nhập Thụ Động Cùng <br />
          <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-pink-500 bg-clip-text text-transparent">
            AI Academy Pro & HaiTech AI
          </span>
        </h1>

        <p className="mt-5 text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Chia sẻ các khóa học thực chiến và bộ Skill AI chất lượng cao đến bạn bè và cộng đồng. Nhận hoa hồng tự động từ <strong className="text-amber-400 font-extrabold">35% – 50%</strong> cho mỗi đơn hàng thành công.
        </p>

        {/* Quick Highlights */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-semibold text-slate-200">
          <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-white/10">
            <Percent className="w-4 h-4 text-emerald-400" />
            Hoa hồng tới 50% / đơn
          </span>
          <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-white/10">
            <Zap className="w-4 h-4 text-cyan-400" />
            Cookie lưu 60 ngày
          </span>
          <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-white/10">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            Thanh toán tự động hàng tuần
          </span>
        </div>
      </div>

      {/* Main Affiliate Link Generator Form */}
      <div id="dang-ky-link" className="max-w-3xl mx-auto mb-20">
        <div className="relative rounded-3xl bg-slate-900/90 border border-amber-500/30 p-6 sm:p-10 shadow-2xl backdrop-blur-xl overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/30">
                <Share2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white">Đăng Ký & Lấy Link Affiliate Riêng</h2>
                <p className="text-xs text-slate-400">Điền thông tin bên dưới để hệ thống cấp link và mã giới thiệu độc quyền</p>
              </div>
            </div>

            <form onSubmit={handleGenerateLink} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">Họ và tên của bạn *</label>
                  <input
                    type="text"
                    required
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    placeholder="Ví dụ: Nguyễn Văn An"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">Số điện thoại (Zalo nhận hoa hồng) *</label>
                  <input
                    type="tel"
                    required
                    value={partnerPhone}
                    onChange={(e) => setPartnerPhone(e.target.value)}
                    placeholder="Ví dụ: 0988.739.896"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">Tên ngân hàng nhận hoa hồng</label>
                  <input
                    type="text"
                    value={partnerBank}
                    onChange={(e) => setPartnerBank(e.target.value)}
                    placeholder="Ví dụ: Techcombank, MBBank, VCB..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">Số tài khoản ngân hàng</label>
                  <input
                    type="text"
                    value={partnerAccount}
                    onChange={(e) => setPartnerAccount(e.target.value)}
                    placeholder="Ví dụ: 6688991971"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 hover:scale-[1.01] transition-all cursor-pointer mt-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Tạo Link Giới Thiệu Affiliate Ngay (100% Miễn Phí)</span>
              </button>
            </form>

            {/* Generated Link Display Box */}
            {generatedLink && (
              <div className="mt-6 p-5 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Link Affiliate của bạn đã được kích hoạt thành công!</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={generatedLink}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-cyan-300 text-xs font-mono select-all"
                  />
                  <button
                    onClick={handleCopy}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 shrink-0 shadow-md transition-all"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Đã chép!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Sao chép Link</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/10 text-xs text-slate-400">
                  <span>Mã giới thiệu: <strong className="text-white">{generatedLink.split('=')[1]}</strong></span>
                  <a
                    href="https://zaloapp.com/qr/g/apptijq8h3nfkdg5oaju?src=qr"
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-400 hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>Vào Nhóm Zalo Đối Tác để nhận bài viết & video mẫu</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Commission Structure Cards */}
      <div className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-white">Chính Sách Hoa Hồng Hấp Dẫn Nhất</h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">Không yêu cầu vốn, không cần giữ hàng, tiền về tài khoản hàng tuần</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-purple-500/30 flex flex-col justify-between hover:border-purple-400/60 transition-all">
            <div>
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 uppercase">
                Khóa Học Video AI
              </span>
              <h3 className="text-xl font-bold text-white mt-4">Hoa Hồng 40% – 50%</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Đồng giá khóa học 686.000 ₫. Bạn nhận ngay từ <strong className="text-emerald-400 font-extrabold">274.000 ₫ – 343.000 ₫</strong> cho mỗi học viên đăng ký qua link của bạn.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 text-xs text-slate-400">
              ✓ Nhu cầu học AI đang bùng nổ, tỷ lệ chốt đơn rất cao
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-amber-500/40 flex flex-col justify-between shadow-xl shadow-amber-500/10 hover:border-amber-400/60 transition-all">
            <div>
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 uppercase">
                Kho 40+ Skill AI
              </span>
              <h3 className="text-xl font-bold text-white mt-4">Hoa Hồng 40%</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Bộ Skill đồng giá 68.000 ₫/skill và các gói Combo từ 390.000 ₫ – 1.350.000 ₫. Giá mềm, khách hàng dễ dàng mua số lượng lớn.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 text-xs text-slate-400">
              ✓ Sản phẩm số giao ngay qua email, không hoàn trả
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-cyan-500/30 flex flex-col justify-between hover:border-cyan-400/60 transition-all">
            <div>
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 uppercase">
                Công Cụ & Web App AI
              </span>
              <h3 className="text-xl font-bold text-white mt-4">Hoa Hồng 35%</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Các giải pháp tự động hóa n8n, chatbot AI doanh nghiệp. Giá trị đơn hàng cao, hoa hồng định kỳ khi khách hàng gia hạn bản quyền.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 text-xs text-slate-400">
              ✓ Thu nhập thụ động lũy kế theo thời gian
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Income Calculator */}
      <div className="mb-20 max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 border border-blue-500/40 p-6 sm:p-10 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white">Bảng Dự Tính Thu Nhập Hàng Tháng</h3>
            <p className="text-xs text-slate-400 mt-1">Kéo thanh trượt để ước tính thu nhập dựa trên số đơn hàng giới thiệu</p>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-xs text-slate-400 block">Ước tính thu nhập mỗi tháng:</span>
            <span className="text-2xl sm:text-4xl font-black text-emerald-400">
              {formatVND(monthlyEarnings)}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span>Số đơn hàng giới thiệu mỗi ngày: <strong className="text-cyan-400 text-sm">{salesCount} đơn/ngày</strong></span>
            <span>({salesCount * 30} đơn/tháng)</span>
          </div>

          <input
            type="range"
            min="1"
            max="30"
            value={salesCount}
            onChange={(e) => setSalesCount(Number(e.target.value))}
            className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />

          <div className="flex justify-between text-[11px] text-slate-500">
            <span>1 đơn/ngày (8.2 triệu/tháng)</span>
            <span>10 đơn/ngày (82.3 triệu/tháng)</span>
            <span>30 đơn/ngày (246 triệu/tháng)</span>
          </div>
        </div>
      </div>

      {/* 3 Steps Guide */}
      <div className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-white">3 Bước Bắt Đầu Kiếm Tiền Dễ Dàng</h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">Bất kỳ ai cũng có thể làm được ngay trên điện thoại hoặc máy tính</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 space-y-3">
            <span className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-lg">
              1
            </span>
            <h4 className="text-base font-bold text-white">Lấy Link Giới Thiệu</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Điền họ tên và số điện thoại ở trên để nhận đường link Affiliate độc quyền cùng mã QR riêng của bạn.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 space-y-3">
            <span className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-black text-lg">
              2
            </span>
            <h4 className="text-base font-bold text-white">Chia Sẻ Lên Mạng Xã Hội</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Đăng link kèm hình ảnh, video mẫu lên Facebook cá nhân, Fanpage, Group AI, kênh TikTok hoặc tin nhắn Zalo.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 space-y-3">
            <span className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-lg">
              3
            </span>
            <h4 className="text-base font-bold text-white">Nhận Hoa Hồng Tự Động</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Khi khách hàng bấm vào link và mua khóa học hoặc skill, hệ thống tự ghi nhận và chuyển khoản hoa hồng cho bạn.
            </p>
          </div>
        </div>
      </div>

      {/* Partner Support CTA */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-950/80 via-slate-900 to-cyan-950/80 border border-cyan-500/30 p-8 sm:p-12 text-center space-y-4">
        <h3 className="text-2xl sm:text-3xl font-black text-white">Cần Hỗ Trợ Đăng Ký Đối Tác Hoặc Lấy Mẫu Bài Đăng?</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Tham gia nhóm Zalo Đối Tác Affiliate của Học Viện để được cung cấp sẵn kho hình ảnh, video ngắn, kịch bản bán hàng và được cố vấn 1-1:
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://zaloapp.com/qr/g/apptijq8h3nfkdg5oaju?src=qr"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all"
          >
            <span>Tham Gia Nhóm Zalo Đối Tác Affiliate</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#dang-ky-link"
            className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs sm:text-sm"
          >
            Lấy Link Affiliate Của Bạn
          </a>
        </div>
      </div>
    </div>
  );
}

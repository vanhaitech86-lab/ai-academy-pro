'use client';

import React from 'react';
import Link from 'next/link';
import { Flame, Mail, Phone, MapPin, ShieldCheck, QrCode, Heart, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#0a1122]/90 backdrop-blur-xl border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-amber-500/30 border border-amber-400/50 shrink-0 bg-[#131d35]">
                <img
                  src="/images/logo-phuong-hoang.png"
                  alt="AI Academy Pro - Phượng Hoàng Lửa"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-400 bg-clip-text text-transparent">
                AI ACADEMY PRO
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Hệ sinh thái đào tạo trí tuệ nhân tạo (AI) thực chiến và thương mại hóa sản phẩm số hàng đầu Việt Nam. Giúp cá nhân và doanh nghiệp nhân 10 năng suất làm việc.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Thanh toán tự động SePay 24/7</span>
              </div>
            </div>
          </div>

          {/* Col 2: Products */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Sản phẩm & Khóa học</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/khoa-hoc" className="hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                  Khóa học ChatGPT & AI
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/khoa-hoc" className="hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                  Khóa học Midjourney & Flux
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/skill-ai" className="hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                  Kho Mega Prompt Pack
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/skill-ai" className="hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                  Workflow Tự Động n8n/Make
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/cong-cu-ai" className="hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                  Công cụ AI chuyên nghiệp
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Policy & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Hỗ trợ & Chính sách</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/bang-gia" className="hover:text-cyan-400 transition-colors">Bảng giá & Gói thành viên</Link>
              </li>
              <li>
                <a href="#faq" className="hover:text-cyan-400 transition-colors">Chính sách hoàn tiền 7 ngày</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-cyan-400 transition-colors">Điều khoản dịch vụ</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-cyan-400 transition-colors">Chính sách bảo mật thông tin</a>
              </li>
              <li>
                <Link href="/hoc-vien" className="hover:text-cyan-400 transition-colors">Hướng dẫn kích hoạt khóa học</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact info */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Liên hệ hợp tác</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <a href="mailto:vanhaitech.86@gmail.com" className="hover:text-cyan-400 transition-colors">
                  vanhaitech.86@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Hotline: <a href="tel:0988739896" className="text-white font-bold hover:text-amber-300 transition-colors">0988739896</a></span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a
                  href="https://zalo.me/g/apptijq8h3nfkdg5oaju"
                  onClick={(e) => {
                    e.preventDefault();
                    window.dispatchEvent(new CustomEvent('open-zalo-modal'));
                  }}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Nhóm Zalo Quà Tặng & Chăm Sóc
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                <span>Tòa nhà Innovation Hub, Quận Cầu Giấy, Hà Nội</span>
              </li>
              <li className="flex items-center gap-2 pt-1">
                <QrCode className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs text-slate-300">VietQR Napas 24/7 Gateway</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} AI Academy Pro - Học Viện Phượng Hoàng Lửa. Bản quyền thuộc về HaiTech Ai.</p>
          <div className="flex items-center gap-6">
            <span>Powered by Next.js & SePay Webhook</span>
            <span className="flex items-center gap-1 text-slate-400">
              Xây dựng với <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" /> và AI
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

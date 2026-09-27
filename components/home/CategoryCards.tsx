'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Wand2, Cpu, Building2, ArrowRight, Sparkles } from 'lucide-react';

export default function CategoryCards() {
  const categories = [
    {
      title: 'Khóa Học AI Thực Chiến',
      desc: 'Giáo trình chuẩn từ Zero đến Chuyên gia: Prompt, Midjourney, n8n và Lập trình Web AI.',
      icon: BookOpen,
      count: '6+ Khóa học chuyên sâu',
      href: '/khoa-hoc',
      gradient: 'from-purple-600/20 via-indigo-600/10 to-transparent',
      borderColor: 'group-hover:border-purple-500/50',
      iconColor: 'text-purple-400',
      glow: 'group-hover:shadow-[0_0_30px_-5px_rgba(124,58,237,0.3)]'
    },
    {
      title: 'Kho Skill & Workflow AI',
      desc: 'Bộ 1.200+ Prompt độc quyền, Workflow tự động hóa Make/n8n và Custom GPTs đóng gói sẵn.',
      icon: Wand2,
      count: '500+ Mẫu Prompt & Flow',
      href: '/skill-ai',
      gradient: 'from-cyan-600/20 via-teal-600/10 to-transparent',
      borderColor: 'group-hover:border-cyan-500/50',
      iconColor: 'text-cyan-400',
      glow: 'group-hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)]'
    },
    {
      title: 'Công Cụ AI Chuyên Nghiệp',
      desc: 'Bộ phần mềm Web App: Clone giọng nói tiếng Việt, cắt video ngắn tự động, tự động viết bài đa kênh.',
      icon: Cpu,
      count: '10+ AI Tool bản quyền',
      href: '/cong-cu-ai',
      gradient: 'from-pink-600/20 via-rose-600/10 to-transparent',
      borderColor: 'group-hover:border-pink-500/50',
      iconColor: 'text-pink-400',
      glow: 'group-hover:shadow-[0_0_30px_-5px_rgba(236,72,153,0.3)]'
    },
    {
      title: 'Tư Vấn AI Doanh Nghiệp',
      desc: 'Đào tạo nội bộ (In-house) & chuyển đổi số tự động hóa quy trình nghiệp vụ theo yêu cầu.',
      icon: Building2,
      count: 'Hỗ trợ triển khai 1-1',
      href: '/bang-gia',
      gradient: 'from-amber-600/20 via-orange-600/10 to-transparent',
      borderColor: 'group-hover:border-amber-500/50',
      iconColor: 'text-amber-400',
      glow: 'group-hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.3)]'
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hệ Sinh Thái Toàn Diện</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Khám Phá Danh Mục Nổi Bật
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Mọi thứ bạn cần để làm chủ trí tuệ nhân tạo và tạo ra giá trị kinh tế thực tế.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.title}
                href={cat.href}
                className={`group relative rounded-3xl p-6 bg-slate-900/60 border border-white/10 transition-all duration-300 hover:-translate-y-2 ${cat.borderColor} ${cat.glow} flex flex-col justify-between overflow-hidden`}
              >
                {/* Background soft glow gradient */}
                <div className={`absolute inset-0 bg-gradient-to-b ${cat.gradient} opacity-40 group-hover:opacity-100 transition-opacity pointer-events-none`} />

                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${cat.iconColor}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    {cat.count}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <div className="relative z-10 mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-white">
                  <span>Khám phá ngay</span>
                  <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

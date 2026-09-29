'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Play, Users, BookOpen, Star, Zap } from 'lucide-react';
import HeroScene from '@/components/three/HeroScene';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* 3D Three.js Interactive Particle Sphere & Neural Core */}
      <HeroScene />

      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-purple-600/20 via-cyan-500/15 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Floating badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-cyan-500/30 text-xs sm:text-sm font-semibold text-cyan-300 mb-8 shadow-[0_0_25px_-5px_rgba(6,182,212,0.4)] animate-pulse-glow">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Kỷ Nguyên AI - AGI tự động hóa đỉnh cao</span>
        </div>

        {/* Main Catchy Heading in strictly 2 Lines */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] font-black tracking-tight text-white max-w-6xl mx-auto leading-[1.2]">
          <span className="block">Làm Chủ AI –</span>
          <span className="block mt-1 sm:mt-3 bg-gradient-to-r from-cyan-300 via-teal-200 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(6,182,212,0.35)] whitespace-nowrap">
            Tăng Tốc Công Việc Gấp 10 Lần
          </span>
        </h1>



        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/khoa-hoc"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-bold text-base shadow-xl shadow-purple-600/30 hover:shadow-cyan-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 group"
          >
            <span>Khám Phá Khóa Học</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/skill-ai"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-card text-white font-semibold text-base hover:bg-white/10 hover:border-white/20 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <Play className="w-4 h-4 text-cyan-400 fill-cyan-400 group-hover:scale-110 transition-transform" />
            <span>Xem Kho Skill & Tool AI</span>
          </Link>
        </div>

        {/* Trust Stats Bar */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-2xl sm:text-3xl font-extrabold text-white">
              <Users className="w-5 h-5 text-purple-400" />
              <span>15.000+</span>
            </div>
            <span className="text-xs sm:text-sm text-slate-400 mt-1">Học viên & Doanh nghiệp</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-2xl sm:text-3xl font-extrabold text-white">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <span>50+</span>
            </div>
            <span className="text-xs sm:text-sm text-slate-400 mt-1">Khóa học & Lộ trình</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-2xl sm:text-3xl font-extrabold text-white">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span>4.9 / 5.0</span>
            </div>
            <span className="text-xs sm:text-sm text-slate-400 mt-1">Đánh giá xuất sắc</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-2xl sm:text-3xl font-extrabold text-white">
              <Zap className="w-5 h-5 text-pink-400" />
              <span>1.200+</span>
            </div>
            <span className="text-xs sm:text-sm text-slate-400 mt-1">Prompt & Workflow có sẵn</span>
          </div>
        </div>
      </div>
    </section>
  );
}

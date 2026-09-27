'use client';

import React from 'react';
import Link from 'next/link';
import { TOOLS } from '@/lib/data';
import { formatVND } from '@/lib/sepay';
import { Cpu, CheckCircle2, ArrowRight, Sparkles, ExternalLink, Zap } from 'lucide-react';

export default function BentoTools() {
  return (
    <section className="py-20 relative bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-xs font-semibold text-pink-300 uppercase tracking-widest mb-3">
            <Cpu className="w-3.5 h-3.5 text-pink-400" />
            <span>Năng Suất Đột Phá</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Bộ Công Cụ AI Chuyên Nghiệp
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Ứng dụng giải pháp trí tuệ nhân tạo thế hệ mới, tối ưu cho thị trường Việt Nam và vận hành kinh doanh.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Item 1 (Wide Bento Card) */}
          <div className="md:col-span-2 group relative rounded-3xl bg-slate-900/80 border border-white/10 p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-pink-500/50 hover:shadow-[0_0_35px_-5px_rgba(236,72,153,0.3)]">
            <div className="absolute top-0 right-0 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row items-start justify-between gap-6">
              <div className="max-w-md">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase bg-pink-500/20 text-pink-300 border border-pink-500/30">
                    {TOOLS[0].badge}
                  </span>
                  <span className="text-xs text-slate-400">{TOOLS[0].category}</span>
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-pink-300 transition-colors">
                  {TOOLS[0].title}
                </h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  {TOOLS[0].description}
                </p>
                <div className="mt-4 space-y-2">
                  {TOOLS[0].features?.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative w-full sm:w-60 aspect-video sm:aspect-square rounded-2xl overflow-hidden border border-white/10 shrink-0">
                <img
                  src={TOOLS[0].thumbnail}
                  alt={TOOLS[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Bản quyền 1 năm</span>
                <span className="text-xl font-bold text-white">{formatVND(TOOLS[0].salePrice)}</span>
              </div>
              <Link
                href={`/cong-cu-ai/${TOOLS[0].slug}`}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-90 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-pink-600/30"
              >
                <span>Dùng thử & Kích hoạt</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Item 2 (Standard Bento Card) */}
          <div className="group relative rounded-3xl bg-slate-900/80 border border-white/10 p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_35px_-5px_rgba(6,182,212,0.3)]">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {TOOLS[1].badge}
                </span>
                <span className="text-xs text-slate-400">{TOOLS[1].category}</span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                {TOOLS[1].title}
              </h3>
              <p className="mt-2 text-xs text-slate-400 line-clamp-3 leading-relaxed">
                {TOOLS[1].shortDesc}
              </p>
              <div className="mt-4 rounded-xl overflow-hidden border border-white/10 aspect-video">
                <img
                  src={TOOLS[1].thumbnail}
                  alt={TOOLS[1].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
            </div>

            <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-lg font-bold text-white">{formatVND(TOOLS[1].salePrice)}</span>
              <Link
                href={`/cong-cu-ai/${TOOLS[1].slug}`}
                className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5"
              >
                <span>Chi tiết</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Item 3 & 4 */}
          {TOOLS.slice(2, 4).map((tool, idx) => (
            <div
              key={tool.id}
              className="group relative rounded-3xl bg-slate-900/80 border border-white/10 p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_35px_-5px_rgba(124,58,237,0.3)]"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {tool.badge}
                  </span>
                  <span className="text-xs text-slate-400">{tool.category}</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                  {tool.title}
                </h3>
                <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {tool.shortDesc}
                </p>
                <div className="mt-4 rounded-xl overflow-hidden border border-white/10 aspect-video">
                  <img
                    src={tool.thumbnail}
                    alt={tool.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              </div>

              <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-lg font-bold text-white">{formatVND(tool.salePrice)}</span>
                <Link
                  href={`/cong-cu-ai/${tool.slug}`}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <span>Khám phá</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

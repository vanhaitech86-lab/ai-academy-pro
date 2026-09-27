'use client';

import React from 'react';
import { ROADMAP_STEPS } from '@/lib/data';
import { Brain, Sparkles, Bot, Cpu, Rocket, ArrowDown } from 'lucide-react';

export default function RoadmapSection() {
  const iconMap: { [key: string]: any } = {
    Brain,
    Sparkles,
    Bot,
    Cpu,
    Rocket
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background neon ambient */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-b from-purple-600/10 via-cyan-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300 uppercase tracking-widest mb-3">
            <Rocket className="w-3.5 h-3.5 text-cyan-400" />
            <span>Lộ Trình Phát Triển Toàn Diện</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Lộ Trình Trở Thành <span className="gradient-text-neon">Bậc Thầy AI</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Thiết kế theo chuẩn 5 cấp độ từng bước vững chắc: từ người chưa biết gì đến việc tự động hóa và thương mại hóa sản phẩm AI.
          </p>
        </div>

        {/* 5-step Timeline cards */}
        <div className="relative">
          {/* Central connecting glow line for desktop */}
          <div className="hidden lg:block absolute left-1/2 top-10 bottom-10 w-0.5 -translate-x-1/2 bg-gradient-to-b from-purple-500 via-cyan-400 to-pink-500 opacity-40 shadow-[0_0_15px_rgba(6,182,212,0.5)]" />

          <div className="space-y-12 lg:space-y-16">
            {ROADMAP_STEPS.map((step, idx) => {
              const Icon = iconMap[step.icon] || Brain;
              const isEven = idx % 2 === 1;

              return (
                <div
                  key={step.step}
                  className={`flex flex-col lg:flex-row items-center ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  } gap-8 lg:gap-16`}
                >
                  {/* Content Card */}
                  <div className="w-full lg:w-1/2 flex justify-center">
                    <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/10 glass-card transition-all duration-300 hover:border-cyan-500/40 hover:-translate-y-1">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl font-black bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
                          {step.step}
                        </span>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                          {step.subtitle}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Center Node Indicator */}
                  <div className="relative flex items-center justify-center shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-500 p-0.5 shadow-[0_0_25px_rgba(124,58,237,0.5)]">
                      <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-cyan-300">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                  </div>

                  {/* Empty Spacer on desktop to balance */}
                  <div className="hidden lg:block w-full lg:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

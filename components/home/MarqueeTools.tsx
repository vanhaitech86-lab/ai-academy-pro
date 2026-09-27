import React from 'react';
import { AI_PARTNER_LOGOS } from '@/lib/data';
import { Cpu } from 'lucide-react';

export default function MarqueeTools() {
  const tools = [...AI_PARTNER_LOGOS, ...AI_PARTNER_LOGOS];

  return (
    <div className="relative py-8 bg-slate-950/60 border-y border-white/5 overflow-hidden">
      {/* Gradient masks for edge fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0b0f1a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0b0f1a] to-transparent z-10 pointer-events-none" />

      <div className="flex items-center gap-4">
        <div className="shrink-0 pl-6 pr-4 hidden md:flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-widest border-r border-white/10">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>Công Nghệ Đào Tạo</span>
        </div>

        <div className="overflow-hidden w-full flex">
          <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
            {tools.map((item, idx) => (
              <div
                key={`${item.name}-${idx}`}
                className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-slate-300 hover:text-white hover:border-purple-500/30 transition-all cursor-default"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400/80 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                <span className="text-sm font-semibold tracking-wide">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

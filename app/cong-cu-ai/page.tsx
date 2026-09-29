'use client';

import React from 'react';
import Link from 'next/link';
import { TOOLS } from '@/lib/data';
import { formatVND } from '@/lib/sepay';
import { useCart } from '@/lib/cart-context';
import { Cpu, Star, ShoppingCart, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function CongCuAiPage() {
  const { addToCart } = useCart();

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-xs font-semibold text-pink-300 uppercase tracking-widest mb-3">
          <Cpu className="w-3.5 h-3.5 text-pink-400" />
          <span>Hệ Thống Web App AI</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Công Cụ AI Chuyên Nghiệp
        </h1>
        <p className="mt-3 text-slate-400 text-sm sm:text-base">
          Trợ thủ đắc lực tăng tốc công việc sáng tạo nội dung, âm thanh, video và lập trình.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {TOOLS.map((tool) => (
          <div
            key={tool.id}
            className="rounded-3xl bg-slate-900/80 border border-white/10 p-6 sm:p-8 flex flex-col justify-between hover:border-pink-500/40 transition-all hover:shadow-2xl"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-pink-500/20 text-pink-300 border border-pink-500/30">
                  {tool.badge}
                </span>
                <span className="text-xs text-slate-400">{tool.category}</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">{tool.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">{tool.description}</p>

              <div className="rounded-2xl overflow-hidden border border-white/10 aspect-video mb-6">
                <img
                  src={tool.thumbnail}
                  alt={tool.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2 mb-6">
                {tool.features?.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Bản quyền 1 năm</span>
                <span className="text-2xl font-extrabold text-white">{formatVND(tool.salePrice)}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => addToCart(tool)}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors"
                  title="Thêm giỏ"
                >
                  <ShoppingCart className="w-4 h-4 text-cyan-400" />
                </button>
                <Link
                  href={`/cong-cu-ai/${tool.slug}`}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-pink-600/30"
                >
                  <span>Xem demo</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

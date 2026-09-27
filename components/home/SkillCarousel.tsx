'use client';

import React from 'react';
import Link from 'next/link';
import { SKILLS } from '@/lib/data';
import { formatVND } from '@/lib/sepay';
import { useCart } from '@/lib/cart-context';
import { useRouter } from 'next/navigation';
import { Wand2, Download, ArrowRight, Star, ShoppingBag, Zap, Layers } from 'lucide-react';

export default function SkillCarousel() {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleBuyNow = (skill: (typeof SKILLS)[0]) => {
    addToCart(skill);
    router.push('/gio-hang');
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300 uppercase tracking-widest mb-3">
              <Wand2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Tài Sản Số AI Đóng Gói Sẵn</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Kho Skill, Prompt & Workflow AI
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base">
              Tải về dùng ngay: Tối ưu hàng trăm giờ lao động với các kịch bản thực chiến đã được kiểm nghiệm.
            </p>
          </div>

          <Link
            href="/skill-ai"
            className="inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 group"
          >
            <span>Khám phá toàn bộ kho Skill</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Carousel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map((skill) => (
            <div
              key={skill.id}
              className="group relative rounded-3xl bg-slate-900/80 border border-white/10 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_10px_30px_-10px_rgba(6,182,212,0.3)] hover:-translate-y-2"
            >
              {/* Media Preview Box */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
                <img
                  src={skill.thumbnail}
                  alt={skill.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md border border-white/10 text-cyan-300">
                  {skill.category}
                </span>

                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-[11px] font-bold text-amber-300">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{skill.rating}</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 text-[11px] text-slate-300 bg-slate-900/80 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-white/10 truncate">
                  <Layers className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{skill.deliveryFormat}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <Link href={`/skill-ai/${skill.slug}`}>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                      {skill.title}
                    </h3>
                  </Link>

                  <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {skill.shortDesc}
                  </p>
                </div>

                {/* Price and CTA */}
                <div className="mt-5 pt-4 border-t border-white/10">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="text-lg font-extrabold text-white">
                        {formatVND(skill.salePrice)}
                      </span>
                      <span className="text-xs text-slate-500 line-through ml-2">
                        {formatVND(skill.price)}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                      Tiết kiệm 50%
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => addToCart(skill)}
                      className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-all"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Thêm giỏ</span>
                    </button>

                    <button
                      onClick={() => handleBuyNow(skill)}
                      className="py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:opacity-95 text-slate-950 font-bold text-xs flex items-center justify-center gap-1 shadow-md shadow-cyan-500/30 transition-all"
                    >
                      <Zap className="w-3.5 h-3.5 fill-slate-950" />
                      <span>Mua ngay</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SKILLS } from '@/lib/data';
import { formatVND } from '@/lib/sepay';
import { useCart } from '@/lib/cart-context';
import { Wand2, Star, ShoppingBag, Zap, Layers, Check } from 'lucide-react';

export default function SkillAiPage() {
  const { addToCart, cart } = useCart();
  const [filter, setFilter] = useState('Tất cả');
  const [addedIds, setAddedIds] = useState<{ [key: string]: boolean }>({});

  const categories = ['Tất cả', 'Prompt Pack', 'Workflow n8n/Make', 'Custom GPTs / Gems', 'Prompt Tạo Ảnh'];

  const filtered = filter === 'Tất cả' ? SKILLS : SKILLS.filter((s) => s.category === filter);

  const handleAdd = (e: React.MouseEvent, skill: (typeof SKILLS)[0]) => {
    e.preventDefault();
    addToCart(skill);
    setAddedIds((prev) => ({ ...prev, [skill.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [skill.id]: false }));
    }, 1500);
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300 uppercase tracking-widest mb-3">
          <Wand2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>Kho Tài Sản Số AI</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Kho Skill, Prompt & Workflow AI
        </h1>
        <p className="mt-3 text-slate-400 text-sm sm:text-base">
          Các bộ Prompt đóng gói, Custom GPTs chuyên gia và kịch bản tự động hóa n8n tải về dùng ngay.
        </p>

        {/* Filter chips */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                filter === c
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg'
                  : 'bg-slate-900 border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((skill) => {
          const isAdded = addedIds[skill.id] || cart.some((i) => i.product.id === skill.id);

          return (
            <div
              key={skill.id}
              className="rounded-3xl bg-slate-900/80 border border-white/10 overflow-hidden flex flex-col justify-between hover:border-cyan-500/40 transition-all hover:-translate-y-1.5 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] w-full bg-slate-950 overflow-hidden">
                <img
                  src={skill.thumbnail}
                  alt={skill.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-black/60 backdrop-blur-md text-cyan-300">
                  {skill.category}
                </span>
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>{skill.rating}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <Link href={`/skill-ai/${skill.slug}`}>
                    <h3 className="text-base font-bold text-white hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                      {skill.title}
                    </h3>
                  </Link>
                  <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {skill.shortDesc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/10">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-lg font-extrabold text-white">
                      {formatVND(skill.salePrice)}
                    </span>
                    <span className="text-xs text-slate-500 line-through">
                      {formatVND(skill.price)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={(e) => handleAdd(e, skill)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        isAdded
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-white/5 hover:bg-white/10 text-slate-300'
                      }`}
                    >
                      {isAdded ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                      <span>{isAdded ? 'Đã thêm' : 'Thêm giỏ'}</span>
                    </button>

                    <Link
                      href={`/skill-ai/${skill.slug}`}
                      className="py-2 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Xem ngay</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

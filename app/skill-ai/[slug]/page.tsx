'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SKILLS } from '@/lib/data';
import { formatVND } from '@/lib/sepay';
import { useCart } from '@/lib/cart-context';
import { 
  Star, 
  CheckCircle2, 
  ShoppingCart, 
  Zap, 
  Layers, 
  ShieldCheck, 
  Download, 
  ArrowLeft 
} from 'lucide-react';

export default function SkillDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { addToCart } = useCart();

  const skill = SKILLS.find((s) => s.slug === resolvedParams.slug) || SKILLS[0];

  const handleBuyNow = () => {
    addToCart(skill);
    router.push('/gio-hang');
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link
        href="/skill-ai"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Quay lại kho Skill AI</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Detail */}
        <div className="lg:col-span-8 space-y-8">
          <div className="rounded-3xl bg-slate-900/60 border border-white/10 p-6 sm:p-8">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              {skill.category}
            </span>

            <h1 className="mt-4 text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              {skill.title}
            </h1>

            <div className="mt-4 flex items-center gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{skill.rating}</span>
                <span className="text-slate-400">({skill.reviewCount} đánh giá)</span>
              </div>
              <span>•</span>
              <span className="text-cyan-400 font-medium">{skill.deliveryFormat}</span>
            </div>

            <p className="mt-6 text-sm sm:text-base text-slate-300 leading-relaxed">
              {skill.description}
            </p>

            {/* Media Image */}
            <div className="mt-8 rounded-2xl overflow-hidden border border-white/10 aspect-video">
              <img
                src={skill.thumbnail}
                alt={skill.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Features */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <h3 className="text-lg font-bold text-white mb-4">Giá trị bạn nhận được trong gói này:</h3>
              <div className="space-y-3">
                {skill.features?.map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Checkout Box */}
        <div className="lg:col-span-4">
          <div className="rounded-3xl bg-slate-900/90 border border-white/15 p-6 shadow-2xl space-y-6 lg:sticky lg:top-24">
            <div>
              <span className="text-xs text-slate-400 block mb-1">Giá trọn gói tải về:</span>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-white">{formatVND(skill.salePrice)}</span>
                <span className="text-sm text-slate-500 line-through">{formatVND(skill.price)}</span>
              </div>
              <span className="text-xs text-emerald-400 font-bold mt-1 block">Tiết kiệm 50%</span>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:opacity-95 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Mua và tải ngay</span>
              </button>

              <button
                onClick={() => addToCart(skill)}
                className="w-full py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4 text-cyan-400" />
                <span>Thêm vào giỏ</span>
              </button>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <Download className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Bàn giao qua file & link truy cập tức thì</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Cam kết chính xác, hỗ trợ nạp prompt 1-1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

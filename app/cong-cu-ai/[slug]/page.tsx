'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { TOOLS } from '@/lib/data';
import { formatVND } from '@/lib/sepay';
import { useCart } from '@/lib/cart-context';
import { Star, CheckCircle2, ShoppingBag, Zap, Cpu, ArrowLeft, ExternalLink } from 'lucide-react';

export default function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { addToCart } = useCart();

  const tool = TOOLS.find((t) => t.slug === resolvedParams.slug) || TOOLS[0];

  const handleBuyNow = () => {
    addToCart(tool);
    router.push('/gio-hang');
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link
        href="/cong-cu-ai"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Quay lại kho công cụ AI</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          <div className="rounded-3xl bg-slate-900/60 border border-white/10 p-6 sm:p-8">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
              {tool.category}
            </span>

            <h1 className="mt-4 text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              {tool.title}
            </h1>

            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              {tool.description}
            </p>

            <div className="mt-8 rounded-2xl overflow-hidden border border-white/10 aspect-video">
              <img
                src={tool.thumbnail}
                alt={tool.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <h3 className="text-lg font-bold text-white mb-4">Tính năng nổi bật</h3>
              <div className="space-y-3">
                {tool.features?.map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="rounded-3xl bg-slate-900/90 border border-white/15 p-6 shadow-2xl space-y-6 lg:sticky lg:top-24">
            <div>
              <span className="text-xs text-slate-400 block mb-1">Giá bản quyền:</span>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-white">{formatVND(tool.salePrice)}</span>
                <span className="text-sm text-slate-500 line-through">{formatVND(tool.price)}</span>
              </div>
              <span className="text-xs text-emerald-400 font-bold mt-1 block">Kích hoạt tức thì</span>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-95 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-600/30"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Kích hoạt ngay</span>
              </button>

              <button
                onClick={() => addToCart(tool)}
                className="w-full py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-pink-400" />
                <span>Thêm vào giỏ</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

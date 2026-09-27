'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PRICING_PLANS } from '@/lib/data';
import { formatVND } from '@/lib/sepay';
import { Check, Sparkles, Zap, ArrowRight } from 'lucide-react';

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300 uppercase tracking-widest mb-3">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Gói Thành Viên Linh Hoạt</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Đầu Tư Vào Tương Lai Với Chi Phí Tối Ưu
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            Tiết kiệm tới 35% khi đăng ký gói theo năm. Kích hoạt tự động qua SePay trong 3 giây.
          </p>

          {/* Monthly / Yearly Switch */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl bg-slate-900 border border-white/10">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white/10 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Theo Tháng
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Theo Năm</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-bold">
                -35%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const price = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.highlight
                    ? 'bg-slate-900/90 border-2 border-cyan-400 shadow-[0_0_40px_-5px_rgba(6,182,212,0.4)] lg:-translate-y-3 z-10'
                    : 'bg-slate-900/60 border border-white/10 hover:border-white/20'
                }`}
              >
                {/* Pro Badge Header */}
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-cyan-500/50 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{plan.badge}</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    {!plan.highlight && (
                      <span className="text-xs text-slate-400 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                    {plan.desc}
                  </p>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black text-white">
                        {formatVND(price)}
                      </span>
                      <span className="text-xs text-slate-400">
                        / {billingCycle === 'yearly' ? 'năm' : 'tháng'}
                      </span>
                    </div>
                    {billingCycle === 'yearly' && (
                      <span className="text-[11px] text-emerald-400 mt-1 block">
                        Chỉ tương đương {formatVND(Math.round(price / 12))}/tháng
                      </span>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-3.5 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  href={`/thanh-toan?plan=${plan.id}&cycle=${billingCycle}`}
                  className={`w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white shadow-xl shadow-cyan-500/30 hover:scale-[1.02]'
                      : 'bg-white/10 hover:bg-white/15 text-white'
                  }`}
                >
                  <span>Đăng ký ngay</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

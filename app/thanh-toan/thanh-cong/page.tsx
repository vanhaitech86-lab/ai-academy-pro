'use client';

import React, { useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import confetti from 'canvas-confetti';
import { formatVND } from '@/lib/sepay';
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Mail, 
  Flame 
} from 'lucide-react';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code') || 'AIA-SUCCESS';
  const amount = Number(searchParams.get('amount')) || 990000;

  useEffect(() => {
    // Fire celebratory confetti cannons
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#7c3aed', '#06b6d4', '#ec4899', '#f59e0b']
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#7c3aed', '#06b6d4', '#ec4899', '#f59e0b']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div className="pt-32 pb-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="relative rounded-3xl bg-slate-900/90 border border-white/15 p-8 sm:p-12 shadow-2xl overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-300 uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Thanh Toán Thành Công Qua SePay VietQR</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Chào Mừng Bạn Đến Với AI Academy Pro!
          </h1>

          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
            Hệ thống đã nhận được khoản thanh toán <strong className="text-emerald-400 font-extrabold">{formatVND(amount)}</strong> với mã đơn <strong className="text-cyan-300 font-mono">{code}</strong>.
          </p>

          {/* Account Activated Notice */}
          <div className="mt-8 p-4 rounded-2xl bg-slate-950 border border-white/10 text-left space-y-3 max-w-md mx-auto text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2.5 text-emerald-400 font-semibold">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Khóa học & Tài nguyên số đã được mở khóa 100%</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Mail className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Biên lai và hướng dẫn học đã gửi về email của bạn.</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/hoc-vien"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-extrabold text-sm shadow-xl shadow-purple-600/30 hover:scale-[1.02] flex items-center justify-center gap-2 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>Vào Lớp Học Của Tôi Ngay</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-semibold text-sm transition-all"
            >
              Về Trang Chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="pt-32 pb-24 text-center text-slate-400">Đang tải kết quả thanh toán...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}

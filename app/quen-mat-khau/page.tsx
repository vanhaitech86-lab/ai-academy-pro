'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { 
  Lock, 
  Mail, 
  Phone, 
  KeyRound, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { resetPassword } = useAuth();

  const [identifier, setIdentifier] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!identifier.trim()) {
      setError('Vui lòng nhập Email hoặc Số điện thoại của bạn.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Mật khẩu nhập lại không khớp.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Mật khẩu mới phải có tối thiểu 6 ký tự.');
      return;
    }

    setLoading(true);
    try {
      const res = await resetPassword(identifier, newPassword);
      if (res.success) {
        setSuccess(true);
      } else {
        setError(res.message || 'Không thể đặt lại mật khẩu. Vui lòng thử lại.');
      }
    } catch {
      setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-md">
        {/* Glow ambient */}
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-cyan-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative rounded-3xl bg-slate-900/90 border border-white/15 p-8 sm:p-10 shadow-2xl backdrop-blur-2xl">
          {/* Brand Logo Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-amber-500/30 border border-amber-400/50 shrink-0 bg-[#131d35]">
                <img
                  src="/images/logo-phuong-hoang.png"
                  alt="AI Academy Pro - Phượng Hoàng Lửa"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-lg font-black bg-gradient-to-r from-white via-cyan-200 to-purple-400 bg-clip-text text-transparent">
                AI ACADEMY PRO
              </span>
            </Link>
            <h1 className="text-2xl font-black text-white">Quên Mật Khẩu?</h1>
            <p className="text-xs text-slate-400 mt-1">
              Nhập Email hoặc Số điện thoại để tạo lại mật khẩu mới cho tài khoản
            </p>
          </div>

          {!success ? (
            <form onSubmit={handleReset} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Email hoặc Số điện thoại đã đăng ký
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Ví dụ: vanhaitech.86@gmail.com hoặc 0988..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Mật khẩu mới (tối thiểu 6 ký tự)
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Xác nhận lại mật khẩu mới
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:opacity-95 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <span>Đang xử lý...</span>
                ) : (
                  <>
                    <span>Cập Nhật Mật Khẩu Mới</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-2 text-center">
                <Link
                  href="/dang-nhap"
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  ← Quay lại Đăng Nhập
                </Link>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-4 py-2">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-lg font-bold text-white">Đổi Mật Khẩu Thành Công!</h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                Mật khẩu cho tài khoản <strong className="text-cyan-300">{identifier}</strong> đã được cập nhật thành công. Bây giờ bạn có thể đăng nhập ngay với mật khẩu mới.
              </p>

              <div className="pt-2">
                <Link
                  href="/dang-nhap"
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30 hover:opacity-95 transition-all"
                >
                  <span>Đăng Nhập Ngay Bằng Mật Khẩu Mới</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}

          {/* Security Guarantee */}
          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mã hóa bảo mật tài khoản an toàn 100%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import confetti from 'canvas-confetti';
import { 
  Flame, 
  Lock, 
  Mail, 
  Phone,
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  Gift, 
  CheckCircle2,
  ShieldCheck 
} from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register, loginWithGoogle } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Mật khẩu nhập lại không trùng khớp.');
      return;
    }

    if (password.length < 6) {
      setError('Mật khẩu tối thiểu phải từ 6 ký tự.');
      return;
    }

    if (!agreed) {
      setError('Bạn cần đồng ý với điều khoản sử dụng.');
      return;
    }

    setLoading(true);
    try {
      const res = await register(name, email, phone, password);
      if (res.success) {
        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.6 }
        });
        setTimeout(() => {
          if (email.trim().toLowerCase() === 'vanhaitech.86@gmail.com') {
            router.push('/admin');
          } else {
            router.push('/hoc-vien');
          }
        }, 600);
      } else {
        setError(res.message || 'Đăng ký tài khoản không thành công. Vui lòng thử lại.');
      }
    } catch {
      setError('Đăng ký tài khoản không thành công. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        router.push('/hoc-vien');
      }, 600);
    } catch {
      setError('Đăng nhập Google thất bại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-md">
        {/* Glow ambient */}
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-cyan-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative rounded-3xl bg-slate-900/90 border border-white/15 p-8 sm:p-10 shadow-2xl backdrop-blur-2xl">
          {/* Brand Header */}
          <div className="text-center mb-6">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-amber-500/30 border border-amber-400/50 shrink-0 bg-[#0b0f1a]">
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
            <h1 className="text-2xl font-black text-white">Đăng Ký Thành Viên</h1>
            <p className="text-xs text-slate-400 mt-1">Bắt đầu hành trình làm chủ AI ngay hôm nay</p>
          </div>

          {/* Free Gift Welcome Banner */}
          <div className="mb-6 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-2.5 text-xs text-amber-300 font-semibold">
            <Gift className="w-5 h-5 text-amber-400 shrink-0" />
            <span>🎁 Nhận ngay Ebook 100+ Prompt khi đăng ký hôm nay!</span>
          </div>

          {/* Google 1-Click Button */}
          <button
            onClick={handleGoogleSignup}
            disabled={loading}
            className="w-full py-3 px-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-3 transition-all mb-6 disabled:opacity-50"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Đăng ký nhanh với Google</span>
          </button>

          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-white/10 w-full" />
            <span className="bg-slate-900 px-3 text-[11px] text-slate-500 uppercase font-semibold">
              Hoặc tạo với Email
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Họ và tên</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn An"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Số điện thoại (dùng đăng nhập & nhận hỗ trợ)</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ví dụ: 0988.888.999"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Mật khẩu</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ít nhất 6 ký tự"
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
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Xác nhận mật khẩu</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <label className="flex items-start gap-2.5 text-xs text-slate-400 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 rounded accent-cyan-500"
              />
              <span>Tôi đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của AI Academy Pro.</span>
            </label>

            {error && (
              <p className="text-xs text-rose-400 font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 mt-2"
            >
              <span>{loading ? 'Đang tạo tài khoản...' : 'Đăng Ký Ngay'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Switch to Login */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center text-xs text-slate-400">
            <span>Đã có tài khoản học viên? </span>
            <Link href="/dang-nhap" className="text-cyan-400 hover:underline font-bold">
              Đăng nhập tại đây
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

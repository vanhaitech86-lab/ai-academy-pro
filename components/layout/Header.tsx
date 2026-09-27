'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { useAuth } from '@/lib/auth-context';
import { 
  Sparkles, 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  User, 
  Flame, 
  ArrowRight, 
  BookOpen, 
  Cpu, 
  Wand2, 
  Tag, 
  Gift, 
  LogOut,
  LogIn
} from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Khóa học', href: '/khoa-hoc', icon: BookOpen },
    { name: 'Skill AI', href: '/skill-ai', icon: Wand2 },
    { name: 'Công cụ AI', href: '/cong-cu-ai', icon: Cpu },
    { name: 'Quà tặng', href: '/qua-tang', icon: Gift, badge: 'FREE' },
    { name: 'Bảng giá', href: '/bang-gia', icon: Tag },
    { name: 'Quản trị', href: '/admin', icon: Sparkles },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-panel py-3 border-b border-white/10 shadow-2xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-cyan-500 to-pink-500 p-[1.5px] transition-transform duration-300 group-hover:scale-105">
                <div className="w-full h-full bg-[#0b0f1a] rounded-[10px] flex items-center justify-center">
                  <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-cyan-200 to-purple-400 bg-clip-text text-transparent">
                  AI ACADEMY <span className="text-xs px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">PRO</span>
                </span>
                <span className="text-[10px] font-medium tracking-wider text-slate-400 uppercase -mt-0.5">
                  Phượng Hoàng Lửa
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                      isActive
                        ? 'text-cyan-400 bg-white/5 border border-cyan-500/20 shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)]'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-slate-950 uppercase">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                title="Tìm kiếm"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Cart Icon with Dynamic Badge */}
              <Link
                href="/gio-hang"
                className="relative p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                title="Giỏ hàng"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[11px] font-bold flex items-center justify-center animate-bounce shadow-lg shadow-purple-500/50">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Auth User State / Login & Register buttons */}
              {user ? (
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    href="/hoc-vien"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-all"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-5 h-5 rounded-full object-cover ring-1 ring-cyan-400"
                    />
                    <span className="truncate max-w-[90px]">{user.name}</span>
                  </Link>
                  <Link
                    href="/hoc-vien"
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md shadow-purple-500/25 hover:scale-[1.02] transition-all"
                  >
                    Lớp Học
                  </Link>
                  <button
                    onClick={logout}
                    title="Đăng xuất"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    href="/dang-nhap"
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    href="/dang-ky"
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md shadow-purple-500/25 hover:scale-[1.02] transition-all"
                  >
                    Đăng ký
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Quick Search Bar Dropdown */}
          {searchOpen && (
            <div className="mt-3 p-2 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex items-center gap-3">
              <Search className="w-5 h-5 text-slate-400 ml-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm khóa học, prompt pack, workflow n8n..."
                className="flex-1 bg-transparent border-none text-white text-sm focus:outline-none placeholder-slate-500 py-1"
                autoFocus
              />
              <Link
                href={`/khoa-hoc?q=${encodeURIComponent(searchQuery)}`}
                onClick={() => setSearchOpen(false)}
                className="px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-lg transition-colors"
              >
                Tìm kiếm
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-[73px] bg-[#0b0f1a]/95 backdrop-blur-2xl border-b border-white/10 px-4 py-6 space-y-3 shadow-2xl max-h-[85vh] overflow-y-auto">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-slate-200 hover:text-cyan-400 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-purple-400" />
                    <span>{link.name}</span>
                  </div>
                  {link.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="pt-4 border-t border-white/10 space-y-2">
              {user ? (
                <>
                  <Link
                    href="/hoc-vien"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold shadow-lg shadow-purple-500/25"
                  >
                    <User className="w-4 h-4" />
                    <span>Vào lớp học ({user.name})</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 rounded-xl bg-rose-500/10 text-rose-400 text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Đăng xuất tài khoản</span>
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/dang-nhap"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-3 rounded-xl bg-white/5 text-center text-sm font-semibold text-white border border-white/10"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    href="/dang-ky"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-center text-sm font-bold text-white shadow-lg"
                  >
                    Đăng ký
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}

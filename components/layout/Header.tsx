'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
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
  Tag
} from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const { totalItems } = useCart();
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
    { name: 'Bảng giá', href: '/bang-gia', icon: Tag },
    { name: 'Học viên', href: '/hoc-vien', icon: User },
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
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-cyan-400 bg-white/5 border border-cyan-500/20 shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)]'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center gap-3">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                title="Tìm kiếm khóa học & skill"
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

              {/* Auth / Student Dashboard Button */}
              <Link
                href="/hoc-vien"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-cyan-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <User className="w-4 h-4" />
                <span>Vào Lớp Học</span>
              </Link>

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
          <div className="md:hidden fixed inset-x-0 top-[73px] bg-[#0b0f1a]/95 backdrop-blur-2xl border-b border-white/10 px-4 py-6 space-y-3 shadow-2xl">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-slate-200 hover:text-cyan-400 hover:bg-white/5 transition-colors"
                >
                  <Icon className="w-5 h-5 text-purple-400" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
            <div className="pt-4 border-t border-white/10">
              <Link
                href="/hoc-vien"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold shadow-lg shadow-purple-500/25"
              >
                <User className="w-4 h-4" />
                <span>Bảng điều khiển học viên</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

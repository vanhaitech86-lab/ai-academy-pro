'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { COURSES } from '@/lib/data';
import { formatVND } from '@/lib/sepay';
import { useCart } from '@/lib/cart-context';
import { 
  Search, 
  Filter, 
  Clock, 
  BookOpen, 
  Star, 
  ShoppingBag, 
  Check, 
  SlidersHorizontal 
} from 'lucide-react';

export default function CoursesPage() {
  const { addToCart, cart } = useCart();
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('Tất cả');
  const [categoryFilter, setCategoryFilter] = useState('Tất cả');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc'>('popular');
  const [addedIds, setAddedIds] = useState<{ [key: string]: boolean }>({});

  const levels = ['Tất cả', 'Người mới bắt đầu', 'Trung cấp', 'Chuyên sâu', 'Mọi cấp độ'];
  const categories = ['Tất cả', 'Người mới bắt đầu', 'Tạo ảnh AI', 'GPTs/Gems', 'Tự động hóa', 'Marketing', 'Chuyên sâu'];

  const filtered = COURSES.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || 
                        c.shortDesc.toLowerCase().includes(search.toLowerCase());
    const matchLevel = levelFilter === 'Tất cả' || c.level === levelFilter;
    const matchCategory = categoryFilter === 'Tất cả' || c.category === categoryFilter;
    return matchSearch && matchLevel && matchCategory;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.salePrice - b.salePrice;
    if (sortBy === 'price-desc') return b.salePrice - a.salePrice;
    return (b.studentsCount || 0) - (a.studentsCount || 0);
  });

  const handleAdd = (e: React.MouseEvent, course: (typeof COURSES)[0]) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(course);
    setAddedIds((prev) => ({ ...prev, [course.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [course.id]: false }));
    }, 1500);
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Danh Sách Khóa Học AI Thực Chiến
        </h1>
        <p className="mt-2 text-slate-400 text-sm sm:text-base">
          Trang bị tư duy công nghệ, kỹ năng Prompt và tự động hóa quy trình hàng đầu cùng chuyên gia.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Filter Sidebar */}
        <div className="space-y-6 lg:sticky lg:top-24 h-fit">
          {/* Search box */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Search className="w-4 h-4 text-cyan-400" />
              <span>Tìm kiếm</span>
            </h3>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tên khóa học..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Category Filter */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Filter className="w-4 h-4 text-purple-400" />
              <span>Chủ đề</span>
            </h3>
            <div className="space-y-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    categoryFilter === cat
                      ? 'bg-purple-600/30 text-purple-300 font-bold border border-purple-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Level Filter */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-pink-400" />
              <span>Cấp độ</span>
            </h3>
            <div className="space-y-1.5">
              {levels.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevelFilter(lvl)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    levelFilter === lvl
                      ? 'bg-pink-600/30 text-pink-300 font-bold border border-pink-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Sort bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/50 border border-white/10">
            <span className="text-xs text-slate-400">
              Hiển thị <strong className="text-white">{filtered.length}</strong> khóa học phù hợp
            </span>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Sắp xếp:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-950 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-cyan-400"
              >
                <option value="popular">Phổ biến nhất</option>
                <option value="price-asc">Giá từ thấp đến cao</option>
                <option value="price-desc">Giá từ cao đến thấp</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((course) => {
              const isAdded = addedIds[course.id] || cart.some((i) => i.product.id === course.id);

              return (
                <div
                  key={course.id}
                  className="rounded-3xl bg-slate-900/70 border border-white/10 overflow-hidden flex flex-col justify-between hover:border-purple-500/40 transition-all hover:shadow-xl"
                >
                  <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                      {course.badge}
                    </div>
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 text-xs font-bold text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-cyan-400" />
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                          {course.level}
                        </span>
                      </div>
                      <Link href={`/khoa-hoc/${course.slug}`}>
                        <h3 className="text-base font-bold text-white hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                          {course.title}
                        </h3>
                      </Link>
                      <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {course.shortDesc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <span className="text-lg font-extrabold text-white block">
                          {formatVND(course.salePrice)}
                        </span>
                        <span className="text-xs text-slate-500 line-through">
                          {formatVND(course.price)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/khoa-hoc/${course.slug}`}
                          className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white"
                        >
                          Chi tiết
                        </Link>
                        <button
                          onClick={(e) => handleAdd(e, course)}
                          className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                            isAdded
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              : 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white'
                          }`}
                        >
                          {isAdded ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                          <span>{isAdded ? 'Đã thêm' : 'Thêm giỏ'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="p-12 text-center rounded-2xl bg-slate-900/50 border border-white/10">
              <p className="text-slate-400 text-sm">Không tìm thấy khóa học nào phù hợp với bộ lọc hiện tại.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

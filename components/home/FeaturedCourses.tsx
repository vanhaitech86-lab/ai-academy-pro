'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { COURSES } from '@/lib/data';
import { formatVND } from '@/lib/sepay';
import { useCart } from '@/lib/cart-context';
import { 
  Star, 
  Clock, 
  BookOpen, 
  ShoppingBag, 
  Check, 
  ArrowRight,
  Flame,
  Sparkles
} from 'lucide-react';

export default function FeaturedCourses() {
  const { addToCart, cart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [addedIds, setAddedIds] = useState<{ [key: string]: boolean }>({});

  const categories = [
    'Tất cả',
    'Người mới bắt đầu',
    'Tạo ảnh AI',
    'GPTs/Gems',
    'Tự động hóa',
    'Marketing',
    'Chuyên sâu'
  ];

  const filteredCourses = selectedCategory === 'Tất cả'
    ? COURSES
    : COURSES.filter((c) => c.category === selectedCategory);

  const handleAddToCart = (e: React.MouseEvent, course: (typeof COURSES)[0]) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(course);
    setAddedIds((prev) => ({ ...prev, [course.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [course.id]: false }));
    }, 2000);
  };

  return (
    <section className="py-20 relative bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300 uppercase tracking-widest mb-3">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Chương Trình Đào Tạo Thực Chiến</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Khóa Học AI Nổi Bật Nhất
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base">
              Học trực tiếp từ các chuyên gia hàng đầu, cập nhật công nghệ mới nhất 2025.
            </p>
          </div>

          <Link
            href="/khoa-hoc"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 group"
          >
            <span>Xem tất cả khóa học</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Quick Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course Grid: 3 columns desktop, 1 column mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => {
            const isAdded = addedIds[course.id] || cart.some((i) => i.product.id === course.id);

            return (
              <div
                key={course.id}
                className="group relative rounded-3xl bg-slate-900/70 border border-white/10 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-purple-500/40 hover:shadow-[0_10px_30px_-10px_rgba(124,58,237,0.3)] hover:-translate-y-1.5"
              >
                {/* Thumbnail Header with Badge */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                  {/* Badge */}
                  {course.badge && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/50">
                      {course.badge}
                    </span>
                  )}

                  {/* Rating */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-bold text-amber-300">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{course.rating.toFixed(1)}</span>
                    <span className="text-[10px] text-slate-400 font-normal">({course.reviewCount})</span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
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
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                        {course.title}
                      </h3>
                    </Link>

                    <p className="mt-2 text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
                      {course.shortDesc}
                    </p>
                  </div>

                  {/* Instructor & Price Row */}
                  <div className="mt-6 pt-5 border-t border-white/10">
                    {course.instructor && (
                      <div className="flex items-center gap-2.5 mb-4">
                        <img
                          src={course.instructor.avatar}
                          alt={course.instructor.name}
                          className="w-7 h-7 rounded-full object-cover ring-1 ring-white/20"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-slate-300 truncate">{course.instructor.name}</p>
                          <p className="text-[10px] text-slate-500 truncate">{course.instructor.title}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-extrabold text-white">
                            {formatVND(course.salePrice)}
                          </span>
                          <span className="text-xs text-slate-500 line-through">
                            {formatVND(course.price)}
                          </span>
                        </div>
                        <span className="text-[10px] font-semibold text-emerald-400">Tiết kiệm 50%</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/khoa-hoc/${course.slug}`}
                          className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                        >
                          Chi tiết
                        </Link>
                        
                        <button
                          onClick={(e) => handleAddToCart(e, course)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all duration-200 ${
                            isAdded
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              : 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:opacity-90 text-white shadow-md shadow-purple-600/30'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Đã thêm</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Thêm giỏ</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

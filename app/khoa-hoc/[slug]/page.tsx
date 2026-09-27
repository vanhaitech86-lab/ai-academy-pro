'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { COURSES, FAQS } from '@/lib/data';
import { formatVND } from '@/lib/sepay';
import { useCart } from '@/lib/cart-context';
import { 
  Star, 
  Clock, 
  BookOpen, 
  Users, 
  CheckCircle2, 
  Play, 
  ShoppingBag, 
  Zap, 
  ShieldCheck, 
  Infinity as InfinityIcon, 
  Award, 
  ChevronDown, 
  X,
  ArrowRight
} from 'lucide-react';

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<'learn' | 'curriculum' | 'instructor' | 'faq'>('curriculum');
  const [previewVideoOpen, setPreviewVideoOpen] = useState(false);

  const course = COURSES.find((c) => c.slug === resolvedParams.slug) || COURSES[0];
  const relatedCourses = COURSES.filter((c) => c.id !== course.id).slice(0, 2);

  const handleBuyNow = () => {
    addToCart(course);
    router.push('/gio-hang');
  };

  return (
    <div className="pt-28 pb-20">
      {/* Top Breadcrumb & Hero */}
      <div className="bg-slate-950/80 border-b border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
            <Link href="/" className="hover:text-white">Trang chủ</Link>
            <span>/</span>
            <Link href="/khoa-hoc" className="hover:text-white">Khóa học</Link>
            <span>/</span>
            <span className="text-cyan-400 truncate">{course.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
                <span>{course.category}</span>
                <span>•</span>
                <span>{course.level}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {course.title}
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {course.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{course.rating}</span>
                  <span className="text-slate-400 font-normal">({course.reviewCount} đánh giá)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span>{course.studentsCount} học viên đã tham gia</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-pink-400" />
                  <span>{course.duration}</span>
                </div>
              </div>

              {course.instructor && (
                <div className="flex items-center gap-3 pt-3">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/40"
                  />
                  <div>
                    <span className="text-xs text-slate-400 block">Giảng viên hướng dẫn</span>
                    <span className="text-sm font-bold text-white">{course.instructor.name}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Video preview thumbnail on hero */}
            <div className="lg:col-span-4">
              <div
                onClick={() => setPreviewVideoOpen(true)}
                className="relative aspect-video rounded-3xl overflow-hidden border border-white/20 group cursor-pointer shadow-2xl"
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/50 group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-slate-950 ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-center text-xs font-bold text-white bg-black/60 backdrop-blur-md py-1.5 rounded-xl border border-white/10">
                  Xem video giới thiệu khóa học
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout with Sticky Right Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Tab Content */}
          <div className="lg:col-span-8 space-y-10">
            {/* Tabs Navigation */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto scrollbar-none">
              {[
                { id: 'curriculum', label: 'Giáo trình bài học' },
                { id: 'learn', label: 'Bạn sẽ học được gì' },
                { id: 'instructor', label: 'Về giảng viên' },
                { id: 'faq', label: 'Câu hỏi thường gặp' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Curriculum */}
            {activeTab === 'curriculum' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-2">Nội dung chi tiết chương trình</h3>
                <div className="space-y-3">
                  {course.lessons && course.lessons.length > 0 ? (
                    course.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-between gap-4 hover:border-cyan-500/30 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-cyan-400 shrink-0">
                            <Play className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs text-purple-400 block font-semibold">{lesson.chapter}</span>
                            <span className="text-sm font-medium text-white">{lesson.title}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs text-slate-400">{lesson.duration}</span>
                          {lesson.isPreview ? (
                            <button
                              onClick={() => setPreviewVideoOpen(true)}
                              className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30"
                            >
                              Học thử miễn phí
                            </button>
                          ) : (
                            <span className="text-[11px] text-slate-500">Khóa</span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 text-slate-400 text-sm">
                      Giáo trình gồm 35+ bài học video chất lượng cao kèm tài liệu thực hành chi tiết.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: What You Will Learn */}
            {activeTab === 'learn' && (
              <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
                <h3 className="text-xl font-bold text-white">Lợi ích sau khi hoàn thành khóa học</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {course.features?.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-300 leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Instructor */}
            {activeTab === 'instructor' && course.instructor && (
              <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-purple-500/40"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-white">{course.instructor.name}</h3>
                    <p className="text-xs text-cyan-400">{course.instructor.title}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed pt-2">
                  {course.instructor.bio}
                </p>
              </div>
            )}

            {/* Tab 4: FAQ */}
            {activeTab === 'faq' && (
              <div className="space-y-3">
                {FAQS.slice(0, 3).map((f) => (
                  <div key={f.id} className="p-5 rounded-2xl bg-slate-900/60 border border-white/10">
                    <h4 className="text-sm font-bold text-white mb-2">{f.question}</h4>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{f.answer}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Related Courses */}
            <div className="pt-10 border-t border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">Khóa học liên quan</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedCourses.map((rc) => (
                  <Link
                    key={rc.id}
                    href={`/khoa-hoc/${rc.slug}`}
                    className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-purple-500/30 transition-all flex gap-4 group"
                  >
                    <img
                      src={rc.thumbnail}
                      alt={rc.title}
                      className="w-24 h-20 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0 flex flex-col justify-between">
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 line-clamp-2">
                        {rc.title}
                      </h4>
                      <span className="text-sm font-extrabold text-cyan-400">
                        {formatVND(rc.salePrice)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Sticky Checkout Card */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 rounded-3xl bg-slate-900/90 border border-white/15 p-6 shadow-2xl space-y-6">
              <div>
                <span className="text-xs text-slate-400 block mb-1">Giá ưu đãi đặc biệt hôm nay:</span>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-white">
                    {formatVND(course.salePrice)}
                  </span>
                  <span className="text-sm text-slate-500 line-through">
                    {formatVND(course.price)}
                  </span>
                </div>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Tiết kiệm 50% học phí</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleBuyNow}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:opacity-95 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/30 transition-all"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Đăng ký ngay</span>
                </button>

                <button
                  onClick={() => addToCart(course)}
                  className="w-full py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <ShoppingBag className="w-4 h-4 text-cyan-400" />
                  <span>Thêm vào giỏ hàng</span>
                </button>
              </div>

              {/* Guarantee items */}
              <div className="pt-4 border-t border-white/10 space-y-3 text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <InfinityIcon className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Sở hữu trọn đời & Cập nhật bài học mới</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Cấp chứng nhận hoàn thành chuẩn quốc tế</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Cam kết hoàn tiền 100% trong 7 ngày</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Kích hoạt tự động qua SePay VietQR</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal Preview */}
      {previewVideoOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-slate-950 rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <span className="text-sm font-bold text-white">Xem thử bài giảng: {course.title}</span>
              <button
                onClick={() => setPreviewVideoOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Preview Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

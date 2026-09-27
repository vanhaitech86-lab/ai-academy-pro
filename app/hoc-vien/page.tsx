'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { COURSES, SKILLS } from '@/lib/data';
import { 
  BookOpen, 
  Wand2, 
  Clock, 
  Award, 
  User, 
  Play, 
  Download, 
  CheckCircle2, 
  ArrowRight,
  Flame,
  FileText,
  ShieldCheck
} from 'lucide-react';

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState<'courses' | 'skills' | 'orders' | 'certs'>('courses');

  const enrolledCourses = [
    {
      ...COURSES[0],
      progress: 68,
      lastLessonTitle: '2.1 Cấu trúc 5 thành phần của một Prompt hoàn hảo',
      lastLessonId: 'l3'
    },
    {
      ...COURSES[1],
      progress: 32,
      lastLessonTitle: '1.2 Kỹ thuật điều khiển góc camera và ống kính điện ảnh',
      lastLessonId: 'l2'
    }
  ];

  const purchasedSkills = [
    SKILLS[0],
    SKILLS[1]
  ];

  const orderHistory = [
    {
      code: 'AIA-8821',
      date: '27/09/2025',
      items: 'Làm Chủ AI & ChatGPT Toàn Diện + Kho Mega Prompt',
      total: 1380000,
      status: 'Đã thanh toán (SePay VietQR)'
    },
    {
      code: 'AIA-5419',
      date: '15/08/2025',
      items: 'Nghệ Thuật Tạo Ảnh AI Chuyên Nghiệp (Midjourney v6)',
      total: 1290000,
      status: 'Đã thanh toán (SePay VietQR)'
    }
  ];

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Profile Bar */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/10 mb-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
              alt="Học viên"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-cyan-500/40"
            />
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white">Nguyễn Văn An</h1>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                PRO MEMBER
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">an.nguyen@gmail.com · Mã học viên: #STU-9921</p>
            <div className="flex items-center gap-4 mt-2 text-xs text-cyan-400">
              <span>Đang học: 2 khóa học</span>
              <span>•</span>
              <span>2 Skill đã mở khóa</span>
            </div>
          </div>
        </div>

        <Link
          href="/khoa-hoc"
          className="px-5 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center gap-2 transition-colors"
        >
          <span>Đăng ký thêm khóa mới</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-8 overflow-x-auto scrollbar-none">
        {[
          { id: 'courses', label: 'Khóa học của tôi (2)', icon: BookOpen },
          { id: 'skills', label: 'Skill & Workflow đã mua (2)', icon: Wand2 },
          { id: 'orders', label: 'Lịch sử đơn hàng', icon: FileText },
          { id: 'certs', label: 'Chứng chỉ của tôi (1)', icon: Award }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: My Courses */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrolledCourses.map((c) => (
            <div
              key={c.id}
              className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 flex flex-col justify-between hover:border-purple-500/40 transition-all shadow-xl"
            >
              <div>
                <div className="flex gap-4 items-start mb-4">
                  <img
                    src={c.thumbnail}
                    alt={c.title}
                    className="w-24 h-18 rounded-2xl object-cover shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase text-purple-400 block mb-1">
                      {c.category}
                    </span>
                    <h3 className="text-base font-bold text-white line-clamp-2">
                      {c.title}
                    </h3>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5 my-4">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-400">Tiến độ bài học:</span>
                    <span className="text-cyan-400">{c.progress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                      style={{ width: `${c.progress}%` }}
                    />
                  </div>
                </div>

                <p className="text-xs text-slate-400 mb-6 truncate">
                  Đang học dở: <strong className="text-white">{c.lastLessonTitle}</strong>
                </p>
              </div>

              <Link
                href={`/hoc-vien/khoa-hoc/${c.slug}/bai/${c.lastLessonId}`}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 hover:scale-[1.01] transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Tiếp tục học ngay</span>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Skills & Workflows */}
      {activeTab === 'skills' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {purchasedSkills.map((s) => (
            <div
              key={s.id}
              className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={s.thumbnail}
                  alt={s.title}
                  className="w-20 h-20 rounded-2xl object-cover shrink-0"
                />
                <div>
                  <span className="text-[10px] font-bold uppercase text-cyan-400 block mb-1">
                    {s.category}
                  </span>
                  <h4 className="text-sm font-bold text-white line-clamp-1">{s.title}</h4>
                  <p className="text-xs text-slate-400 mt-1">{s.deliveryFormat}</p>
                </div>
              </div>

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Đang tải xuống bộ tài liệu tài nguyên số (Prompt / Workflow)...');
                }}
                className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shrink-0 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải về</span>
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Order History */}
      {activeTab === 'orders' && (
        <div className="rounded-3xl bg-slate-900/80 border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-950 border-b border-white/10 text-slate-400">
                <tr>
                  <th className="p-4">Mã Đơn</th>
                  <th className="p-4">Ngày Mua</th>
                  <th className="p-4">Sản Phẩm</th>
                  <th className="p-4">Số Tiền</th>
                  <th className="p-4">Trạng Thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-200">
                {orderHistory.map((o) => (
                  <tr key={o.code} className="hover:bg-white/[0.02]">
                    <td className="p-4 font-mono font-bold text-cyan-400">{o.code}</td>
                    <td className="p-4 text-slate-400">{o.date}</td>
                    <td className="p-4 font-medium">{o.items}</td>
                    <td className="p-4 font-bold text-white">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(o.total)}
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Certificates */}
      {activeTab === 'certs' && (
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-white/10 text-center max-w-xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">Chứng Nhận: Prompt Engineering Master</h3>
          <p className="text-xs text-slate-400">
            Xác nhận học viên Nguyễn Văn An đã hoàn thành xuất sắc 100% nội dung khóa học và bài kiểm tra thực chiến. Mã xác thực: CERT-AIA-2025-9921.
          </p>
          <button
            onClick={() => alert('Đang xuất chứng chỉ PDF có chữ ký số...')}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs flex items-center gap-2 mx-auto"
          >
            <Download className="w-4 h-4" />
            <span>Tải chứng chỉ PDF</span>
          </button>
        </div>
      )}
    </div>
  );
}

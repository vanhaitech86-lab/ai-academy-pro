'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { COURSES, SKILLS, TOOLS } from '@/lib/data';
import { formatVND } from '@/lib/sepay';
import { 
  BarChart3, 
  ShoppingBag, 
  Users, 
  BookOpen, 
  Layers, 
  Cpu, 
  Bot, 
  ArrowUpRight, 
  ShieldCheck, 
  CheckCircle2, 
  Clock,
  Sparkles,
  RefreshCw,
  Plus
} from 'lucide-react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'orders' | 'sepay_logs' | 'chatbot_kb'>('overview');

  const stats = [
    { title: 'Doanh thu tháng này', value: '185.450.000 ₫', change: '+24.5%', icon: BarChart3, color: 'text-emerald-400' },
    { title: 'Tổng số đơn hàng', value: '246 đơn', change: '+18.2%', icon: ShoppingBag, color: 'text-cyan-400' },
    { title: 'Học viên đăng ký mới', value: '189 học viên', change: '+12.0%', icon: Users, color: 'text-purple-400' },
    { title: 'Tỷ lệ thanh toán tự động', value: '98.8%', change: 'SePay VietQR', icon: ShieldCheck, color: 'text-amber-400' },
  ];

  const recentOrders = [
    { code: 'AIA-9824', name: 'Trần Minh Quang', email: 'quang.tran@gmail.com', amount: 1890000, status: 'paid', time: '10 phút trước' },
    { code: 'AIA-9823', name: 'Nguyễn Thị Hoa', email: 'hoa.nguyen@yahoo.com', amount: 990000, status: 'paid', time: '35 phút trước' },
    { code: 'AIA-9822', name: 'Phạm Đức Duy', email: 'duy.pham@gmail.com', amount: 1290000, status: 'paid', time: '1 giờ trước' },
    { code: 'AIA-9821', name: 'Lê Thu Trang', email: 'trang.le@outlook.com', amount: 390000, status: 'pending', time: '2 giờ trước' },
  ];

  const sepayWebhookLogs = [
    { id: 'LOG-7712', amount: 1890000, content: 'Chuyen tien AIA-9824', bank: 'MBBank', ref: 'FT250927001', processed: true, time: '21:45:10' },
    { id: 'LOG-7711', amount: 990000, content: 'AIA-9823 CK khoa hoc AI', bank: 'MBBank', ref: 'FT250927002', processed: true, time: '21:20:04' },
    { id: 'LOG-7710', amount: 1290000, content: 'Thanh toan don AIA-9822', bank: 'MBBank', ref: 'FT250927003', processed: true, time: '20:55:30' },
  ];

  const chatbotKnowledge = [
    { q: 'Khóa học dành cho đối tượng nào?', a: 'Khóa học được thiết kế cho cả người mới bắt đầu không biết code và người đã có kinh nghiệm muốn tăng tốc bằng AI.', category: 'Tuyển sinh' },
    { q: 'Thời gian kích hoạt sau khi chuyển khoản SePay là bao lâu?', a: 'Hệ thống tự động kích hoạt ngay sau 3 đến 5 giây qua webhook thời gian thực.', category: 'Thanh toán' },
    { q: 'Học viên có được hỗ trợ sau khóa học không?', a: 'Có, học viên được hỗ trợ 1-1 trọn đời trong group VIP Zalo và Zoom hỏi đáp định kỳ.', category: 'Hỗ trợ' }
  ];

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300 uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Admin Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Quản Trị AI Academy Pro</h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300"
          >
            Xem Website
          </Link>
          <button
            onClick={() => alert('Đang mở form tạo khóa học mới...')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-purple-600/30"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Khóa Học / Skill</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.title} className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-slate-400 font-medium">{s.title}</span>
                <div className={`p-2 rounded-xl bg-white/5 ${s.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-black text-white block">{s.value}</span>
                <span className="text-xs text-emerald-400 font-semibold mt-1 block">{s.change} so với tháng trước</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-8 overflow-x-auto scrollbar-none">
        {[
          { id: 'overview', label: 'Đơn Hàng Gần Đây' },
          { id: 'courses', label: 'Quản Lý Khóa Học' },
          { id: 'sepay_logs', label: 'Nhật Ký Webhook SePay' },
          { id: 'chatbot_kb', label: 'Kiến Thức Chatbot (RAG)' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Orders */}
      {activeTab === 'overview' && (
        <div className="rounded-3xl bg-slate-900/80 border border-white/10 overflow-hidden shadow-2xl">
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Đơn hàng mới nhất thời gian thực</h3>
            <span className="text-xs text-cyan-400 flex items-center gap-1">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              Đang đồng bộ SePay Webhook
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-950 text-slate-400 border-b border-white/10">
                <tr>
                  <th className="p-4">Mã Đơn</th>
                  <th className="p-4">Học Viên</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Số Tiền</th>
                  <th className="p-4">Trạng Thái</th>
                  <th className="p-4">Thời Gian</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-200">
                {recentOrders.map((o) => (
                  <tr key={o.code} className="hover:bg-white/[0.02]">
                    <td className="p-4 font-mono font-bold text-cyan-400">{o.code}</td>
                    <td className="p-4 font-semibold text-white">{o.name}</td>
                    <td className="p-4 text-slate-400">{o.email}</td>
                    <td className="p-4 font-bold text-white">{formatVND(o.amount)}</td>
                    <td className="p-4">
                      {o.status === 'paid' ? (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Đã thanh toán
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Chờ chuyển khoản
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-slate-500 text-xs">{o.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Courses */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES.map((c) => (
            <div key={c.id} className="p-5 rounded-3xl bg-slate-900/80 border border-white/10 space-y-4">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950">
                <img src={c.thumbnail} alt={c.title} className="w-full h-full object-cover" />
              </div>
              <h4 className="text-sm font-bold text-white line-clamp-1">{c.title}</h4>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{c.studentsCount} học viên</span>
                <span className="font-bold text-cyan-400">{formatVND(c.salePrice)}</span>
              </div>
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => alert(`Đang sửa khóa: ${c.title}`)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-white"
                >
                  Chỉnh sửa
                </button>
                <Link
                  href={`/khoa-hoc/${c.slug}`}
                  className="text-xs text-cyan-400 hover:underline"
                >
                  Xem trang công khai
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: SePay Webhook Logs */}
      {activeTab === 'sepay_logs' && (
        <div className="rounded-3xl bg-slate-900/80 border border-white/10 overflow-hidden">
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Nhật ký Webhook thanh toán SePay (/api/sepay/webhook)</h3>
              <p className="text-xs text-slate-400 mt-0.5">Mọi giao dịch VietQR đều được lưu vết chi tiết để đối soát.</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
              Webhook Active (200 OK)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-950 text-slate-400 border-b border-white/10">
                <tr>
                  <th className="p-4">Log ID</th>
                  <th className="p-4">Nội Dung Chuyển Khoản</th>
                  <th className="p-4">Số Tiền</th>
                  <th className="p-4">Ngân Hàng</th>
                  <th className="p-4">Mã Tham Chiếu</th>
                  <th className="p-4">Xử Lý</th>
                  <th className="p-4">Thời Gian</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-200 font-mono text-xs">
                {sepayWebhookLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/[0.02]">
                    <td className="p-4 text-purple-400 font-bold">{log.id}</td>
                    <td className="p-4 font-sans font-semibold text-white">{log.content}</td>
                    <td className="p-4 text-emerald-400 font-bold">{formatVND(log.amount)}</td>
                    <td className="p-4 text-slate-300">{log.bank}</td>
                    <td className="p-4 text-slate-400">{log.ref}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-sans font-bold text-[11px]">
                        Thành công
                      </span>
                    </td>
                    <td className="p-4 text-slate-500">{log.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Chatbot Knowledge Management */}
      {activeTab === 'chatbot_kb' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Kho tri thức Chatbot AI (/api/chat)</h3>
            <button
              onClick={() => alert('Mở popup thêm câu hỏi RAG mới...')}
              className="px-3.5 py-1.5 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold"
            >
              + Thêm câu hỏi & trả lời
            </button>
          </div>

          <div className="space-y-3">
            {chatbotKnowledge.map((kb, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400 uppercase">{kb.category}</span>
                  <button className="text-xs text-slate-400 hover:text-white">Chỉnh sửa</button>
                </div>
                <h4 className="text-sm font-bold text-white">Q: {kb.q}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">A: {kb.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

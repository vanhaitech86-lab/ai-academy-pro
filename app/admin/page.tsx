'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { COURSES, SKILLS, TOOLS } from '@/lib/data';
import { formatVND } from '@/lib/sepay';
import { useAuth, AuthUser } from '@/lib/auth-context';
import { 
  BarChart3, 
  ShoppingCart, 
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
  Plus,
  Search,
  KeyRound,
  Lock,
  Unlock,
  Trash2,
  Edit,
  Mail,
  Phone,
  UserCheck,
  X,
  AlertCircle
} from 'lucide-react';

export default function AdminPage() {
  const { 
    user, 
    getAllCustomers, 
    resetCustomerPassword, 
    toggleCustomerStatus, 
    deleteCustomer, 
    updateAdminPassword 
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'customers' | 'overview' | 'courses' | 'sepay_logs' | 'admin_security' | 'chatbot_kb'>('customers');
  const [customers, setCustomers] = useState<AuthUser[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'locked'>('all');

  // Modal for changing a customer's password
  const [selectedCustomer, setSelectedCustomer] = useState<AuthUser | null>(null);
  const [newCustomerPass, setNewCustomerPass] = useState('');
  const [passSuccessMsg, setPassSuccessMsg] = useState('');

  // Admin password change form
  const [adminNewPass, setAdminNewPass] = useState('');
  const [adminConfirmPass, setAdminConfirmPass] = useState('');
  const [adminPassMsg, setAdminPassMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Load customers
  const refreshCustomers = () => {
    setCustomers(getAllCustomers());
  };

  useEffect(() => {
    refreshCustomers();
  }, []);

  const filteredCustomers = customers.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    const matchQuery = 
      c.name.toLowerCase().includes(q) || 
      c.email.toLowerCase().includes(q) || 
      (c.phone && c.phone.includes(q));
    
    if (statusFilter === 'all') return matchQuery;
    return matchQuery && (c.status || 'active') === statusFilter;
  });

  const handleSaveCustomerPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer || newCustomerPass.length < 6) {
      alert('Mật khẩu tối thiểu 6 ký tự.');
      return;
    }
    resetCustomerPassword(selectedCustomer.id, newCustomerPass);
    setPassSuccessMsg(`Đã đổi mật khẩu cho ${selectedCustomer.name} thành "${newCustomerPass}" thành công!`);
    refreshCustomers();
    setTimeout(() => {
      setSelectedCustomer(null);
      setNewCustomerPass('');
      setPassSuccessMsg('');
    }, 1800);
  };

  const handleToggleStatus = (id: string) => {
    toggleCustomerStatus(id);
    refreshCustomers();
  };

  const handleDeleteCustomer = (id: string, name: string) => {
    if (confirm(`Bạn có chắc muốn xóa khách hàng "${name}" không?`)) {
      deleteCustomer(id);
      refreshCustomers();
    }
  };

  const handleAdminChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminPassMsg(null);

    if (adminNewPass.length < 6) {
      setAdminPassMsg({ type: 'error', text: 'Mật khẩu mới phải có ít nhất 6 ký tự.' });
      return;
    }
    if (adminNewPass !== adminConfirmPass) {
      setAdminPassMsg({ type: 'error', text: 'Mật khẩu xác nhận không khớp.' });
      return;
    }

    const ok = updateAdminPassword(adminNewPass);
    if (ok) {
      setAdminPassMsg({ type: 'success', text: 'Đã đổi mật khẩu Admin thành công! Hãy lưu lại mật khẩu mới.' });
      setAdminNewPass('');
      setAdminConfirmPass('');
      refreshCustomers();
    } else {
      setAdminPassMsg({ type: 'error', text: 'Không thể cập nhật mật khẩu. Vui lòng thử lại.' });
    }
  };

  const stats = [
    { title: 'Tổng Khách Hàng / Học Viên', value: `${customers.length} thành viên`, change: 'Dữ liệu thực', icon: Users, color: 'text-purple-400' },
    { title: 'Doanh thu tháng này', value: '185.450.000 ₫', change: '+24.5%', icon: BarChart3, color: 'text-emerald-400' },
    { title: 'Tổng số đơn hàng', value: '246 đơn', change: '+18.2%', icon: ShoppingCart, color: 'text-cyan-400' },
    { title: 'Tỷ lệ thanh toán tự động', value: '98.8%', change: 'SePay VietQR', icon: ShieldCheck, color: 'text-amber-400' },
  ];

  const recentOrders = [
    { code: 'AIA-9824', name: 'Trần Minh Quang', email: 'quang.tran@gmail.com', amount: 1890000, status: 'paid', time: '10 phút trước' },
    { code: 'AIA-9823', name: 'Nguyễn Thị Hoa', email: 'hoa.nguyen@yahoo.com', amount: 990000, status: 'paid', time: '35 phút trước' },
    { code: 'AIA-9822', name: 'Phạm Đức Duy', email: 'duy.pham@gmail.com', amount: 1290000, status: 'paid', time: '1 giờ trước' },
    { code: 'AIA-9821', name: 'Lê Thu Trang', email: 'trang.le@outlook.com', amount: 390000, status: 'pending', time: '2 giờ trước' },
  ];

  const sepayWebhookLogs = [
    { id: 'LOG-7712', amount: 1890000, content: 'Chuyen tien AIA-9824', bank: 'Techcombank', ref: 'FT250927001', processed: true, time: '21:45:10' },
    { id: 'LOG-7711', amount: 990000, content: 'AIA-9823 CK khoa hoc AI', bank: 'Techcombank', ref: 'FT250927002', processed: true, time: '21:20:04' },
    { id: 'LOG-7710', amount: 1290000, content: 'Thanh toan don AIA-9822', bank: 'Techcombank', ref: 'FT250927003', processed: true, time: '20:55:30' },
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
            <span>Admin Control Center · vanhaitech.86@gmail.com</span>
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
            onClick={() => setActiveTab('customers')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-purple-600/30"
          >
            <Users className="w-4 h-4" />
            <span>Quản Lý Học Viên ({customers.length})</span>
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
                <span className="text-xs text-emerald-400 font-semibold mt-1 block">{s.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-8 overflow-x-auto scrollbar-none">
        {[
          { id: 'customers', label: `Quản Lý Khách Hàng (${customers.length})` },
          { id: 'admin_security', label: 'Tài Khoản Admin & Đổi Mật Khẩu' },
          { id: 'overview', label: 'Đơn Hàng Gần Đây' },
          { id: 'courses', label: 'Quản Lý Khóa Học & Skill' },
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

      {/* Tab: Quản Lý Khách Hàng (Customer Management) */}
      {activeTab === 'customers' && (
        <div className="space-y-6">
          {/* Search & Filter Toolbar */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm tên, email hoặc số điện thoại..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-slate-400 shrink-0">Lọc trạng thái:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="all">Tất cả ({customers.length})</option>
                <option value="active">Hoạt động</option>
                <option value="locked">Tạm khóa</option>
              </select>
              <button
                onClick={refreshCustomers}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300"
                title="Làm mới danh sách"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Customers Table */}
          <div className="rounded-3xl bg-slate-900/80 border border-white/10 overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Danh sách Khách Hàng / Học Viên</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Khách hàng có thể đăng nhập bằng Email hoặc Số điện thoại. Bạn có thể tự tạo hoặc đổi mật khẩu cho khách hàng tại đây.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                {filteredCustomers.length} khách hàng
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-950 text-slate-400 border-b border-white/10">
                  <tr>
                    <th className="p-4">Khách Hàng / Học Viên</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Số Điện Thoại</th>
                    <th className="p-4">Vai Trò</th>
                    <th className="p-4">Trạng Thái</th>
                    <th className="p-4">Ngày Tham Gia</th>
                    <th className="p-4 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  {filteredCustomers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-400">
                        Không tìm thấy khách hàng nào khớp với tìm kiếm.
                      </td>
                    </tr>
                  ) : (
                    filteredCustomers.map((cust) => (
                      <tr key={cust.id} className="hover:bg-white/[0.02]">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={cust.avatar}
                              alt={cust.name}
                              className="w-9 h-9 rounded-full object-cover border border-white/10"
                            />
                            <div>
                              <p className="font-bold text-white">{cust.name}</p>
                              <span className="text-[10px] text-slate-500 font-mono">ID: {cust.id}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-cyan-300 font-medium">
                          <div className="flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span>{cust.email}</span>
                          </div>
                        </td>
                        <td className="p-4 font-semibold text-slate-300">
                          <div className="flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span>{cust.phone || 'Chưa cập nhật'}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          {cust.role === 'admin' ? (
                            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[11px] font-bold border border-purple-500/30">
                              👑 Quản trị viên
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-300 text-[11px] font-medium border border-blue-500/20">
                              Học viên VIP
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          {cust.status === 'locked' ? (
                            <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 text-[11px] font-semibold border border-red-500/30">
                              Tạm khóa
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold border border-emerald-500/30">
                              Hoạt động
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-slate-400 text-xs">
                          {cust.joinedDate || '2025-01-01'}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {/* Reset Password Button */}
                            <button
                              onClick={() => {
                                setSelectedCustomer(cust);
                                setNewCustomerPass('');
                                setPassSuccessMsg('');
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-semibold flex items-center gap-1 border border-cyan-500/30 transition-all"
                              title="Tạo / Đổi mật khẩu cho khách hàng"
                            >
                              <KeyRound className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Đổi MK</span>
                            </button>

                            {/* Lock / Unlock Toggle */}
                            {cust.email.toLowerCase() !== 'vanhaitech.86@gmail.com' && (
                              <button
                                onClick={() => handleToggleStatus(cust.id)}
                                className={`p-1.5 rounded-lg border transition-all ${
                                  cust.status === 'locked'
                                    ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30'
                                    : 'bg-slate-800 hover:bg-slate-700 text-slate-400 border-white/10'
                                }`}
                                title={cust.status === 'locked' ? 'Mở khóa tài khoản' : 'Tạm khóa tài khoản'}
                              >
                                {cust.status === 'locked' ? (
                                  <Unlock className="w-3.5 h-3.5" />
                                ) : (
                                  <Lock className="w-3.5 h-3.5" />
                                )}
                              </button>
                            )}

                            {/* Delete Button */}
                            {cust.email.toLowerCase() !== 'vanhaitech.86@gmail.com' && (
                              <button
                                onClick={() => handleDeleteCustomer(cust.id, cust.name)}
                                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-all"
                                title="Xóa khách hàng"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Admin Security & Change Password */}
      {activeTab === 'admin_security' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="p-8 rounded-3xl bg-slate-900/90 border border-purple-500/30 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Tài Khoản Quản Trị Viên (Admin)</h3>
                <p className="text-xs text-slate-300">
                  Tài khoản quyền lực cao nhất của hệ thống AI Academy Pro
                </p>
              </div>
            </div>

            {/* Admin Info Card */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-2 mb-6">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Email Admin:</span>
                <span className="font-bold text-cyan-300">vanhaitech.86@gmail.com</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Số điện thoại Admin:</span>
                <span className="font-bold text-white">0978076936</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Quyền hạn:</span>
                <span className="font-bold text-emerald-400">Super Admin (Toàn quyền)</span>
              </div>
            </div>

            {/* Change Admin Password Form */}
            <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-purple-400" />
              <span>Tự Đổi / Sửa Mật Khẩu Admin</span>
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              Bạn có thể tự đặt bất kỳ mật khẩu nào bạn muốn cho tài khoản <strong>vanhaitech.86@gmail.com</strong>.
            </p>

            {adminPassMsg && (
              <div
                className={`p-3 rounded-xl text-xs mb-4 flex items-center gap-2 ${
                  adminPassMsg.type === 'success'
                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                    : 'bg-red-500/10 border border-red-500/30 text-red-400'
                }`}
              >
                {adminPassMsg.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                <span>{adminPassMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleAdminChangePassword} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Mật khẩu Admin mới (tối thiểu 6 ký tự)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={adminNewPass}
                    onChange={(e) => setAdminNewPass(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Xác nhận lại mật khẩu Admin mới
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={adminConfirmPass}
                    onChange={(e) => setAdminConfirmPass(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:opacity-95 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.01]"
              >
                <KeyRound className="w-4 h-4" />
                <span>Lưu & Cập Nhật Mật Khẩu Admin</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tab: Overview (Recent Orders) */}
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
                    <td className="p-4 font-medium text-white">{o.name}</td>
                    <td className="p-4 text-slate-400">{o.email}</td>
                    <td className="p-4 font-bold text-emerald-400">{formatVND(o.amount)}</td>
                    <td className="p-4">
                      {o.status === 'paid' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-semibold">
                          <CheckCircle2 className="w-3 h-3" />
                          Đã thanh toán
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[11px] font-semibold">
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

      {/* Tab: Courses & Skills */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES.map((c) => (
            <div key={c.id} className="p-5 rounded-3xl bg-slate-900/80 border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                  Khóa học Video
                </span>
                <h4 className="text-base font-bold text-white mt-3 line-clamp-1">{c.title}</h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{c.shortDesc || c.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-emerald-400 font-extrabold text-sm">{formatVND(c.salePrice)}</span>
                  <span className="text-slate-500 text-xs line-through">{formatVND(c.price)}</span>
                </div>
              </div>
              <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between">
                <span className="text-xs text-slate-400">{c.lessons?.length || 12} bài học</span>
                <Link
                  href={`/khoa-hoc/${c.slug}`}
                  className="text-xs text-cyan-400 font-semibold hover:underline flex items-center gap-1"
                >
                  <span>Xem</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: SePay Webhook Logs */}
      {activeTab === 'sepay_logs' && (
        <div className="rounded-3xl bg-slate-900/80 border border-white/10 overflow-hidden shadow-2xl">
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Lịch sử SePay Webhook Transactions</h3>
            <span className="text-xs text-slate-400">Endpoint: /api/sepay/webhook</span>
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

      {/* Tab: Chatbot Knowledge Management */}
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

      {/* Modal: Đổi Mật Khẩu Khách Hàng */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-cyan-500/30 p-6 shadow-2xl">
            <button
              onClick={() => setSelectedCustomer(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Đặt Lại Mật Khẩu Khách Hàng</h4>
                <p className="text-xs text-slate-400">{selectedCustomer.name} ({selectedCustomer.email})</p>
              </div>
            </div>

            {passSuccessMsg ? (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>{passSuccessMsg}</span>
              </div>
            ) : (
              <form onSubmit={handleSaveCustomerPassword} className="space-y-4">
                <div className="p-3 rounded-xl bg-slate-950 text-xs space-y-1 text-slate-300 border border-white/10">
                  <p>Số điện thoại: <strong>{selectedCustomer.phone || 'Chưa cập nhật'}</strong></p>
                  <p>Khách hàng có thể đăng nhập bằng Email hoặc Số điện thoại sau khi bạn đổi mật khẩu.</p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Mật khẩu mới cho khách hàng (ít nhất 6 ký tự)
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={newCustomerPass}
                      onChange={(e) => setNewCustomerPass(e.target.value)}
                      placeholder="Ví dụ: 12345678"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-slate-950 font-black text-xs shadow-lg hover:opacity-95"
                  >
                    Lưu Mật Khẩu Mới
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCustomer(null)}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

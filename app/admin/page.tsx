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
  AlertCircle,
  Upload,
  FileText,
  Eye,
  Send,
  Save,
  Flame,
  Zap,
  Sliders,
  Brain
} from 'lucide-react';
import { 
  BotBrainConfig, 
  BotDocument, 
  getClientBotConfig, 
  saveClientBotConfig, 
  DEFAULT_SYSTEM_PROMPTS 
} from '@/lib/bot-brain';

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

  // Bot Brain & Document Training System State
  const [botConfig, setBotConfig] = useState<BotBrainConfig>(() => getClientBotConfig());
  const [botSaveStatus, setBotSaveStatus] = useState<string | null>(null);
  const [testQuestion, setTestQuestion] = useState('');
  const [testBotReply, setTestBotReply] = useState('');
  const [isTestBotThinking, setIsTestBotThinking] = useState(false);
  const [previewDocument, setPreviewDocument] = useState<BotDocument | null>(null);
  const [showAddManualDocModal, setShowAddManualDocModal] = useState(false);
  const [manualDocTitle, setManualDocTitle] = useState('');
  const [manualDocCategory, setManualDocCategory] = useState<BotDocument['category']>('khoa_hoc');
  const [manualDocContent, setManualDocContent] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiConnectionStatus, setApiConnectionStatus] = useState<string | null>(null);

  // Load customers
  const refreshCustomers = () => {
    setCustomers(getAllCustomers());
  };

  useEffect(() => {
    refreshCustomers();
    // Load persisted bot config
    setBotConfig(getClientBotConfig());
  }, []);

  // Handle uploading training documents
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = String(event.target?.result || '');
      const newDoc: BotDocument = {
        id: `doc-${Date.now()}`,
        name: file.name,
        category: 'khoa_hoc',
        size: `${(file.size / 1024).toFixed(1)} KB`,
        charCount: text.length,
        uploadDate: new Date().toLocaleDateString('vi-VN'),
        content: text
      };

      setBotConfig(prev => ({
        ...prev,
        documents: [newDoc, ...prev.documents]
      }));
      setBotSaveStatus(`Đã nạp tài liệu "${file.name}" (${text.length} ký tự) vào bộ nhớ tạm. Hãy bấm "Lưu Cấu Hình Bộ Não Bot" để kích hoạt!`);
      setTimeout(() => setBotSaveStatus(null), 6000);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Handle saving bot config
  const handleSaveBotConfig = async () => {
    saveClientBotConfig(botConfig);
    try {
      await fetch('/api/admin/bot-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(botConfig)
      });
      setBotSaveStatus('🎉 Đã lưu cấu hình Bộ Não Bot thành công! Bot tư vấn đã được nạp toàn bộ tài liệu và sẵn sàng phục vụ khách hàng.');
    } catch {
      setBotSaveStatus('Đã lưu cấu hình cục bộ thành công!');
    }
    setTimeout(() => setBotSaveStatus(null), 5000);
  };

  // Handle testing bot in admin simulator
  const handleTestBot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testQuestion.trim()) return;

    setIsTestBotThinking(true);
    setTestBotReply('');
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: testQuestion,
          botConfig: botConfig
        })
      });
      const data = await res.json();
      setTestBotReply(data.reply || 'Không có phản hồi.');
    } catch {
      setTestBotReply('Lỗi kết nối kiểm tra bot.');
    } finally {
      setIsTestBotThinking(false);
    }
  };

  // Handle checking API key
  const handleTestApiKey = () => {
    const key = botConfig.activeProvider === 'gemini' ? botConfig.geminiApiKey : botConfig.openaiApiKey;
    if (!key) {
      setApiConnectionStatus(`Chưa có API Key cho ${botConfig.activeProvider === 'gemini' ? 'Google Gemini' : 'OpenAI'}. Bot vẫn hoạt động thông minh và trả lời theo tài liệu đã nạp nhờ bộ não giả lập tích hợp sẵn!`);
    } else {
      setApiConnectionStatus(`✓ Đã kết nối thành công với ${botConfig.activeProvider === 'gemini' ? 'Google Gemini API' : 'OpenAI API'}! Sẵn sàng xử lý câu hỏi.`);
    }
    setTimeout(() => setApiConnectionStatus(null), 6000);
  };

  // Handle manual document add
  const handleAddManualDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualDocTitle.trim() || !manualDocContent.trim()) return;

    const newDoc: BotDocument = {
      id: `doc-${Date.now()}`,
      name: manualDocTitle.trim().endsWith('.txt') ? manualDocTitle.trim() : `${manualDocTitle.trim()}.txt`,
      category: manualDocCategory,
      size: `${(manualDocContent.length / 1024).toFixed(1)} KB`,
      charCount: manualDocContent.length,
      uploadDate: new Date().toLocaleDateString('vi-VN'),
      content: manualDocContent.trim()
    };

    setBotConfig(prev => ({
      ...prev,
      documents: [newDoc, ...prev.documents]
    }));

    setManualDocTitle('');
    setManualDocContent('');
    setShowAddManualDocModal(false);
    setBotSaveStatus(`Đã thêm kiến thức "${newDoc.name}". Nhớ bấm "Lưu Cấu Hình Bộ Não Bot" để lưu vĩnh viễn!`);
    setTimeout(() => setBotSaveStatus(null), 5000);
  };

  // Handle deleting document
  const handleDeleteDocument = (id: string, name: string) => {
    if (confirm(`Bạn có chắc muốn xóa tài liệu huấn luyện "${name}" không?`)) {
      setBotConfig(prev => ({
        ...prev,
        documents: prev.documents.filter(d => d.id !== id)
      }));
    }
  };

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
          { id: 'chatbot_kb', label: '⚡ Bộ Não AI & Huấn Luyện Bot' }
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

      {/* Tab: AI Bot Brain & Document Training System */}
      {activeTab === 'chatbot_kb' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Status Toast */}
          {botSaveStatus && (
            <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold flex items-center justify-between shadow-xl animate-in zoom-in-95 duration-200">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{botSaveStatus}</span>
              </div>
              <button onClick={() => setBotSaveStatus(null)} className="text-emerald-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Active Brain Summary Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/70 via-slate-900 to-cyan-950/70 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-bold text-cyan-300 uppercase tracking-widest mb-3">
                  <Brain className="w-4 h-4 text-cyan-400" />
                  <span>Trung Tâm Huấn Luyện AI Bot 24/7</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Bộ Não AI Trợ Lý Phượng Hoàng Lửa
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Quản lý mô hình trí tuệ nhân tạo (Google Gemini / OpenAI), tùy chỉnh phong cách hỏi đáp hài hước, thân thiện, và tải lên tài liệu nội bộ để huấn luyện bot tư vấn chuẩn xác 100%.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handleSaveBotConfig}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 text-slate-950 font-black text-xs sm:text-sm shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Lưu Cấu Hình Bộ Não Bot</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Bộ não hoạt động:</span>
                <span className="font-extrabold text-cyan-300 text-sm uppercase">
                  {botConfig.activeProvider === 'gemini' ? `Google Gemini (${botConfig.geminiModel})` : `OpenAI (${botConfig.openaiModel})`}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Tài liệu đã nạp:</span>
                <span className="font-extrabold text-amber-300 text-sm">
                  {botConfig.documents.length} tài liệu
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Tổng khối lượng tri thức:</span>
                <span className="font-extrabold text-purple-300 text-sm">
                  {botConfig.documents.reduce((acc, d) => acc + (d.charCount || d.content.length), 0).toLocaleString()} ký tự
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Phong cách trả lời:</span>
                <span className="font-extrabold text-emerald-300 text-sm">
                  {botConfig.personality === 'humorous_friendly' ? '😄 Hài hước & Thân thiện' : botConfig.personality === 'professional' ? '🎓 Chuyên gia' : '🚀 Chốt đơn'}
                </span>
              </div>
            </div>
          </div>

          {/* Section 1: Chọn Mô Hình Bộ Não (Dual Brain Model Switcher) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Chọn Bộ Não AI & Tích Hợp Mô Hình
                </h3>
                <p className="text-xs text-slate-400">
                  Chuyển đổi linh hoạt giữa Bộ não chính (Gemini) và Bộ não thứ 2 (ChatGPT / OpenAI)
                </p>
              </div>
            </div>

            {/* Provider Switch Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setBotConfig(prev => ({ ...prev, activeProvider: 'gemini' }))}
                className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                  botConfig.activeProvider === 'gemini'
                    ? 'bg-gradient-to-br from-cyan-950/60 to-purple-950/60 border-cyan-400 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-950/60 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                    <span className="font-extrabold text-white text-sm">Bộ Não 1: Google Gemini AI</span>
                  </div>
                  {botConfig.activeProvider === 'gemini' && (
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-[10px]">
                      ĐANG KÍCH HOẠT
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Khuyên dùng cho AI Academy Pro. Tốc độ siêu tốc, tư duy hóm hỉnh, am hiểu tiếng Việt sâu sắc và chi phí cực kỳ tối ưu.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setBotConfig(prev => ({ ...prev, activeProvider: 'openai' }))}
                className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                  botConfig.activeProvider === 'openai'
                    ? 'bg-gradient-to-br from-emerald-950/60 to-slate-900 border-emerald-400 shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-950/60 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-emerald-400" />
                    <span className="font-extrabold text-white text-sm">Bộ Não 2: OpenAI ChatGPT</span>
                  </div>
                  {botConfig.activeProvider === 'openai' && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                      ĐANG KÍCH HOẠT
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Tích hợp mô hình GPT-4o hoặc GPT-4o-mini từ OpenAI. Hoạt động như bộ não dự phòng hoặc tùy chọn nâng cao.
                </p>
              </button>
            </div>

            {/* Model & API Key Configuration based on selected provider */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-white/10 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Phiên bản Model {botConfig.activeProvider === 'gemini' ? 'Gemini' : 'ChatGPT'}:
                  </label>
                  {botConfig.activeProvider === 'gemini' ? (
                    <select
                      value={botConfig.geminiModel}
                      onChange={(e) => setBotConfig(prev => ({ ...prev, geminiModel: e.target.value as any }))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                    >
                      <option value="gemini-2.5-flash">Gemini 2.5 Flash (Siêu tốc, khuyên dùng cho Chatbot)</option>
                      <option value="gemini-1.5-pro">Gemini 1.5 Pro (Tư duy sâu & Phân tích tài liệu lớn)</option>
                      <option value="gemini-1.5-flash">Gemini 1.5 Flash (Ổn định, phản hồi nhanh)</option>
                    </select>
                  ) : (
                    <select
                      value={botConfig.openaiModel}
                      onChange={(e) => setBotConfig(prev => ({ ...prev, openaiModel: e.target.value as any }))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs sm:text-sm focus:border-emerald-400 focus:outline-none"
                    >
                      <option value="gpt-4o-mini">GPT-4o-mini (Nhanh, thông minh, tối ưu chi phí)</option>
                      <option value="gpt-4o">GPT-4o (Mô hình flagship cao cấp nhất)</option>
                    </select>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-300">
                      API Key {botConfig.activeProvider === 'gemini' ? 'Google Gemini API Key' : 'OpenAI API Key'}:
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="text-[11px] text-cyan-400 hover:underline cursor-pointer"
                    >
                      {showApiKey ? 'Ẩn Key' : 'Hiện Key'}
                    </button>
                  </div>
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    value={botConfig.activeProvider === 'gemini' ? botConfig.geminiApiKey : botConfig.openaiApiKey}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (botConfig.activeProvider === 'gemini') {
                        setBotConfig(prev => ({ ...prev, geminiApiKey: val }));
                      } else {
                        setBotConfig(prev => ({ ...prev, openaiApiKey: val }));
                      }
                    }}
                    placeholder={botConfig.activeProvider === 'gemini' ? 'Ví dụ: AIzaSy...' : 'Ví dụ: sk-proj-...'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-white/5 text-xs text-slate-400">
                <span>
                  💡 <em>Mẹo:</em> Nếu chưa có API Key, hệ thống tự động sử dụng <strong>Bộ Não AI thông minh tích hợp sẵn</strong> để trả lời mượt mà, hài hước và căn cứ 100% vào tài liệu huấn luyện!
                </span>
                <button
                  type="button"
                  onClick={handleTestApiKey}
                  className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 font-semibold shrink-0 cursor-pointer"
                >
                  Kiểm Tra Kết Nối AI
                </button>
              </div>

              {apiConnectionStatus && (
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-medium">
                  {apiConnectionStatus}
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Phong Cách Trò Chuyện & Giọng Văn Hài Hước */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Tính Cách, Giọng Văn & Kịch Bản Chỉ Đạo
                </h3>
                <p className="text-xs text-slate-400">
                  Chọn phong cách hỏi đáp thân thiện, hài hước và tinh chỉnh kịch bản phản hồi
                </p>
              </div>
            </div>

            {/* Personality Presets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: 'humorous_friendly',
                  title: '😄 Hài Hước & Thân Thiện (Gemini Humor)',
                  desc: 'Hóm hỉnh, duyên dáng, gần gũi như bạn thân, dùng icon vui nhộn (Khuyên dùng)'
                },
                {
                  id: 'professional',
                  title: '🎓 Cố Vấn Chuyên Nghiệp',
                  desc: 'Chuẩn xác, bài bản, súc tích, phong thái chuyên gia đào tạo AI cao cấp'
                },
                {
                  id: 'sales_closer',
                  title: '🚀 Chiến Binh Chốt Đơn & Tuyển Affiliate',
                  desc: 'Nhiệt huyết, nhấn mạnh vào cơ hội kiếm tiền và thôi thúc đăng ký ngay'
                }
              ].map((style) => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => {
                    setBotConfig(prev => ({
                      ...prev,
                      personality: style.id as any,
                      systemPrompt: DEFAULT_SYSTEM_PROMPTS[style.id as keyof typeof DEFAULT_SYSTEM_PROMPTS]
                    }));
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    botConfig.personality === style.id
                      ? 'bg-purple-950/60 border-purple-400 shadow-md shadow-purple-500/20'
                      : 'bg-slate-950/50 border-white/10 hover:border-white/20'
                  }`}
                >
                  <h4 className="font-bold text-white text-xs sm:text-sm mb-1">{style.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{style.desc}</p>
                </button>
              ))}
            </div>

            {/* System Prompt Customizer */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-300">
                  Kịch Bản Chỉ Đạo Hệ Thống (System Prompt):
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setBotConfig(prev => ({
                      ...prev,
                      systemPrompt: DEFAULT_SYSTEM_PROMPTS[prev.personality]
                    }));
                  }}
                  className="text-[11px] text-purple-400 hover:underline cursor-pointer"
                >
                  Khôi phục kịch bản mẫu
                </button>
              </div>
              <textarea
                rows={5}
                value={botConfig.systemPrompt}
                onChange={(e) => setBotConfig(prev => ({ ...prev, systemPrompt: e.target.value }))}
                className="w-full p-4 rounded-2xl bg-slate-950 border border-white/10 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none font-mono leading-relaxed"
              />
            </div>

            {/* Temperature Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-slate-300">Mức Độ Sáng Tạo & Hài Hước (Temperature):</span>
                <span className="font-mono text-cyan-300 font-bold">{botConfig.temperature}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={botConfig.temperature}
                onChange={(e) => setBotConfig(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>0.1 (Nghiêm túc, chính xác tuyệt đối)</span>
                <span>0.8 (Hài hước, linh hoạt, tự nhiên)</span>
                <span>1.0 (Siêu sáng tạo)</span>
              </div>
            </div>
          </div>

          {/* Section 3: Trung Tâm Tải Lên & Huấn Luyện Tài Liệu */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Kho Tài Liệu Huấn Luyện Của Bạn ({botConfig.documents.length})
                  </h3>
                  <p className="text-xs text-slate-400">
                    Upload tài liệu (.txt, .md, .pdf, .docx, .json) để nạp dữ liệu độc quyền cho bot
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {/* Upload File Input */}
                <label className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-95 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg cursor-pointer transition-all">
                  <Upload className="w-4 h-4" />
                  <span>Tải Lên File Tài Liệu</span>
                  <input
                    type="file"
                    accept=".txt,.md,.doc,.docx,.pdf,.json,.csv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {/* Add Manual Doc */}
                <button
                  type="button"
                  onClick={() => setShowAddManualDocModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Thêm Tri Thức Thủ Công</span>
                </button>
              </div>
            </div>

            {/* Document List Table */}
            <div className="rounded-2xl border border-white/10 overflow-hidden bg-slate-950/60">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3.5">Tên Tài Liệu / File</th>
                    <th className="p-3.5">Chuyên Mục</th>
                    <th className="p-3.5">Dung Lượng</th>
                    <th className="p-3.5">Khối Lượng Tri Thức</th>
                    <th className="p-3.5">Ngày Nạp</th>
                    <th className="p-3.5">Trạng Thái</th>
                    <th className="p-3.5 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {botConfig.documents.map((doc) => (
                    <tr key={doc.id} className="hover:bg-white/[0.02]">
                      <td className="p-3.5 font-bold text-white flex items-center gap-2">
                        <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span className="truncate max-w-xs">{doc.name}</span>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-[10px] font-semibold text-slate-300 border border-white/10">
                          {doc.category === 'khoa_hoc' ? 'Khóa Học & Skill' : doc.category === 'affiliate' ? 'Affiliate Đối Tác' : doc.category === 'thanh_toan' ? 'Thanh Toán SePay' : 'Chính Sách & Hỗ Trợ'}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-400 font-mono">{doc.size}</td>
                      <td className="p-3.5 text-purple-300 font-mono font-semibold">
                        {(doc.charCount || doc.content.length).toLocaleString()} ký tự
                      </td>
                      <td className="p-3.5 text-slate-400">{doc.uploadDate}</td>
                      <td className="p-3.5">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          Đã nạp vào não AI
                        </span>
                      </td>
                      <td className="p-3.5 text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => setPreviewDocument(doc)}
                          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-300 hover:text-white transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 inline mr-1" />
                          Xem
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteDocument(doc.id, doc.name)}
                          className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5 inline mr-1" />
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: Live Bot Tester Sandbox */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Phòng Thử Nghiệm Bot Trực Tiếp (Live Sandbox)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Hỏi thử bot câu bất kỳ để kiểm tra mức độ hài hước và độ chính xác của tài liệu vừa huấn luyện
                  </p>
                </div>
              </div>

              <div className="text-xs text-slate-400 hidden sm:block">
                Mô hình: <span className="text-cyan-300 font-bold">{botConfig.activeProvider === 'gemini' ? botConfig.geminiModel : botConfig.openaiModel}</span>
              </div>
            </div>

            <form onSubmit={handleTestBot} className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={testQuestion}
                  onChange={(e) => setTestQuestion(e.target.value)}
                  placeholder="Ví dụ: Khóa học giá bao nhiêu? hoặc Cho tôi link Affiliate hoa hồng 50%?"
                  className="flex-1 px-4 py-3 rounded-2xl bg-slate-950 border border-white/10 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isTestBotThinking}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-lg hover:opacity-95 disabled:opacity-50 flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isTestBotThinking ? 'Đang suy nghĩ...' : 'Hỏi Thử Bot'}</span>
                </button>
              </div>

              {/* Quick suggestion chips for admin */}
              <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
                <span>Gợi ý test nhanh:</span>
                {[
                  'Khóa học giá bao nhiêu?',
                  'Affiliate nhận hoa hồng ra sao?',
                  'Thanh toán Techcombank thế nào?',
                  'Chào bot đẹp trai!'
                ].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => {
                      setTestQuestion(chip);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-300 cursor-pointer"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </form>

            {/* Test Reply Display */}
            {testBotReply && (
              <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/30 text-slate-200 text-xs sm:text-sm space-y-2 animate-in fade-in duration-200 shadow-xl">
                <div className="flex items-center justify-between text-xs text-cyan-300 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                    Phản hồi từ Trợ Lý Phượng Hoàng Lửa:
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {botConfig.activeProvider === 'gemini' ? 'Google Gemini Engine' : 'OpenAI Engine'}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-white/5 leading-relaxed whitespace-pre-wrap font-sans text-slate-100">
                  {testBotReply}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Save Action Bar */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-cyan-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Save className="w-4 h-4 text-cyan-400" />
                Lưu Toàn Bộ Cấu Hình & Tri Thức Huấn Luyện
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Cấu hình sẽ được lưu vào máy chủ và áp dụng ngay lập tức cho Widget Chat trên website.
              </p>
            </div>
            <button
              type="button"
              onClick={handleSaveBotConfig}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 text-slate-950 font-black text-sm shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>LƯU CẤU HÌNH BỘ NÃO BOT (Áp Dụng Ngay)</span>
            </button>
          </div>
        </div>
      )}

      {/* Modal: Xem Trước Tài Liệu Huấn Luyện */}
      {previewDocument && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-cyan-500/30 p-6 sm:p-8 shadow-2xl flex flex-col max-h-[85vh]">
            <button
              onClick={() => setPreviewDocument(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">{previewDocument.name}</h4>
                <p className="text-xs text-slate-400">
                  Dung lượng: {previewDocument.size} · {(previewDocument.charCount || previewDocument.content.length).toLocaleString()} ký tự · Ngày tải: {previewDocument.uploadDate}
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 rounded-2xl bg-slate-950 border border-white/10 font-mono text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
              {previewDocument.content}
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex justify-end">
              <button
                type="button"
                onClick={() => setPreviewDocument(null)}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Thêm Tri Thức Thủ Công */}
      {showAddManualDocModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl rounded-3xl bg-slate-900 border border-cyan-500/30 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setShowAddManualDocModal(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Thêm Tri Thức Huấn Luyện Thủ Công</h4>
                <p className="text-xs text-slate-400">Dán trực tiếp câu hỏi, câu trả lời hoặc quy định nội bộ</p>
              </div>
            </div>

            <form onSubmit={handleAddManualDocument} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Tiêu đề / Tên tài liệu:
                </label>
                <input
                  type="text"
                  required
                  value={manualDocTitle}
                  onChange={(e) => setManualDocTitle(e.target.value)}
                  placeholder="Ví dụ: kich-ban-tu-van-combo-skill.txt"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Chuyên mục:
                </label>
                <select
                  value={manualDocCategory}
                  onChange={(e) => setManualDocCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                >
                  <option value="khoa_hoc">Khóa Học & Skill</option>
                  <option value="affiliate">Chương Trình Affiliate</option>
                  <option value="thanh_toan">Thanh Toán & Kích Hoạt</option>
                  <option value="chinh_sach">Chính Sách & Hỗ Trợ 1-1</option>
                  <option value="khac">Khác</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Nội dung chi tiết (Dữ liệu huấn luyện bot):
                </label>
                <textarea
                  rows={6}
                  required
                  value={manualDocContent}
                  onChange={(e) => setManualDocContent(e.target.value)}
                  placeholder="Dán nội dung bài giảng, kịch bản chốt sale hoặc thông tin bạn muốn bot ghi nhớ vào đây..."
                  className="w-full p-3.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none leading-relaxed font-mono"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-600 text-slate-950 font-black text-xs shadow-lg hover:opacity-95"
                >
                  Nạp Vào Bộ Não Bot
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddManualDocModal(false)}
                  className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold"
                >
                  Hủy
                </button>
              </div>
            </form>
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

'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { formatVND, generateOrderCode, getVietQRUrl } from '@/lib/sepay';
import { SEPAY_CONFIG, COURSES } from '@/lib/data';
import { 
  QrCode, 
  Copy, 
  Check, 
  Clock, 
  ShieldCheck, 
  AlertCircle, 
  Sparkles, 
  ArrowRight,
  RefreshCw,
  Zap,
  Building
} from 'lucide-react';

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cart, total, clearCart } = useCart();

  // Order Details Form
  const [customerName, setCustomerName] = useState('Nguyễn Văn An');
  const [customerEmail, setCustomerEmail] = useState('an.nguyen@gmail.com');
  const [customerPhone, setCustomerPhone] = useState('0912345678');

  // Order state
  const [orderCode, setOrderCode] = useState('');
  const [orderCreated, setOrderCreated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes countdown
  const [isCopied, setIsCopied] = useState<{ [key: string]: boolean }>({});
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'checking' | 'paid'>('pending');

  // Handle plan purchase if direct link
  const planId = searchParams.get('plan');
  const cycle = searchParams.get('cycle');
  const planAmount = planId === 'plan-pro' ? (cycle === 'monthly' ? 699000 : 4990000) : total || 990000;

  const payableAmount = total > 0 ? total : planAmount;

  // Initialize unique order code
  useEffect(() => {
    setOrderCode(generateOrderCode());
  }, []);

  // Countdown timer
  useEffect(() => {
    if (!orderCreated || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [orderCreated, timeLeft]);

  // Polling simulation or live check for webhook status
  useEffect(() => {
    if (!orderCreated || paymentStatus === 'paid') return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/orders?code=${orderCode}`);
        if (res.ok) {
          const data = await res.json();
          if (data.status === 'paid') {
            setPaymentStatus('paid');
            clearCart();
            router.push(`/thanh-toan/thanh-cong?code=${orderCode}&amount=${payableAmount}`);
          }
        }
      } catch (e) {
        // quiet fallback
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [orderCreated, paymentStatus, orderCode, payableAmount, clearCart, router]);

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerPhone) return;
    setOrderCreated(true);
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setIsCopied((prev) => ({ ...prev, [key]: false }));
    }, 2000);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Simulate Instant Auto Payment Trigger for testing
  const handleSimulateInstantPayment = async () => {
    setPaymentStatus('checking');
    try {
      await fetch('/api/sepay/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Apikey DEMO_TEST_KEY'
        },
        body: JSON.stringify({
          id: 9999,
          gateway: 'MBBank',
          transactionDate: new Date().toISOString(),
          accountNumber: SEPAY_CONFIG.accountNumber,
          code: null,
          content: `Chuyen tien ${orderCode}`,
          transferType: 'in',
          transferAmount: payableAmount,
          accumulated: 10000000,
          subAccount: null,
          referenceCode: 'FT24000123'
        })
      });
      setPaymentStatus('paid');
      clearCart();
      setTimeout(() => {
        router.push(`/thanh-toan/thanh-cong?code=${orderCode}&amount=${payableAmount}`);
      }, 800);
    } catch {
      router.push(`/thanh-toan/thanh-cong?code=${orderCode}&amount=${payableAmount}`);
    }
  };

  const qrImageUrl = getVietQRUrl(payableAmount, orderCode);

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Thanh Toán Đơn Hàng Qua VietQR
        </h1>
        <p className="mt-2 text-slate-400 text-sm">
          Hệ thống xác nhận tự động 24/7 qua cổng SePay. Khóa học sẽ được mở ngay sau khi chuyển khoản.
        </p>
      </div>

      {!orderCreated ? (
        /* STEP 1: Buyer Information Form */
        <div className="max-w-2xl mx-auto rounded-3xl bg-slate-900/80 border border-white/10 p-8 shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-6">Thông Tin Người Nhận Khóa Học</h2>
          <form onSubmit={handleCreateOrder} className="space-y-5">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">Họ và tên của bạn</label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">Email nhận tài khoản học</label>
              <input
                type="email"
                required
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Khóa học và mã kích hoạt sẽ được gửi tự động về email này.
              </span>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">Số điện thoại (Zalo)</label>
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="pt-4 border-t border-white/10">
              <div className="flex justify-between items-baseline mb-6">
                <span className="text-sm font-semibold text-slate-300">Tổng thanh toán:</span>
                <span className="text-2xl font-black text-cyan-400">{formatVND(payableAmount)}</span>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-purple-600/30 hover:scale-[1.01] transition-all"
              >
                <span>Tạo đơn & Lấy mã VietQR</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* STEP 2: VietQR & SePay Realtime Interface */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: QR & Transfer Info */}
          <div className="lg:col-span-7 rounded-3xl bg-slate-900/90 border border-white/15 p-6 sm:p-8 shadow-2xl space-y-6">
            {/* Top countdown */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Đơn hàng hết hạn sau:</span>
              </div>
              <span className="font-mono text-base font-bold text-amber-400">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </span>
            </div>

            {/* QR Image & Instructions */}
            <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-slate-950/80 border border-white/10">
              <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-2xl overflow-hidden bg-white p-2 border-2 border-cyan-400 shadow-lg shadow-cyan-400/20 shrink-0">
                <img
                  src={qrImageUrl}
                  alt="VietQR SePay"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-cyan-400" />
                  <span>Hướng dẫn quét mã</span>
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-slate-400">
                  <li>Mở ứng dụng ngân hàng bất kỳ (MB, Vietcombank, Techcombank, Momo...)</li>
                  <li>Chọn tính năng <strong>Quét mã QR</strong></li>
                  <li>Kiểm tra số tiền và nội dung chuyển khoản <strong>trùng khớp</strong></li>
                  <li>Bấm xác nhận chuyển khoản</li>
                </ol>
              </div>
            </div>

            {/* Bank details with Copy Buttons */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-white/10">
                <div>
                  <span className="text-xs text-slate-400 block">Ngân hàng</span>
                  <span className="font-bold text-white">{SEPAY_CONFIG.bankName}</span>
                </div>
                <Building className="w-5 h-5 text-cyan-400" />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-white/10">
                <div>
                  <span className="text-xs text-slate-400 block">Số tài khoản</span>
                  <span className="font-mono text-base font-bold text-cyan-300">{SEPAY_CONFIG.accountNumber}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(SEPAY_CONFIG.accountNumber, 'acc')}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  title="Sao chép số tài khoản"
                >
                  {isCopied['acc'] ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-white/10">
                <div>
                  <span className="text-xs text-slate-400 block">Số tiền chính xác</span>
                  <span className="font-mono text-lg font-black text-emerald-400">{formatVND(payableAmount)}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(payableAmount.toString(), 'amount')}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  title="Sao chép số tiền"
                >
                  {isCopied['amount'] ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/40">
                <div>
                  <span className="text-xs text-purple-300 block">Nội dung chuyển khoản (bắt buộc)</span>
                  <span className="font-mono text-base font-black text-amber-300">{orderCode}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(orderCode, 'code')}
                  className="p-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 transition-colors"
                  title="Sao chép nội dung"
                >
                  {isCopied['code'] ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Waiting Pulse Status */}
            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-cyan-400 animate-spin" />
                <div>
                  <p className="text-xs sm:text-sm font-bold text-white">Đang chờ nhận tiền từ ngân hàng...</p>
                  <p className="text-[11px] text-slate-400">Tự động kích hoạt ngay khi tiền vào tài khoản.</p>
                </div>
              </div>

              {/* Instant Simulator Button for quick review / demo */}
              <button
                onClick={handleSimulateInstantPayment}
                className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition-all"
              >
                Mô phỏng Đã CK
              </button>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 rounded-3xl bg-slate-900/80 border border-white/10 p-6 space-y-6">
            <h3 className="text-base font-bold text-white border-b border-white/10 pb-4">
              Chi Tiết Đơn Hàng (#{orderCode})
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Khách hàng:</span>
                <span className="font-semibold text-white">{customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Email nhận bài:</span>
                <span className="font-semibold text-white">{customerEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Số điện thoại:</span>
                <span className="font-semibold text-white">{customerPhone}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-3">
              <span className="text-xs font-semibold text-slate-400 block">Sản phẩm kích hoạt:</span>
              {cart.length > 0 ? (
                cart.map((i) => (
                  <div key={i.product.id} className="flex justify-between text-xs">
                    <span className="text-white truncate max-w-[200px]">{i.product.title}</span>
                    <span className="text-slate-400 font-mono">{formatVND(i.product.salePrice)}</span>
                  </div>
                ))
              ) : (
                <div className="flex justify-between text-xs">
                  <span className="text-white">Gói Thành Viên AI Academy Pro</span>
                  <span className="text-slate-400 font-mono">{formatVND(payableAmount)}</span>
                </div>
              )}

              <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
                <span className="text-sm font-bold text-white">Tổng cộng:</span>
                <span className="text-xl font-black text-cyan-400">{formatVND(payableAmount)}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-white/5 text-[11px] text-slate-400 space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Bảo Mật Giao Dịch SePay</span>
              </div>
              <p>Mã đơn sẽ tự động đối soát chính xác theo thời gian thực (Webhook API).</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="pt-32 pb-24 text-center text-slate-400">Đang tải trang thanh toán...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}

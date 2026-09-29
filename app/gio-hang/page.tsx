'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { formatVND } from '@/lib/sepay';
import { 
  ShoppingCart, 
  Trash2, 
  ArrowRight, 
  Tag, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const { 
    cart, 
    removeFromCart, 
    clearCart, 
    subtotal, 
    discount, 
    total, 
    couponCode, 
    applyCoupon, 
    removeCoupon 
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!inputCoupon.trim()) return;

    const success = applyCoupon(inputCoupon);
    if (!success) {
      setCouponError('Mã giảm giá không hợp lệ hoặc đã hết hạn (Thử mã: AIACADEMY)');
    } else {
      setInputCoupon('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-24 max-w-3xl mx-auto px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center mx-auto mb-6 text-slate-400">
          <ShoppingCart className="w-8 h-8 text-cyan-400" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Giỏ hàng của bạn đang trống</h1>
        <p className="mt-3 text-slate-400 text-sm">
          Hãy khám phá các khóa học và bộ skill AI để bắt đầu hành trình nâng cấp kỹ năng.
        </p>
        <Link
          href="/khoa-hoc"
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-sm shadow-lg shadow-purple-500/30"
        >
          <span>Khám phá khóa học ngay</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Giỏ Hàng Của Bạn</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Có {cart.length} sản phẩm đang chờ thanh toán
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-rose-400 hover:text-rose-300 transition-colors"
        >
          Xóa toàn bộ
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Cart items list */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="p-4 sm:p-6 rounded-3xl bg-slate-900/80 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.product.thumbnail}
                  alt={item.product.title}
                  className="w-20 h-16 sm:w-24 sm:h-20 rounded-2xl object-cover shrink-0"
                />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-cyan-300">
                    {item.product.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white mt-1 line-clamp-1">
                    {item.product.title}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-base font-bold text-white">
                      {formatVND(item.product.salePrice)}
                    </span>
                    <span className="text-xs text-slate-500 line-through">
                      {formatVND(item.product.price)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.product.id)}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors self-end sm:self-center"
                title="Xóa khỏi giỏ"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          {/* Coupon Code section */}
          <div className="p-6 rounded-3xl bg-slate-900/50 border border-white/10">
            <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4 text-purple-400" />
              <span>Mã giảm giá / Voucher</span>
            </h4>

            {couponCode ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs text-purple-300 font-semibold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Đã áp dụng mã: <strong className="text-white">{couponCode}</strong> (-15%)
                </span>
                <button
                  onClick={removeCoupon}
                  className="text-rose-400 hover:underline text-xs"
                >
                  Gỡ bỏ
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  placeholder="Nhập mã (Gợi ý: AIACADEMY)"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs sm:text-sm uppercase focus:outline-none focus:border-cyan-400"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors shrink-0"
                >
                  Áp dụng
                </button>
              </form>
            )}

            {couponError && (
              <p className="mt-2 text-xs text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {couponError}
              </p>
            )}
          </div>
        </div>

        {/* Right Summary */}
        <div className="lg:col-span-4">
          <div className="rounded-3xl bg-slate-900/90 border border-white/15 p-6 shadow-2xl space-y-6 lg:sticky lg:top-24">
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4">
              Tóm Tắt Đơn Hàng
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-400">
                <span>Tạm tính ({cart.length} món):</span>
                <span className="text-white font-medium">{formatVND(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Giảm giá voucher:</span>
                  <span>-{formatVND(discount)}</span>
                </div>
              )}

              <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
                <span className="text-white font-bold">Tổng thanh toán:</span>
                <span className="text-2xl font-black text-cyan-400">{formatVND(total)}</span>
              </div>
            </div>

            <Link
              href="/thanh-toan"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-purple-600/30 hover:scale-[1.02] transition-all"
            >
              <span>Tiến hành thanh toán</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="pt-4 border-t border-white/10 space-y-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Thanh toán tự động VietQR qua SePay</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Hoàn tiền 100% trong 7 ngày nếu không hài lòng</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

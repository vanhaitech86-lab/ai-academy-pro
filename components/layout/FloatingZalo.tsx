'use client';

import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Sparkles, MessageCircle, Copy, CheckCircle2 } from 'lucide-react';

export default function FloatingZalo() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ZALO_GROUP_URL = 'https://zalo.me/g/apptijq8h3nfkdg5oaju';

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-zalo-modal', handleOpen);
    return () => window.removeEventListener('open-zalo-modal', handleOpen);
  }, []);

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-24 right-6 z-50 flex items-center">
        {/* Tooltip badge on hover / pulse */}
        <div className="hidden sm:flex items-center gap-1.5 mr-2 px-3 py-1 rounded-full bg-blue-900/90 border border-blue-400/40 text-[11px] font-bold text-blue-200 shadow-lg backdrop-blur-md animate-bounce">
          <Sparkles className="w-3 h-3 text-cyan-300" />
          <span>Nhóm Zalo Chăm Sóc</span>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0068ff] hover:bg-[#0054cc] text-white shadow-2xl shadow-blue-500/50 hover:scale-105 active:scale-95 transition-all duration-300"
          aria-label="Nhóm Zalo Chăm Sóc Khách Hàng"
        >
          {/* Subtle outer breathing ring */}
          <span className="absolute -inset-1 rounded-2xl bg-blue-400 opacity-60 blur-md group-hover:opacity-100 animate-pulse" />

          <div className="relative flex items-center justify-center">
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <span className="font-black text-sm tracking-tight text-white leading-none">Zalo</span>
                <span className="text-[9px] font-extrabold text-cyan-200 tracking-tighter uppercase mt-0.5">VIP</span>
              </div>
            )}
          </div>
        </button>
      </div>

      {/* Zalo Group QR Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm rounded-3xl bg-slate-900 border border-blue-500/30 p-6 shadow-2xl overflow-hidden text-center">
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-[11px] font-bold text-blue-300 uppercase tracking-wider mb-3">
              <MessageCircle className="w-3.5 h-3.5 text-blue-400" />
              <span>Chăm Sóc & Quà Tặng 1-1</span>
            </div>

            <h3 className="text-base font-bold text-white leading-snug">
              Nhóm Zalo Quà Tặng Skill - Tool AI
            </h3>

            <p className="mt-1 text-xs text-slate-300">
              Quét mã QR bằng ứng dụng Zalo trên điện thoại để vào nhóm nhận quà tặng & được chăm sóc trực tiếp:
            </p>

            {/* QR Card image */}
            <div className="mt-4 p-3 bg-white rounded-2xl shadow-xl inline-block border-2 border-blue-400/50">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(ZALO_GROUP_URL)}`}
                alt="Mã QR Nhóm Zalo Quà Tặng Skill - Tool AI"
                className="w-52 h-52 rounded-xl object-contain mx-auto"
              />
            </div>

            <div className="mt-2 text-[11px] text-slate-400 font-mono break-all select-all">
              {ZALO_GROUP_URL}
            </div>

            <div className="mt-4 space-y-2">
              <a
                href={ZALO_GROUP_URL}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:opacity-95 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 transition-all"
              >
                <span>Tham Gia Nhóm Zalo Ngay</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(ZALO_GROUP_URL);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Đã sao chép link Zalo!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Sao chép link nhóm Zalo</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-2 text-xs text-slate-400 hover:text-slate-300 font-semibold cursor-pointer"
              >
                Đóng cửa sổ
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

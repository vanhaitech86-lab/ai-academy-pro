import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';
import { AuthProvider } from '@/lib/auth-context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/chatbot/ChatWidget';
import FloatingZalo from '@/components/layout/FloatingZalo';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'AI Academy Pro - Nền Tảng Học Tập & Kinh Doanh AI Phượng Hoàng Lửa',
  description: 'Khóa học AI thực chiến, kho Prompt chuyên sâu, Workflow tự động hóa n8n & Make, công cụ AI chuyên nghiệp. Thanh toán tự động SePay VietQR 24/7.',
  keywords: 'học AI, khóa học ChatGPT, Prompt Engineering, Midjourney v6, n8n automation, SePay VietQR, trợ lý AI',
  openGraph: {
    title: 'AI Academy Pro - Học Viện Đào Tạo & Kinh Doanh AI',
    description: 'Làm chủ AI – Tăng tốc công việc gấp 10 lần. Nền tảng đào tạo AI hàng đầu Việt Nam.',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${inter.variable} scroll-smooth dark`}>
      <body className="min-h-screen bg-[#0d1527] text-slate-100 flex flex-col font-sans antialiased selection:bg-purple-600 selection:text-white relative overflow-x-hidden">
        {/* Ambient luminous background lighting layers */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          {/* Top luminous indigo-violet aura */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-indigo-500/25 via-purple-500/20 to-transparent blur-[120px] rounded-full pointer-events-none" />
          {/* Cyan accent glow left */}
          <div className="absolute top-[25%] -left-48 w-[650px] h-[650px] bg-cyan-500/18 blur-[130px] rounded-full pointer-events-none" />
          {/* Purple glow right */}
          <div className="absolute top-[50%] -right-48 w-[650px] h-[650px] bg-purple-500/18 blur-[130px] rounded-full pointer-events-none" />
          {/* Soft blue-teal glow lower */}
          <div className="absolute top-[75%] left-1/3 w-[700px] h-[500px] bg-blue-500/15 blur-[140px] rounded-full pointer-events-none" />
          {/* Subtle radiant dot grid */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none opacity-80" />
        </div>

        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <FloatingZalo />
            <ChatWidget />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

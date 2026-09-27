import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/chatbot/ChatWidget';

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
      <body className="min-h-screen bg-[#0b0f1a] text-slate-100 flex flex-col font-sans antialiased selection:bg-purple-600 selection:text-white">
        <CartProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <ChatWidget />
        </CartProvider>
      </body>
    </html>
  );
}

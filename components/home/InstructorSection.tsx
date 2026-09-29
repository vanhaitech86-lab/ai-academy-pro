import React from 'react';
import { Award, Users, BookOpen, ExternalLink, Video, Globe, Share2, Sparkles } from 'lucide-react';

export default function InstructorSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-slate-900/90 via-purple-950/30 to-slate-900/90 border border-white/10 p-8 sm:p-12 lg:p-16 overflow-hidden">
          {/* Ambient lighting */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Team Portrait */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative group w-full max-w-lg">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-amber-500 via-purple-600 to-cyan-500 opacity-60 blur-xl group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl bg-slate-950">
                  <img
                    src="/images/team-phuong-hoang-lua.jpg"
                    alt="Team Phượng Hoàng Lửa"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md shadow-lg">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Team Phượng Hoàng Lửa
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Instructor Bio & Achievements */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-300 uppercase tracking-widest">
                <span>Đội Ngũ Chuyên Gia Thực Chiến</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Team Phượng Hoàng Lửa
              </h2>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300 font-bold text-base sm:text-lg leading-snug">
                AI -AGENT Học Viện Công Nghệ Trí Tuệ Nhân Tạo Phượng Hoàng Lửa
              </p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Với hơn 8 năm nghiên cứu và ứng dụng thực chiến công nghệ AI, Team Phượng Hoàng Lửa đã trực tiếp cố vấn triển khai hệ thống tự động hóa cho hơn 120 doanh nghiệp và đào tạo hơn 15.000 học viên đạt thu nhập đột phá từ sản phẩm số AI.
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 block">15.000+</span>
                  <span className="text-xs text-slate-400 mt-1 block">Học viên toàn quốc</span>
                </div>
                <div className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <span className="text-2xl sm:text-3xl font-extrabold text-purple-400 block">120+</span>
                  <span className="text-xs text-slate-400 mt-1 block">Dự án chuyển đổi số</span>
                </div>
                <div className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400 block">8+ Năm</span>
                  <span className="text-xs text-slate-400 mt-1 block">Kinh nghiệm thực chiến</span>
                </div>
              </div>

              {/* Socials / Group */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="https://zalo.me/g/apptijq8h3nfkdg5oaju"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-500/30 text-xs font-semibold text-amber-300 hover:text-white transition-colors"
                >
                  <Globe className="w-4 h-4 text-amber-400" />
                  <span>Cộng đồng Phượng Hoàng Lửa</span>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  <Video className="w-4 h-4 text-red-500" />
                  <span>Kênh Video (150k Sub)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

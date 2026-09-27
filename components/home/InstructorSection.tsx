import React from 'react';
import { Award, Users, BookOpen, ExternalLink, Video, Globe, Share2 } from 'lucide-react';

export default function InstructorSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-slate-900/90 via-purple-950/30 to-slate-900/90 border border-white/10 p-8 sm:p-12 lg:p-16 overflow-hidden">
          {/* Ambient lighting */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Instructor Portrait */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-purple-600 via-cyan-500 to-pink-500 opacity-60 blur-xl group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative w-64 sm:w-80 aspect-[4/5] rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
                    alt="ThS. Hoàng Hải Long"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      Founder & Lead Instructor
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Instructor Bio & Achievements */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300 uppercase tracking-widest">
                <span>Đội Ngũ Chuyên Gia</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                ThS. Hoàng Hải Long
              </h2>
              <p className="text-purple-300 font-semibold text-base">
                AI Architect & Giám đốc Đào tạo Viện Công nghệ Trí tuệ Nhân tạo Phượng Hoàng Lửa
              </p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Với hơn 8 năm nghiên cứu và ứng dụng thực chiến công nghệ AI, ThS. Hoàng Hải Long đã trực tiếp cố vấn triển khai hệ thống tự động hóa cho hơn 120 doanh nghiệp và đào tạo hơn 15.000 học viên đạt thu nhập đột phá từ sản phẩm số AI.
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400 block">15.000+</span>
                  <span className="text-xs text-slate-400 mt-1 block">Học viên toàn quốc</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <span className="text-2xl sm:text-3xl font-extrabold text-purple-400 block">120+</span>
                  <span className="text-xs text-slate-400 mt-1 block">Dự án chuyển đổi số</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <span className="text-2xl sm:text-3xl font-extrabold text-pink-400 block">8+ Năm</span>
                  <span className="text-xs text-slate-400 mt-1 block">Kinh nghiệm thực chiến</span>
                </div>
              </div>

              {/* Socials */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  <Video className="w-4 h-4 text-red-500" />
                  <span>Kênh Video (150k Sub)</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  <Globe className="w-4 h-4 text-cyan-400" />
                  <span>Cộng đồng Chuyên gia AI</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

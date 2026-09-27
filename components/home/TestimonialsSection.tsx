import React from 'react';
import { TESTIMONIALS } from '@/lib/data';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export default function TestimonialsSection() {
  return (
    <section className="py-20 relative bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            Đánh Giá & Phản Hồi
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Học Viên Nói Gì Về Chúng Tôi?
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Hơn 98% học viên đạt được kết quả cụ thể trong công việc sau khi hoàn thành khóa học.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="relative p-8 rounded-3xl bg-slate-900/80 border border-white/10 glass-card flex flex-col justify-between"
            >
              <Quote className="w-10 h-10 text-purple-500/20 absolute top-6 right-6" />

              <div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-300 text-sm leading-relaxed italic">
                  "{t.content}"
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-cyan-500/30"
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-white flex items-center gap-1">
                    {t.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  </h4>
                  <p className="text-xs text-slate-400 truncate">{t.role} · {t.company}</p>
                  <p className="text-[11px] text-purple-400 mt-0.5 font-medium truncate">
                    Khóa: {t.courseTaken}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

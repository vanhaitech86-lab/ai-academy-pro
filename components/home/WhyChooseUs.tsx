import React from 'react';
import { 
  Infinity as InfinityIcon, 
  RefreshCw, 
  Headphones, 
  Award, 
  Users2, 
  BadgePercent 
} from 'lucide-react';

export default function WhyChooseUs() {
  const benefits = [
    {
      title: 'Học Trọn Đời Không Giới Hạn',
      desc: 'Mua một lần, sở hữu vĩnh viễn. Xem lại bài giảng mọi lúc trên máy tính, iPad và điện thoại.',
      icon: InfinityIcon,
      color: 'text-purple-400',
      border: 'hover:border-purple-500/40'
    },
    {
      title: 'Cập Nhật Kiến Thức Định Kỳ',
      desc: 'AI đổi mới từng tuần, giáo trình liên tục được bổ sung các bài giảng công nghệ mới miễn phí.',
      icon: RefreshCw,
      color: 'text-cyan-400',
      border: 'hover:border-cyan-500/40'
    },
    {
      title: 'Hỗ Trợ 1-1 Cùng Trợ Giảng',
      desc: 'Giải đáp thắc mắc chuyên môn, chữa bài tập thực hành trực tiếp qua phòng Zoom và nhóm Zalo.',
      icon: Headphones,
      color: 'text-pink-400',
      border: 'hover:border-pink-500/40'
    },
    {
      title: 'Chứng Chỉ Số Xác Thực',
      desc: 'Cấp chứng nhận hoàn thành khóa học có mã tra cứu định danh uy tín, làm đẹp hồ sơ CV.',
      icon: Award,
      color: 'text-amber-400',
      border: 'hover:border-amber-500/40'
    },
    {
      title: 'Cộng Đồng Master AI Độc Quyền',
      desc: 'Giao lưu, chia sẻ kinh nghiệm, nhận job dự án và hợp tác kinh doanh cùng hàng nghìn học viên.',
      icon: Users2,
      color: 'text-emerald-400',
      border: 'hover:border-emerald-500/40'
    },
    {
      title: 'Cam Kết Hoàn Tiền 100%',
      desc: 'Bảo hành quyền lợi trong 7 ngày. Nếu cảm thấy không phù hợp, bạn được hoàn lại 100% học phí.',
      icon: BadgePercent,
      color: 'text-blue-400',
      border: 'hover:border-blue-500/40'
    }
  ];

  return (
    <section className="py-20 relative bg-[#0f1b33]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
            Giá Trị Khác Biệt
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Vì Sao Chọn AI Academy Pro?
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Chúng tôi không chỉ bán bài giảng, chúng tôi đồng hành cùng bạn trên con đường làm chủ và kiếm tiền từ AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className={`group p-8 rounded-3xl bg-slate-900/60 border border-white/10 transition-all duration-300 ${b.border} hover:-translate-y-1 hover:shadow-xl`}
              >
                <div className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${b.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {b.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

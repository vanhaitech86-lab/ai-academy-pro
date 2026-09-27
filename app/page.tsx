import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import MarqueeTools from '@/components/home/MarqueeTools';
import CategoryCards from '@/components/home/CategoryCards';
import FeaturedCourses from '@/components/home/FeaturedCourses';
import SkillCarousel from '@/components/home/SkillCarousel';
import BentoTools from '@/components/home/BentoTools';
import RoadmapSection from '@/components/home/RoadmapSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import InstructorSection from '@/components/home/InstructorSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PricingSection from '@/components/home/PricingSection';
import FaqSection from '@/components/home/FaqSection';
import CtaSection from '@/components/home/CtaSection';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 3.2 Hero 3D */}
      <HeroSection />

      {/* 3.3 Logo Đối tác / Công cụ giảng dạy */}
      <MarqueeTools />

      {/* 3.4 Danh mục nổi bật 3D tilt */}
      <CategoryCards />

      {/* 3.5 Khóa học nổi bật */}
      <FeaturedCourses />

      {/* 3.6 Kho Skill AI */}
      <SkillCarousel />

      {/* 3.7 Công cụ AI chuyên nghiệp (Bento Grid) */}
      <BentoTools />

      {/* 3.8 Lộ trình học (Roadmap 5 bước) */}
      <RoadmapSection />

      {/* 3.9 Vì sao chọn chúng tôi */}
      <WhyChooseUs />

      {/* 3.10 Giới thiệu giảng viên */}
      <InstructorSection />

      {/* 3.11 Cảm nhận học viên */}
      <TestimonialsSection />

      {/* 3.12 Bảng giá */}
      <PricingSection />

      {/* 3.13 Câu hỏi thường gặp FAQ */}
      <FaqSection />

      {/* 3.14 Kêu gọi hành động CTA Lead Magnet */}
      <CtaSection />
    </div>
  );
}

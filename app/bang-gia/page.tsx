import React from 'react';
import PricingSection from '@/components/home/PricingSection';
import FaqSection from '@/components/home/FaqSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';

export default function BangGiaPage() {
  return (
    <div className="pt-16">
      <PricingSection />
      <WhyChooseUs />
      <FaqSection />
    </div>
  );
}

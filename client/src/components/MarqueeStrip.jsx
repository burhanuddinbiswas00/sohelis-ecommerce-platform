import React from 'react';
import { Sparkles } from 'lucide-react';

export default function MarqueeStrip({
  items,
  theme = 'dark', // 'dark' | 'terracotta' | 'gold' | 'cream'
  speed = 'normal', // 'normal' | 'slow'
  reverse = false,
  className = '',
}) {
  const defaultItems = [
    'হস্তনির্মিত নকশী কাঁথা (HAND-STITCHED NAKSHI KANTHA)',
    'TRY THE LOOK • ইন্টারঅ্যাক্টিভ লুকবুক',
    'বিশুদ্ধ সুতি, তসর ও মসলিন (PURE FABRICS)',
    'গ্রামীণ নারী কারিগরদের ক্ষমতায়ন',
    'সমগ্র বাংলাদেশে ক্যাশ অন ডেলিভারি',
    'HERITAGE WOVEN MODERN • LIMITED DROPS',
  ];

  const contentItems = items || defaultItems;

  const themeClasses = {
    dark: 'bg-[#1f1a18] text-[#f5efe7] border-y border-[#3a302a]',
    terracotta: 'bg-ethnic-terracotta text-amber-50 border-y border-amber-900/30',
    gold: 'bg-ethnic-gold text-[#1f1a18] border-y border-amber-800/20 font-semibold',
    cream: 'bg-[#f4ede4] text-stone-800 border-y border-stone-300',
  }[theme] || 'bg-[#1f1a18] text-white';

  const animClass = reverse
    ? 'animate-marquee-reverse'
    : speed === 'slow'
    ? 'animate-marquee-slow'
    : 'animate-marquee';

  return (
    <div
      className={`relative w-full overflow-hidden py-3 text-xs tracking-[0.2em] uppercase select-none gpu-accelerated shadow-inner ${themeClasses} ${className}`}
      role="marquee"
      aria-label="Brand Highlights"
    >
      <div className={`flex w-max items-center whitespace-nowrap pause-hover ${animClass}`}>
        {/* Render twice for seamless infinite loop */}
        {[...contentItems, ...contentItems].map((text, idx) => (
          <div key={idx} className="flex items-center mx-5 sm:mx-8">
            <span className="font-medium tracking-widest text-[11px] sm:text-xs">
              {text}
            </span>
            <span className="ml-5 sm:ml-8 text-amber-400/80 inline-block text-[10px]">
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}


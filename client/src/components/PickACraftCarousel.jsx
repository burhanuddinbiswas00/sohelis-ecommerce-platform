import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

const CRAFT_CARDS = [
  {
    id: 'muslin',
    title: 'মসলিন কাঁথা (Muslin Kantha)',
    tag: 'ULTRA-LIGHT HEIRLOOM',
    subtitle: 'মেঘের মতো হালকা খাঁটি ঢাকাই মসলিনে সূক্ষ্ম রঙিন সুতোর ফোঁড়',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    color: 'from-[#2e261f] to-[#1c1713]',
    accent: '#d99b4d',
    category: 'Sari',
    fabricFilter: 'Muslin',
    tilt: -2,
    startingPrice: '৳ ৬,২০০',
  },
  {
    id: 'cotton',
    title: 'হ্যান্ডলুম সুতি (Handloom Cotton)',
    tag: '100% ORGANIC & BREATHABLE',
    subtitle: 'মাটির স্পর্শমাখা খাদি সুতি কাপড়ে আরামদায়ক নকশী ফোঁড় ও পদ্ম মোটিফ',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    color: 'from-[#6e2b20] to-[#3a1510]',
    accent: '#e28063',
    category: 'Sari',
    fabricFilter: 'Cotton',
    tilt: 1.5,
    startingPrice: '৳ ৪,৫০০',
  },
  {
    id: 'half-silk',
    title: 'হাফ-সিল্ক নোয়ার (Half-Silk Noir Edit)',
    tag: 'FESTIVE EVENING LUXE',
    subtitle: 'কাজল কালো ও গাঢ় রত্ন রঙের হাফ-সিল্কে জমকালো রেশম সুতোর কাজ',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    color: 'from-[#1c2430] to-[#0e131a]',
    accent: '#60a5fa',
    category: 'Sari',
    fabricFilter: 'Silk',
    tilt: -1.5,
    startingPrice: '৳ ৫,৮০০',
  },
  {
    id: 'linen',
    title: 'লিনেন থ্রি-পিস (Linen Three-Piece)',
    tag: 'CONTEMPORARY CUT',
    subtitle: 'স্মার্ট ফিউশন কাট কুর্তির সাথে সম্পূর্ণ হাতে বোনা এক্সক্লুসিভ নকশী ওড়না',
    image: 'https://images.unsplash.com/photo-1583391733975-0814a0f4439c?auto=format&fit=crop&w=800&q=80',
    color: 'from-[#1e382d] to-[#0f1f18]',
    accent: '#6ee7b7',
    category: 'Three-Piece',
    fabricFilter: 'Linen',
    tilt: 2,
    startingPrice: '৳ ৪,৮০০',
  },
  {
    id: 'bridal',
    title: 'ব্রাইডাল হেরিটেজ (Bridal Heirloom)',
    tag: 'LIMITED MASTERPIECE',
    subtitle: 'মাসাধিক সময় ধরে প্রান্তিক নারী শিল্পীদের যত্নে সেলাই করা গহনা ফোঁড় শাড়ি',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
    color: 'from-[#541e2a] to-[#2c0e15]',
    accent: '#f59e0b',
    category: 'Sari',
    fabricFilter: 'Bridal',
    tilt: -2,
    startingPrice: '৳ ৮,৫০০',
  },
];

export default function PickACraftCarousel({ navigate }) {
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCardClick = (card) => {
    navigate(`/shop?category=${encodeURIComponent(card.category)}`);
  };

  return (
    <section className="w-full py-16 lg:py-24 bg-[#f5efe7]/70 border-b border-stone-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ethnic-gold/15 text-stone-900 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>কারুশিল্প ও ফ্যাব্রিক সংগ্রহ (PICK A CRAFT / FABRIC)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900">
              আপনার পছন্দের ঐতিহ্যবাহী ফ্যাব্রিক বেছে নিন
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xl font-sans">
              প্রতিটি ফ্যাব্রিকের নিজস্ব গল্প, অনুভূতি ও ফোঁড়ের কারুকাজ রয়েছে। আপনার পছন্দের ক্যাটেগরিতে ব্রাউজ করুন।
            </p>
          </div>

          {/* Left/Right Scroll Control Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleScroll('left')}
              aria-label="Scroll Carousel Left"
              className="w-11 h-11 rounded-full bg-white border border-stone-300 text-stone-800 flex items-center justify-center hover:bg-stone-900 hover:text-white transition shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              aria-label="Scroll Carousel Right"
              className="w-11 h-11 rounded-full bg-white border border-stone-300 text-stone-800 flex items-center justify-center hover:bg-stone-900 hover:text-white transition shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Tilted Cards Deck */}
        <div
          ref={scrollRef}
          className="flex gap-6 sm:gap-8 overflow-x-auto pb-8 pt-4 no-scrollbar snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {CRAFT_CARDS.map((card) => (
            <motion.div
              key={card.id}
              whileHover={{ y: -12, scale: 1.02, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onClick={() => handleCardClick(card)}
              style={{ rotate: `${card.tilt}deg` }}
              className="snap-start shrink-0 w-[290px] sm:w-[330px] rounded-3xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300 group border border-white/40 relative flex flex-col justify-between"
            >
              {/* Background Cover Image with Gradient */}
              <div className="absolute inset-0 z-0">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${card.color} opacity-85 group-hover:opacity-80 transition-opacity`}
                />
              </div>

              {/* Card Header Content */}
              <div className="relative z-10 p-6 sm:p-7 space-y-3">
                <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-amber-200 border border-white/10 font-bold inline-block">
                  {card.tag}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {card.title}
                </h3>
              </div>

              {/* Card Footer Content */}
              <div className="relative z-10 p-6 sm:p-7 space-y-4 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent">
                <p className="text-xs text-stone-300 leading-relaxed font-sans line-clamp-2">
                  {card.subtitle}
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-white/15 text-xs">
                  <div>
                    <span className="text-[10px] text-stone-400 block font-sans">শুরু</span>
                    <span className="font-bold text-amber-300 text-sm font-sans">
                      {card.startingPrice}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs text-white font-medium group-hover:text-amber-300 transition-colors">
                    <span>কালেকশন দেখুন</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


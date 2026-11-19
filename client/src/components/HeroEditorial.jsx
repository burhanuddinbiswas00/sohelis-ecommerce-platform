import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Play, Eye } from 'lucide-react';

const HERO_LOOKS = [
  {
    id: 1,
    eyebrow: "THE SOHELI'S NAKSHI ARCHIVE • 2026 EDIT",
    title: "Heritage Woven Modern",
    titleBn: "বাংলার শাশ্বত ফোঁড়, সমকালীন আভিজাত্য",
    tagline: "Made to move with you.",
    description: "যশোর ও জামালপুরের প্রত্যন্ত অঞ্চলের নারী কারিগরদের নিখুঁত সুতোয় বোনা ট্র্যাডিশনাল পদ্ম-কলকা নকশী কাঁথা শাড়ি ও কনটেম্পোরারি থ্রি-পিস।",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1800&q=85",
    fabric: "Pure Cotton & Tussar Blend",
    category: "Signature Sari",
    price: "৳ ৫,২০০",
  },
  {
    id: 2,
    eyebrow: "SILK & NOIR COLLECTION • VOLUME II",
    title: "Midnight Noir Kantha",
    titleBn: "কাজল কালো জমিনে রঙিন রেশম কারুকাজ",
    tagline: "Poetry in every thread.",
    description: "গাঢ় কালো হাফ-সিল্ক কাপড়ে রঙিন রেশম সুতোর চমৎকার জ্যামিতিক নকশী কাঁথা কাজ—যে কোনো বিশেষ সন্ধ্যা ও উৎসবের জন্য অনন্য।",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1800&q=85",
    fabric: "Half-Silk with Silk Thread Stitch",
    category: "Festive Edit",
    price: "৳ ৬,৮০০",
  },
  {
    id: 3,
    eyebrow: "AUTHENTIC COTTAGE THREE-PIECE",
    title: "Terracotta & Gold Edit",
    titleBn: "মাটির গন্ধমাখা লালচে টেরাকোটা ও অ্যান্টিক গোল্ড",
    tagline: "Slow fashion, eternal grace.",
    description: "হ্যান্ডলুম সুতি কুর্তি এবং সম্পূর্ণ হাতে সেলাই করা ভারী নকশী কাঁথা ওড়না। আধুনিক কাটিং এর সাথে শতবর্ষী ঐতিহ্যের মেলবন্ধন।",
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1800&q=85",
    fabric: "Linen Cotton & Silk Thread",
    category: "Handcrafted Three-Piece",
    price: "৳ ৫,৪০০",
  },
];

export default function HeroEditorial({ navigate }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const activeLook = HERO_LOOKS[currentIdx];

  // Auto-advance hero slides every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_LOOKS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTryTheLook = () => {
    const section = document.getElementById('try-the-look');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/shop');
    }
  };

  return (
    <section className="relative w-full min-h-[90vh] lg:min-h-[94vh] bg-[#1a1513] text-[#faf8f5] flex items-center overflow-hidden">
      {/* Background Visual Showcase with Ken Burns motion */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeLook.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
        >
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={activeLook.image}
              alt={activeLook.title}
              className="w-full h-full object-cover object-center animate-kenburns gpu-accelerated scale-105"
            />
            {/* Dramatic Editorial Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/30" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Hero Foreground Editorial Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Typography Column */}
          <div className="lg:col-span-8 space-y-6">
            <motion.div
              key={`eyebrow-${activeLook.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-[11px] font-mono tracking-widest uppercase"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{activeLook.eyebrow}</span>
            </motion.div>

            <motion.div
              key={`title-${activeLook.id}`}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white leading-[1.08]">
                {activeLook.title}
              </h1>
              <p className="font-bengali text-lg sm:text-2xl text-amber-200/90 font-medium">
                {activeLook.titleBn}
              </p>
            </motion.div>

            <motion.p
              key={`tagline-${activeLook.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl sm:text-2xl font-serif italic text-stone-200 tracking-wide"
            >
              "{activeLook.tagline}"
            </motion.p>

            <motion.p
              key={`desc-${activeLook.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed font-sans"
            >
              {activeLook.description}
            </motion.p>

            {/* CTAs: Try the Look & Catalog */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
            >
              <button
                onClick={scrollToTryTheLook}
                className="group inline-flex items-center justify-center gap-3 bg-ethnic-terracotta hover:bg-ethnic-red text-white text-xs sm:text-sm font-semibold px-7 py-4 rounded-xl shadow-lg hover:shadow-ethnic-red/30 transition-all duration-300 active:scale-95"
              >
                <Eye className="w-4 h-4 text-amber-200 group-hover:scale-110 transition-transform" />
                <span>Try the Look • লুকবুক দেখুন</span>
              </button>

              <button
                onClick={() => navigate('/shop')}
                className="inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 text-stone-100 backdrop-blur-md border border-white/25 text-xs sm:text-sm font-medium px-6 py-4 rounded-xl transition duration-300 hover:border-white/50"
              >
                <span>কালেকশন এক্সপ্লোর করুন</span>
                <ArrowRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* Right Floating Curated Look Card */}
          <div className="lg:col-span-4 hidden lg:flex flex-col items-end">
            <motion.div
              key={`badge-${activeLook.id}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="w-80 bg-stone-950/70 backdrop-blur-xl border border-white/15 rounded-2xl p-5 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between text-[11px] text-amber-300/90 font-mono uppercase tracking-wider border-b border-white/10 pb-2.5">
                <span>LOOK 0{activeLook.id}</span>
                <span>{activeLook.category}</span>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-stone-400">ফ্যাব্রিক ও ফিনিশিং</p>
                <p className="text-sm font-semibold text-white">{activeLook.fabric}</p>
                <p className="text-lg font-bold text-amber-400 font-sans pt-1">
                  {activeLook.price}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-stone-300 border-t border-white/10">
                <span className="flex items-center gap-1.5 text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  ইন-স্টক হ্যান্ডক্রাফটেড
                </span>
                <button
                  onClick={() => navigate(`/shop?category=${encodeURIComponent(activeLook.category)}`)}
                  className="text-amber-300 hover:text-white underline text-[11px]"
                >
                  বিস্তারিত
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Carousel Slide Indicators */}
        <div className="pt-12 sm:pt-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {HERO_LOOKS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setCurrentIdx(idx)}
                className={`transition-all duration-500 rounded-full h-1.5 ${
                  currentIdx === idx
                    ? 'w-10 bg-amber-400'
                    : 'w-3 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <p className="text-[11px] text-stone-400 font-mono tracking-widest hidden sm:block">
            0{currentIdx + 1} / 0{HERO_LOOKS.length} ARCHIVE EDIT
          </p>
        </div>
      </div>
    </section>
  );
}


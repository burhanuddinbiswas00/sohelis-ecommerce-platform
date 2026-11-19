import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake, Leaf, Award } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import HeroEditorial from '../components/HeroEditorial';
import MarqueeStrip from '../components/MarqueeStrip';
import TryTheLook from '../components/TryTheLook';
import PickACraftCarousel from '../components/PickACraftCarousel';
import { getProducts } from '../services/api';

export default function Home({ navigate, onSelectProduct }) {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await getProducts({ featured: 'true' });
        setFeaturedProducts(data.products || []);
      } catch (err) {
        console.error('Failed to load featured products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="space-y-0 pb-16">
      {/* 1. Full-Bleed High-Craft Editorial Hero */}
      <HeroEditorial navigate={navigate} />

      {/* 2. Infinite Marquee Ribbon Pinned at Hero Base */}
      <MarqueeStrip theme="dark" speed="normal" />

      {/* 3. Interactive Shoppable 'Try the Look' Lookbook */}
      <TryTheLook onSelectProduct={onSelectProduct} />

      {/* 4. Horizontal Tilted 'Pick a Craft / Fabric' Card Deck Carousel */}
      <PickACraftCarousel navigate={navigate} />

      {/* 5. Inverted Accent Marquee Ribbon */}
      <MarqueeStrip
        theme="terracotta"
        speed="slow"
        reverse={true}
        items={[
          '১০০% খাঁটি দেশীয় সুতি ও খাদি',
          'গ্রামীণ নারীদের স্বাবলম্বন ও ন্যায্য পারিশ্রমিক',
          'নকশী কাঁথা আঁচল ও জ্যামিতিক পাড়',
          'অনলাইন ক্যাশ অন ডেলিভারি ও সহজ রিটার্ন',
          'HERITAGE WOVEN MODERN • SOHELI’S EXCLUSIVE',
        ]}
      />

      {/* 6. Signature Featured Catalog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-ethnic-red font-semibold">
              বিশেষ সিগনেচার কালেকশন
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 font-bold">
              সোহেলিসের জনপ্রিয় নকশী সৃষ্টিসমূহ
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 max-w-lg">
              আমাদের সবচেয়ে পছন্দের হাতে বোনা নকশী কাঁথা শাড়ি ও থ্রি-পিস কালেকশন।
            </p>
          </div>

          <button
            onClick={() => navigate('/shop')}
            className="text-stone-800 hover:text-ethnic-red text-xs sm:text-sm font-semibold flex items-center gap-1.5 group"
          >
            <span>সকল পণ্য দেখুন</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse bg-stone-200 rounded-2xl h-80" />
            ))}
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-stone-200">
            <p className="text-stone-500 text-sm">কোনো বিশেষ পণ্য পাওয়া যায়নি।</p>
          </div>
        )}
      </section>

      {/* 7. Brand Values & Artisan Empowerment Spotlight */}
      <section className="bg-[#f5efe7] border-t border-stone-200/80 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase tracking-widest text-ethnic-red font-semibold">
              আমাদের দর্শন ও অঙ্গীকার
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 font-bold">
              কেন সোহেলিস অনন্য?
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              আমরা কেবল পোশাক তৈরি করি না, বাঁচিয়ে রাখি একটি শতবর্ষী লোকশিল্প ও প্রান্তিক নারীদের আত্মনির্ভরশীলতা।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-stone-200/90 shadow-sm text-center space-y-4 hover:shadow-md transition">
              <div className="w-14 h-14 mx-auto rounded-full bg-ethnic-red/10 text-ethnic-red flex items-center justify-center">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900">গ্রামীণ কারিগর ক্ষমতায়ন</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                প্রতিটি পোশাকের প্রতিটি ফোঁড়ের পেছনে রয়েছেন প্রত্যন্ত অঞ্চলের দক্ষ নারী কারিগর, যাদের শ্রমের উপযুক্ত পারিশ্রমিক ও পারিবারিক মর্যাদা নিশ্চিত করে সোহেলিস।
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-stone-200/90 shadow-sm text-center space-y-4 hover:shadow-md transition">
              <div className="w-14 h-14 mx-auto rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <Leaf className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900">শতভাগ পরিবেশবান্ধব ফ্যাব্রিক</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                প্রাকৃতিক অর্গানিক তুলা, খাদি ও খাঁটি তসর কাপড়ে পাকা রঙের সুতো দিয়ে তৈরি—যা দীর্ঘস্থায়ী, টেকসই এবং ত্বকের জন্য সম্পূর্ণ আরামদায়ক।
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-stone-200/90 shadow-sm text-center space-y-4 hover:shadow-md transition">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-600/10 text-emerald-700 flex items-center justify-center">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900">নিখুঁত কোয়ালিটি ফিনিশিং</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                হাতে ফোঁড় তোলা শেষে প্রতিটি পোশাক অত্যন্ত যত্নে থ্রেড কাটিং, মৃদু ওয়াশ ও স্টিম আয়রনিং করে প্রিমিয়াম ইকো ক্রাফট প্যাকেজিংয়ে পৌঁছে দেওয়া হয়।
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

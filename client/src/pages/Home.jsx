import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake, Leaf, Award } from 'lucide-react';
import ProductCard from '../components/ProductCard';
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
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#f5efe7] to-[#faf8f5] border-b border-stone-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ethnic-terracotta/10 text-ethnic-terracotta text-xs font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>বাংলার শাশ্বত ঐতিহ্য ও নকশী ফোঁড়</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-stone-900 leading-[1.15] font-bold">
              ঐতিহ্য ও আধুনিকতার <br />
              <span className="text-ethnic-red italic">অনুপম মেলবন্ধন</span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              গ্রামীণ প্রান্তিক নারীদের হাতে বোনা নিখুঁত নকশী কাঁথা শাড়ি ও থ্রি-পিস কালেকশন। প্রতিটি সুতোর গাঁথুনিতে ঐতিহ্যবাহী শিল্প ও আধুনিক রুচিশীলতার ছোঁয়া।
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => navigate('/shop')}
                className="w-full sm:w-auto bg-stone-900 text-amber-50 px-8 py-3.5 rounded-lg font-medium hover:bg-ethnic-red transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
              >
                <span>কালেকশন দেখুন</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/about')}
                className="w-full sm:w-auto border border-stone-300 text-stone-700 px-8 py-3.5 rounded-lg font-medium hover:bg-white hover:border-stone-400 transition"
              >
                আমাদের গল্প
              </button>
            </div>
          </div>

          {/* Hero Visual Imagery */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] sm:aspect-[16/11]">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80"
                alt="Soheli's Nakshi Kantha Sari"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs uppercase tracking-widest text-amber-300 font-medium">হ্যান্ডক্রাফটেড শাড়ি</span>
                <p className="font-serif text-xl sm:text-2xl mt-1">লাল বেনারসি ও সুতি নকশী কাঁথা ফিউশন</p>
                <p className="text-xs text-stone-300 mt-1">শতভাগ নির্ভেজাল সুতি ও সিল্কের নিখুঁত কাজ</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Fast Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs uppercase tracking-widest text-ethnic-red font-semibold">ক্যাটেগরি ব্রাউজ করুন</span>
          <h2 className="text-3xl font-serif text-stone-900 font-bold">আমাদের প্রধান সংগ্রহশালা</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div
            onClick={() => navigate('/shop?category=Sari')}
            className="group relative h-64 rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all"
          >
            <img
              src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
              alt="নকশী কাঁথা শাড়ি"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-stone-900/40 group-hover:bg-stone-900/30 transition-colors flex flex-col items-center justify-center p-4 text-center">
              <h3 className="text-white font-serif text-2xl font-bold tracking-wide">নকশী কাঁথা শাড়ি</h3>
              <p className="text-amber-200 text-xs mt-1">হাফ-সিল্ক, সুতি ও তসর কালেকশন</p>
              <span className="mt-4 text-xs bg-white/90 text-stone-900 px-4 py-1.5 rounded-full font-medium group-hover:bg-ethnic-red group-hover:text-white transition-colors">
                কালেকশন দেখুন
              </span>
            </div>
          </div>

          <div
            onClick={() => navigate('/shop?category=Three-Piece')}
            className="group relative h-64 rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all"
          >
            <img
              src="https://images.unsplash.com/photo-1583391733975-0814a0f4439c?auto=format&fit=crop&w=800&q=80"
              alt="হস্তশিল্প থ্রি-পিস"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-stone-900/40 group-hover:bg-stone-900/30 transition-colors flex flex-col items-center justify-center p-4 text-center">
              <h3 className="text-white font-serif text-2xl font-bold tracking-wide">নকশী থ্রি-পিস</h3>
              <p className="text-amber-200 text-xs mt-1">ভারী ওড়না ও আরামদায়ক কুর্তি</p>
              <span className="mt-4 text-xs bg-white/90 text-stone-900 px-4 py-1.5 rounded-full font-medium group-hover:bg-ethnic-red group-hover:text-white transition-colors">
                কালেকশন দেখুন
              </span>
            </div>
          </div>

          <div
            onClick={() => navigate('/shop?category=Two-Piece')}
            className="group relative h-64 rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all"
          >
            <img
              src="https://images.unsplash.com/photo-1596783074418-472714c62953?auto=format&fit=crop&w=800&q=80"
              alt="কুর্তি ও দুপাট্টা"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-stone-900/40 group-hover:bg-stone-900/30 transition-colors flex flex-col items-center justify-center p-4 text-center">
              <h3 className="text-white font-serif text-2xl font-bold tracking-wide">টু-পিস ও দুপাট্টা</h3>
              <p className="text-amber-200 text-xs mt-1">দৈনন্দিন ও উৎসবের ক্যাজুয়াল পরিধান</p>
              <span className="mt-4 text-xs bg-white/90 text-stone-900 px-4 py-1.5 rounded-full font-medium group-hover:bg-ethnic-red group-hover:text-white transition-colors">
                কালেকশন দেখুন
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-ethnic-red font-semibold">বিশেষ পছন্দ</span>
            <h2 className="text-3xl font-serif text-stone-900 font-bold">সিগনেচার নকশী কালেকশন</h2>
          </div>
          <button
            onClick={() => navigate('/shop')}
            className="text-stone-700 hover:text-ethnic-red text-sm font-medium flex items-center gap-1 group"
          >
            <span>সবগুলো দেখুন</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse bg-stone-200 rounded-xl h-80" />
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
          <div className="text-center py-12 bg-white rounded-xl border border-stone-200">
            <p className="text-stone-500 text-sm">কোনো বিশেষ পণ্য পাওয়া যায়নি।</p>
          </div>
        )}
      </section>

      {/* Brand Values / Why Soheli's */}
      <section className="bg-stone-100/70 border-y border-stone-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-ethnic-red font-semibold">আমাদের অঙ্গীকার</span>
            <h2 className="text-3xl font-serif text-stone-900 font-bold mt-1">কেন সোহেলিস অনন্য?</h2>
            <p className="text-sm text-stone-600 mt-2">আমরা কেবল পোশাক তৈরি করি না, বাঁচিয়ে রাখি একটি শতবর্ষী লোকশিল্প ও নারীদের আত্মনির্ভরশীলতা।</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-stone-200 shadow-sm text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-ethnic-red/10 text-ethnic-red flex items-center justify-center">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900">গ্রামীণ কারিগর ক্ষমতায়ন</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                প্রতিটি পণ্যের পেছনে রয়েছেন প্রত্যন্ত অঞ্চলের দক্ষ নারী কারিগর, যাদের শ্রমের উপযুক্ত পারিশ্রমিক ও সম্মান নিশ্চিত করে সোহেলিস।
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-stone-200 shadow-sm text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <Leaf className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900">শতভাগ পরিবেশবান্ধব ফ্যাব্রিক</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                প্রাকৃতিক অর্গানিক তুলা, খাদি ও খাঁটি তসর কাপড়ে প্রাকৃতিক রঙের সুতো দিয়ে সেলাই করা—যা ত্বকের জন্য সম্পূর্ণ নিরাপদ ও আরামদায়ক।
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-stone-200 shadow-sm text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-600/10 text-emerald-700 flex items-center justify-center">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900">নিখুঁত কোয়ালিটি ফিনিশিং</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                হাতে ফোঁড় তোলা শেষে প্রতিটি পোশাক অত্যন্ত যত্নে থ্রেড কাটিং, ওয়াশ ও আয়রন করে প্রিমিয়াম ক্রাফট প্যাকেজিংয়ে পৌঁছে দেওয়া হয়।
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


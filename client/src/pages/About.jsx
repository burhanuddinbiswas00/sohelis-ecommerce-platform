import React from 'react';
import { Sparkles, Heart, Users, ShieldCheck, ArrowRight } from 'lucide-react';

export default function About({ navigate }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest text-ethnic-red font-semibold">
          ঐতিহ্যের গল্প
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 leading-tight">
          সোহেলিস: ঐতিহ্যের সুতোয় বোনা আধুনিক রূপকথা
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-sans">
          বাংলার শতবর্ষের লোকশিল্প ও নকশী কাঁথার অতুলনীয় ফোঁড়কে আধুনিক রুচিশীল পোশাকের ক্যানভাসে ফুটিয়ে তোলার একটি গভীর ভালোবাসা ও প্রয়াস।
        </p>
      </div>

      {/* Main Story & Artisan Image */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-5 text-stone-700 text-sm leading-relaxed">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            আমাদের লক্ষ্য ও দর্শন
          </h2>
          <p>
            নকশী কাঁথা কেবল একটি সেলাই নয়; এটি আবহমান বাংলার নারীদের হাসি-কান্না, জীবনের গল্প ও শতাব্দীর শাশ্বত শিল্পচেতনার এক জীবন্ত দলিল। একসময় যা কেবল পরিবারের কাঁথায় সীমাবদ্ধ ছিল, সোহেলিস তাকে নিয়ে এসেছে আধুনিক শাড়ি, নান্দনিক কুর্তি ও জমকালো ওড়নার নকশায়।
          </p>
          <p>
            আমাদের প্রধান চালিকাশক্তি হলেন যশোর, জামালপুর ও বগুড়ার প্রত্যন্ত অঞ্চলের দক্ষ নারী কারিগররা। সোহেলিসের প্রতিটি কেনাকাটা সরাসরি গ্রামীণ নারীদের অর্থনৈতিক সাবলম্বিতা ও পারিবারিক মর্যাদা বৃদ্ধিতে ভূমিকা রাখে।
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/shop')}
              className="inline-flex items-center gap-2 bg-stone-900 text-amber-50 px-6 py-3 rounded-lg text-xs font-medium hover:bg-ethnic-red transition"
            >
              <span>কালেকশন এক্সপ্লোর করুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3]">
          <img
            src="https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80"
            alt="Nakshi Kantha Artisans at Work"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 5-Step Process */}
      <div className="bg-stone-50 rounded-2xl p-8 sm:p-12 border border-stone-200 space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-ethnic-red font-semibold">
            কাজের প্রক্রিয়া
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
            যেভাবে তৈরি হয় সোহেলিসের প্রতিটি সৃষ্টি
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-center">
          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm space-y-2">
            <span className="w-7 h-7 rounded-full bg-stone-900 text-white font-bold text-xs inline-flex items-center justify-center">1</span>
            <h4 className="font-semibold text-stone-900 text-xs">ফ্যাব্রিক সংগ্রহ</h4>
            <p className="text-[11px] text-stone-500">প্রাকৃতিক খাদি কটন, হাফ-সিল্ক ও তসর কাপড়ের নির্বাচন।</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm space-y-2">
            <span className="w-7 h-7 rounded-full bg-stone-900 text-white font-bold text-xs inline-flex items-center justify-center">2</span>
            <h4 className="font-semibold text-stone-900 text-xs">ডিজাইন স্কেচ</h4>
            <p className="text-[11px] text-stone-500">পদ্ম, ময়ূর, কলকা ও জ্যামিতিক নকশার নিখুঁত ড্রয়িং।</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm space-y-2">
            <span className="w-7 h-7 rounded-full bg-stone-900 text-white font-bold text-xs inline-flex items-center justify-center">3</span>
            <h4 className="font-semibold text-stone-900 text-xs">হাতে ফোঁড় তোলা</h4>
            <p className="text-[11px] text-stone-500">গ্রামীণ নারী শিল্পীদের কয়েক সপ্তাহের অক্লান্ত পরিশ্রম ও যত্ন।</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm space-y-2">
            <span className="w-7 h-7 rounded-full bg-stone-900 text-white font-bold text-xs inline-flex items-center justify-center">4</span>
            <h4 className="font-semibold text-stone-900 text-xs">কোয়ালিটি চেক</h4>
            <p className="text-[11px] text-stone-500">থ্রেড কাটিং, মৃদু ওয়াশ ও স্টিম আয়রনিং ফিনিশিং।</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm space-y-2">
            <span className="w-7 h-7 rounded-full bg-stone-900 text-white font-bold text-xs inline-flex items-center justify-center">5</span>
            <h4 className="font-semibold text-stone-900 text-xs">ইকো প্যাকেজিং</h4>
            <p className="text-[11px] text-stone-500">পরিবেশবান্ধব ক্রাফট বক্সে হাতে লেখা ধন্যবাদ পত্র সহ ডেলিভারি।</p>
          </div>
        </div>
      </div>
    </div>
  );
}

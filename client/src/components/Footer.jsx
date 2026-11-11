import React from 'react';
import { Sparkles, Phone, Mail, MapPin, Truck, ShieldCheck, RefreshCw } from 'lucide-react';

export default function Footer({ navigate }) {
  return (
    <footer className="bg-[#1f1a18] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Propositions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-stone-800 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center text-amber-400 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-medium text-sm">হস্তনির্মিত নকশী ঐতিহ্য</h4>
              <p className="text-xs text-stone-400 mt-1">শতভাগ প্রান্তিক নারী কারিগরদের ভালোবাসা ও নিপুণ হাতের ফোঁড়।</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center text-amber-400 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-medium text-sm">সমগ্র বাংলাদেশে দ্রুত ডেলিভারি</h4>
              <p className="text-xs text-stone-400 mt-1">RedX, Pathao ও Steadfast এর মাধ্যমে ক্যাশ অন ডেলিভারি সুবিধা।</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-medium text-sm">প্রিমিয়াম কোয়ালিটি নিশ্চয়তা</h4>
              <p className="text-xs text-stone-400 mt-1">খাঁটি সুতি ও তসর ফ্যাব্রিক, পাকা রঙ ও দীর্ঘস্থায়ী সুতা।</p>
            </div>
          </div>
        </div>

        {/* Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-12 border-b border-stone-800">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl text-white tracking-wider">Soheli's</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              সোহেলিস আধুনিক ঐতিহ্যবাহী পোশাকের একটি মেলবন্ধন। যেখানে প্রতিটি নকশী কাঁথার সুতোয় জড়িয়ে থাকে শতাব্দীর রূপকথা ও গ্রামীণ কারিগরদের স্বপ্ন।
            </p>
          </div>

          <div>
            <h4 className="text-white font-medium text-sm mb-4">কালেকশন</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => navigate('/shop?category=Sari')} className="hover:text-amber-400 transition">
                  নকশী কাঁথা শাড়ি
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/shop?category=Three-Piece')} className="hover:text-amber-400 transition">
                  হস্তশিল্প থ্রি-পিস সেট
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/shop?category=Two-Piece')} className="hover:text-amber-400 transition">
                  কুর্তি ও দুপাট্টা
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/shop')} className="hover:text-amber-400 transition">
                  সকল এক্সক্লুসিভ কালেকশন
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium text-sm mb-4">গ্রাহক সহায়তা</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => navigate('/track-order')} className="hover:text-amber-400 transition">
                  অর্ডার ট্র্যাকিং (Track Order)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-amber-400 transition">
                  আমাদের গল্প (About Us)
                </button>
              </li>
              <li>
                <span className="hover:text-stone-300">ডেলিভারি ও শিপিং পলিসি</span>
              </li>
              <li>
                <span className="hover:text-stone-300">রিটার্ন ও এক্সচেঞ্জ</span>
              </li>
              <li>
                <button onClick={() => navigate('/admin/login')} className="hover:text-amber-400 transition">
                  অ্যাডমিন পোর্টাল
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium text-sm mb-4">যোগাযোগ</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>+880 1711-000000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>hello@sohelis.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>বনানী, ঢাকা - ১২১৩, বাংলাদেশ</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Soheli's. সর্বস্বত্ব সংরক্ষিত। ঐতিহ্য বুনন আধুনিকতায়।</p>
          <div className="flex items-center space-x-4">
            <span className="text-[11px] bg-stone-800/80 px-2.5 py-1 rounded text-stone-400">ক্যাশ অন ডেলিভারি</span>
            <span className="text-[11px] bg-stone-800/80 px-2.5 py-1 rounded text-stone-400">বিকাশ / নগদ</span>
            <span className="text-[11px] bg-stone-800/80 px-2.5 py-1 rounded text-stone-400">রেডএক্স / পাঠাও</span>
          </div>
        </div>
      </div>
    </footer>
  );
}


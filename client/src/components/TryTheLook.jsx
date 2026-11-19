import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Check, Sparkles, Tag, ArrowRight, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const LOOKBOOK_SETS = [
  {
    id: 'look-1',
    title: 'হেরিটেজ রাজকীয় নকশী শাড়ি লুক (The Heritage Royal Sari Look)',
    subtitle: 'লাল তসর ও খাঁটি সুতোয় বোনা পদ্ম-কলকা মোটিফ শাড়ি ও নিখুঁত কারিগরি অ্যাকসেন্ট',
    modelImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
    hotspots: [
      {
        id: 'spot-1',
        top: '38%',
        left: '46%',
        label: 'হাতে বোনা লাল নকশী শাড়ি',
        productId: '6618f0b00000000000000001',
        name: 'সোহেলিস ক্লাসিক লাল নকশী কাঁথা শাড়ি',
        price: 5200,
        fabric: 'Pure Cotton & Tussar Blend',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
        badge: 'আঁচলে ভারী ফোঁড়',
      },
      {
        id: 'spot-2',
        top: '24%',
        left: '52%',
        label: 'আর্টিসান এমব্রয়ডার্ড ব্লাউজ পিস',
        productId: '6618f0b00000000000000010',
        name: 'নকশী কাঁথা বর্ডার ব্লাউজ পিস (Crimson Border Blouse)',
        price: 1800,
        fabric: 'Raw Silk with Golden Thread',
        image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
        badge: 'ম্যাচিং ফিনিশিং',
      },
      {
        id: 'spot-3',
        top: '72%',
        left: '68%',
        label: 'নকশী পোটলি ব্যাগ',
        productId: '6618f0b00000000000000011',
        name: 'ঐতিহ্যবাহী নকশী কাঁথা পোটলি ব্যাগ (Artisan Potli Clutch)',
        price: 1200,
        fabric: 'Hand-Stitched Cotton Velvet',
        image: 'https://images.unsplash.com/photo-1596783074418-472714c62953?auto=format&fit=crop&w=600&q=80',
        badge: 'হ্যান্ডমেড টাসেল',
      },
    ],
  },
  {
    id: 'look-2',
    title: 'রয়্যাল ব্লু লিনেন থ্রি-পিস লুক (Contemporary Indigo Three-Piece)',
    subtitle: 'আধুনিক আরামদায়ক কুর্তি ও ভারী নকশী কাঁথা ওড়নার চমৎকার কম্বিনেশন',
    modelImage: 'https://images.unsplash.com/photo-1583391733975-0814a0f4439c?auto=format&fit=crop&w=1200&q=85',
    hotspots: [
      {
        id: 'spot-4',
        top: '42%',
        left: '48%',
        label: 'রয়াল ব্লু লিনেন কুর্তি',
        productId: '6618f0b00000000000000004',
        name: 'রয়াল ব্লু রেশমী নকশী কাঁথা থ্রি-পিস সেট',
        price: 4800,
        fabric: 'Linen Kurti with Cotton Kantha Dupatta',
        image: 'https://images.unsplash.com/photo-1583391733975-0814a0f4439c?auto=format&fit=crop&w=600&q=80',
        badge: 'সম্পূর্ণ ৩-পিস সেট',
      },
      {
        id: 'spot-5',
        top: '30%',
        left: '62%',
        label: 'ভারী রেশমী কাঁথা ওড়না',
        productId: '6618f0b00000000000000012',
        name: 'এক্সক্লুসিভ নীল নকশী কাঁথা ওড়না (Signature Dupatta)',
        price: 2400,
        fabric: 'Handloom Cotton & Silk',
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
        badge: '৪ পাশের ভারী পাড়',
      },
    ],
  },
  {
    id: 'look-3',
    title: 'টেরাকোটা গোল্ডেন ঐতিহ্য লুক (Terracotta & Golden Artisan Look)',
    subtitle: 'মাটির সুবাসমাখা টেরাকোটা কুর্তি ও ঐতিহ্যবাহী অ্যান্টিক গোল্ডেন নকশী ওড়না',
    modelImage: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85',
    hotspots: [
      {
        id: 'spot-6',
        top: '36%',
        left: '50%',
        label: 'টেরাকোটা গোল্ডেন থ্রি-পিস',
        productId: '6618f0b00000000000000005',
        name: 'টেরাকোটা গোল্ডেন নকশী কাঁথা থ্রি-পিস',
        price: 5400,
        fabric: 'Handloom Cotton & Silk Thread',
        image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&q=80',
        badge: 'সিগনেচার কালার',
      },
      {
        id: 'spot-7',
        top: '68%',
        left: '42%',
        label: 'হাতে বোনা কটন ট্রাউজার',
        productId: '6618f0b00000000000000013',
        name: 'অফ-হোয়াইট আর্গানিক কটন ট্রাউজার (Artisan Trouser)',
        price: 1400,
        fabric: '100% Organic Cotton',
        image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
        badge: 'আরামদায়ক কাটিং',
      },
    ],
  },
];

export default function TryTheLook({ onSelectProduct }) {
  const [activeLookIdx, setActiveLookIdx] = useState(0);
  const currentLook = LOOKBOOK_SETS[activeLookIdx];
  const [activeSpotId, setActiveSpotId] = useState(currentLook.hotspots[0].id);
  const [addedItemIds, setAddedItemIds] = useState([]);
  const [fullLookAdded, setFullLookAdded] = useState(false);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleItemAdd = (item) => {
    addToCart(
      {
        _id: item.productId,
        name: item.name,
        price: item.price,
        image: item.image,
        category: 'Artisan Look',
        fabric: item.fabric,
        stock: 10,
      },
      1
    );

    setAddedItemIds((prev) => [...prev, item.id]);
    setTimeout(() => {
      setAddedItemIds((prev) => prev.filter((id) => id !== item.id));
    }, 2000);
  };

  const handleAddFullLook = () => {
    currentLook.hotspots.forEach((item) => {
      addToCart(
        {
          _id: item.productId,
          name: item.name,
          price: item.price,
          image: item.image,
          category: 'Full Look',
          fabric: item.fabric,
          stock: 10,
        },
        1
      );
    });

    setFullLookAdded(true);
    setTimeout(() => setFullLookAdded(false), 2500);
  };

  const totalLookPrice = currentLook.hotspots.reduce((sum, spot) => sum + spot.price, 0);

  return (
    <section id="try-the-look" className="w-full py-16 lg:py-24 bg-[#faf8f5] text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ethnic-terracotta/10 text-ethnic-terracotta text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ইন্টারঅ্যাক্টিভ শপেবল লুকবুক (Interactive Shoppable Lookbook)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900">
              Try the Look • সম্পূর্ণ স্টাইল এক ক্লিকে
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xl font-sans">
              ছবিতে প্রদর্শিত মডেলের প্রতিটি পোশাকে থাকা হটস্পট পিনে ক্লিক করে বিস্তারিত দেখুন এবং সরাসরি শপিং ব্যাগে যুক্ত করুন।
            </p>
          </div>

          {/* Look Set Selector Pills */}
          <div className="flex flex-wrap gap-2">
            {LOOKBOOK_SETS.map((look, idx) => (
              <button
                key={look.id}
                onClick={() => {
                  setActiveLookIdx(idx);
                  setActiveSpotId(LOOKBOOK_SETS[idx].hotspots[0].id);
                }}
                className={`text-xs px-4 py-2.5 rounded-xl font-medium transition-all ${
                  activeLookIdx === idx
                    ? 'bg-stone-900 text-amber-50 shadow-md scale-[1.02]'
                    : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                LOOK 0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Main Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left/Center: Visual Stage with Interactive Pins */}
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100 aspect-[3/4] sm:aspect-[4/5]">
            <img
              src={currentLook.modelImage}
              alt={currentLook.title}
              className="w-full h-full object-cover object-top transition-transform duration-700"
            />
            {/* Subtle aesthetic overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-black/20 pointer-events-none" />

            {/* Look Caption Tag */}
            <div className="absolute bottom-5 left-5 right-5 sm:right-auto bg-stone-900/80 backdrop-blur-md text-white p-4 rounded-2xl max-w-sm border border-white/10 shadow-lg pointer-events-none">
              <span className="text-[10px] text-amber-300 font-mono tracking-widest uppercase block">
                CURATED LOOK 0{activeLookIdx + 1}
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-white mt-0.5">
                {currentLook.title}
              </h3>
              <p className="text-[11px] text-stone-300 mt-1 line-clamp-1">
                {currentLook.subtitle}
              </p>
            </div>

            {/* Interactive Hotspot Pins */}
            {currentLook.hotspots.map((spot) => {
              const isActive = activeSpotId === spot.id;
              return (
                <div
                  key={spot.id}
                  style={{ top: spot.top, left: spot.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                >
                  <button
                    onClick={() => setActiveSpotId(spot.id)}
                    aria-label={spot.label}
                    className={`relative w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${
                      isActive
                        ? 'bg-ethnic-red text-white scale-110 ring-4 ring-white'
                        : 'bg-white/90 text-stone-900 hover:scale-105 hover:bg-white'
                    }`}
                  >
                    <Tag className="w-4 h-4 sm:w-5 sm:h-5" />

                    {/* Outer Pulsing Animation Ring */}
                    <span
                      className={`absolute inset-0 rounded-full pointer-events-none ${
                        isActive
                          ? 'animate-ping bg-ethnic-red/40'
                          : 'animate-pulse bg-white/40'
                      }`}
                    />
                  </button>

                  {/* Micro Floating Tooltip */}
                  <div
                    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap bg-stone-950/90 text-white text-[11px] px-3 py-1.5 rounded-lg shadow-xl pointer-events-none transition-all duration-200 border border-white/10 ${
                      isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
                    }`}
                  >
                    <span className="font-semibold block">{spot.label}</span>
                    <span className="text-amber-300 font-sans font-bold">৳ {spot.price.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Interactive Look Card & Item Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xl space-y-6">
              <div className="border-b border-stone-100 pb-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-ethnic-terracotta font-semibold">
                    শপেবল আইটেম তালিকা
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
                    লুকের অন্তর্ভুক্ত উপাদানসমূহ
                  </h3>
                </div>
                <span className="text-xs bg-stone-100 text-stone-700 px-3 py-1 rounded-full font-mono">
                  {currentLook.hotspots.length} টি পণ্য
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-3.5">
                {currentLook.hotspots.map((item) => {
                  const isHighlighted = activeSpotId === item.id;
                  const isAdded = addedItemIds.includes(item.id);
                  const isFaved = isInWishlist(item.productId);

                  return (
                    <motion.div
                      key={item.id}
                      onClick={() => setActiveSpotId(item.id)}
                      layout
                      className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex gap-4 items-center ${
                        isHighlighted
                          ? 'border-ethnic-red/80 bg-stone-50/80 shadow-md ring-1 ring-ethnic-red/30'
                          : 'border-stone-200 bg-white hover:border-stone-300'
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-20 sm:w-20 sm:h-24 object-cover rounded-xl border border-stone-100 shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        {item.badge && (
                          <span className="text-[10px] font-semibold text-ethnic-terracotta bg-ethnic-terracotta/10 px-2 py-0.5 rounded-full inline-block mb-1">
                            {item.badge}
                          </span>
                        )}
                        <h4 className="font-serif text-sm font-bold text-stone-900 leading-snug line-clamp-2">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-stone-500 mt-0.5 truncate">
                          {item.fabric}
                        </p>
                        <p className="text-sm font-bold text-stone-950 font-sans mt-1">
                          ৳ {item.price.toLocaleString('en-IN')}
                        </p>

                        <div className="flex items-center gap-2 mt-2.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleItemAdd(item);
                            }}
                            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition ${
                              isAdded
                                ? 'bg-emerald-700 text-white'
                                : 'bg-stone-900 text-white hover:bg-ethnic-red'
                            }`}
                          >
                            {isAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>যুক্ত হয়েছে</span>
                              </>
                            ) : (
                              <>
                                <ShoppingBag className="w-3.5 h-3.5" />
                                <span>কার্টে নিন</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleWishlist({
                                _id: item.productId,
                                name: item.name,
                                price: item.price,
                                image: item.image,
                                category: 'Artisan',
                                fabric: item.fabric,
                                stock: 10,
                              });
                            }}
                            className="p-1.5 text-stone-500 hover:text-ethnic-red rounded-lg transition hover:bg-stone-100"
                            title="পছন্দের তালিকায় রাখুন"
                          >
                            <Heart className={`w-4 h-4 ${isFaved ? 'fill-red-600 text-red-600' : ''}`} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Add Full Look Action Card */}
              <div className="bg-[#f5efe7] rounded-2xl p-5 border border-stone-200/80 space-y-4">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="text-[11px] text-stone-500 block uppercase font-medium">
                      সম্পূর্ণ লুকের মোট মূল্য
                    </span>
                    <span className="text-xl sm:text-2xl font-bold text-stone-950 font-sans">
                      ৳ {totalLookPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-100/70 px-2.5 py-1 rounded-full">
                    ফ্রি শিপিং প্রযোজ্য
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleAddFullLook}
                  className={`w-full py-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md active:scale-95 ${
                    fullLookAdded
                      ? 'bg-emerald-700 text-white'
                      : 'bg-ethnic-red hover:bg-red-900 text-white shadow-ethnic-red/20'
                  }`}
                >
                  {fullLookAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>সবগুলো পণ্য ব্যাগে যুক্ত হয়েছে!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add Full Look to Bag (সম্পূর্ণ লুক ব্যাগে নিন)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


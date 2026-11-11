import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShoppingBag, Check, ShieldCheck, Truck, RefreshCw, Sparkles, Star } from 'lucide-react';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';

export default function ProductDetail({ productId, onBack, navigate }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await getProductById(productId);
        setProduct(data.product);
      } catch (err) {
        console.error('Failed to load product details:', err);
      } finally {
        setLoading(false);
      }
    };
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-stone-300 border-t-ethnic-red rounded-full mx-auto" />
        <p className="text-stone-500 text-xs mt-4">পণ্যের বিস্তারিত লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p className="text-stone-700 text-base">পণ্যটি খুঁজে পাওয়া যায়নি।</p>
        <button
          onClick={onBack}
          className="mt-4 text-xs bg-stone-900 text-white px-4 py-2 rounded-lg"
        >
          দোকানে ফিরে যান
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.stock <= 0) return;
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    if (product.stock <= 0) return;
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-xs text-stone-600 hover:text-stone-950 transition font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>পূর্ববর্তী পেজে ফিরে যান</span>
      </button>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: Product Imagery */}
        <div className="space-y-4">
          <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-md bg-stone-100 aspect-[4/5] relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-stone-900 text-xs px-3 py-1 rounded-full font-medium shadow-sm">
              {product.category}
            </span>
            {product.stock <= 0 ? (
              <span className="absolute top-4 right-4 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-sm">
                স্টক শেষ
              </span>
            ) : (
              <span className="absolute top-4 right-4 bg-emerald-700 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                স্টকে আছে ({product.stock} টি)
              </span>
            )}
          </div>
        </div>

        {/* Right: Info and Actions */}
        <div className="space-y-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-ethnic-red font-semibold">
              ঐতিহ্যবাহী হস্তশিল্প
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif text-stone-900 font-bold mt-1 leading-snug">
              {product.name}
            </h1>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-stone-950 font-sans">
                ৳ {product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-stone-500 font-sans">ভ্যাট অন্তর্ভুক্ত</span>
            </div>
          </div>

          <div className="border-t border-b border-stone-200 py-4 space-y-3">
            <div className="text-sm text-stone-700 leading-relaxed">
              <h4 className="font-medium text-stone-900 mb-1">বিবরণ (Description):</h4>
              <p>{product.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
              <div>
                <span className="text-stone-400 block">ফ্যাব্রিক ও সুতা:</span>
                <span className="font-medium text-stone-800">{product.fabric || 'Pure Cotton'}</span>
              </div>
              <div>
                <span className="text-stone-400 block">তৈরির ধরন:</span>
                <span className="font-medium text-stone-800">১০০% হাতে তোলা নকশী ফোঁড়</span>
              </div>
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-xs text-stone-600 font-medium">পরিমাণ:</span>
              <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 transition"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-xs font-semibold text-stone-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(product.stock || 99, quantity + 1))}
                  className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 transition"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
              <span className="text-xs text-stone-400">
                (সর্বোচ্চ {product.stock} টি অর্ডারযোগ্য)
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg text-sm font-medium transition-all shadow-sm ${
                  added
                    ? 'bg-emerald-700 text-white'
                    : product.stock <= 0
                    ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    : 'bg-stone-900 text-white hover:bg-stone-800 active:scale-[0.98]'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>কার্টে যুক্ত হয়েছে</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>কার্টে যোগ করুন</span>
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
                className="flex-1 py-3.5 px-6 rounded-lg text-sm font-medium bg-ethnic-red text-white hover:bg-red-800 transition shadow-sm active:scale-[0.98]"
              >
                এখনই অর্ডার করুন (Buy Now)
              </button>
            </div>
          </div>

          {/* Delivery & Care assurances */}
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 space-y-3 text-xs text-stone-600">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-ethnic-terracotta shrink-0" />
              <span>ঢাকা সিটিতে ১-২ দিন (৳৮০), ঢাকার বাইরে ২-৩ দিনে হোম ডেলিভারি (৳১৫০)।</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>ডেলিভারির সময় খুলে দেখে নেওয়ার সুযোগ ও ক্যাশ অন ডেলিভারি।</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>যত্ন: ড্রাই ওয়াশ অথবা মাইল্ড শ্যাম্পু দিয়ে হালকা হাতে ধোবেন। রোদে উল্টো করে শুকান।</span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews & Artisan Note */}
      <div className="border-t border-stone-200 pt-12 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              ক্রেতাদের রিভিউ ও মতামত
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex text-amber-500">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-semibold text-stone-800">৪.৯ / ৫.০</span>
              <span className="text-xs text-stone-400">(১৮ জন ভেরিফাইড ক্রেতা)</span>
            </div>
          </div>
          <span className="text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full font-medium border border-emerald-200">
            ✓ ১০০% আসল হস্তশিল্প নিশ্চয়তা
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-stone-900 text-xs">রাবেয়া সুলতানা</span>
              <span className="text-[10px] text-stone-400">ঢাকা | ২ দিন আগে</span>
            </div>
            <div className="flex text-amber-400">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              "সেলাইয়ের ফিনিশিং এবং সুতোর রং অসাধারণ। আঁচলের নকশী কাঁথা কাজটি সত্যি প্রশংসনীয়! ডেলিভারিও পেয়েছি ২ দিনের মাথায়।"
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-stone-900 text-xs">তানিয়া হাসান</span>
              <span className="text-[10px] text-stone-400">চট্টগ্রাম | ৫ দিন আগে</span>
            </div>
            <div className="flex text-amber-400">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              "যেমনটি ছবিতে দেখেছি ঠিক তেমনই পেয়েছি। ফ্যাব্রিক খুবই আরামদায়ক ও নিখুঁত। পরিবারের সবাই খুব পছন্দ করেছে।"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


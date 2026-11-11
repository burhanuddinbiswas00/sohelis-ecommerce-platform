import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function Wishlist({ navigate, onSelectProduct }) {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
          <Heart className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-stone-900">
          আপনার পছন্দের তালিকা খালি
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto">
          আমাদের এক্সক্লুসিভ নকশী কাঁথা শাড়ি ও থ্রি-পিস কালেকশন থেকে আপনার প্রিয় পোশাকগুলো সেভ করে রাখুন।
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="mt-2 inline-flex items-center gap-2 bg-stone-900 text-amber-50 px-6 py-3 rounded-lg text-xs font-medium hover:bg-ethnic-red transition"
        >
          <span>পণ্য দেখুন</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-stone-200 pb-4">
        <span className="text-xs uppercase tracking-widest text-ethnic-red font-semibold">
          সংরক্ষিত তালিকা
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-0.5">
          আমার উইশলিস্ট ({wishlist.length})
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div
            key={product._id}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm hover:shadow-lg transition-all"
          >
            <div
              className="aspect-[4/5] bg-stone-100 overflow-hidden relative cursor-pointer"
              onClick={() => onSelectProduct && onSelectProduct(product._id)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-stone-800 text-[11px] px-2.5 py-1 rounded-full font-medium">
                {product.category}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromWishlist(product._id);
                }}
                className="absolute top-3 right-3 p-1.5 bg-white/90 rounded-full text-red-600 hover:bg-red-50 transition shadow-sm"
                title="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 flex flex-col flex-1 justify-between bg-white">
              <div>
                <h3
                  onClick={() => onSelectProduct && onSelectProduct(product._id)}
                  className="text-sm font-medium text-stone-900 group-hover:text-ethnic-red transition-colors line-clamp-2 cursor-pointer"
                >
                  {product.name}
                </h3>
                <span className="text-base font-bold text-stone-900 mt-2 block font-sans">
                  ৳ {product.price.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100">
                <button
                  onClick={() => {
                    addToCart(product, 1);
                    removeFromWishlist(product._id);
                  }}
                  disabled={product.stock <= 0}
                  className="w-full flex items-center justify-center gap-1.5 text-xs py-2.5 px-3 rounded-lg bg-stone-900 text-white hover:bg-ethnic-red transition disabled:bg-stone-200 disabled:text-stone-400 font-medium"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>ব্যাগে যোগ করুন</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


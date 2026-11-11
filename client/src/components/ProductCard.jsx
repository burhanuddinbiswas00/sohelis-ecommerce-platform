import React, { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, onSelectProduct }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (product.stock <= 0) return;
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const isOutOfStock = product.stock <= 0;

  return (
    <div
      onClick={() => onSelectProduct && onSelectProduct(product._id)}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-stone-200/80 bg-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      {/* Product Image */}
      <div className="aspect-[4/5] bg-stone-100 overflow-hidden relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-stone-800 text-[11px] px-2.5 py-1 rounded-full font-medium shadow-sm border border-stone-100">
          {product.category === 'Sari'
            ? 'শাড়ি'
            : product.category === 'Three-Piece'
            ? 'থ্রি-পিস'
            : product.category}
        </span>

        {/* Stock status badge */}
        {isOutOfStock ? (
          <span className="absolute top-3 right-3 bg-red-600/90 text-white text-[10px] px-2.5 py-1 rounded-full font-semibold">
            স্টক শেষ
          </span>
        ) : product.stock <= 3 ? (
          <span className="absolute top-3 right-3 bg-amber-500/90 text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
            মাত্র {product.stock} টি বাকি
          </span>
        ) : null}

        {/* Fabric tag */}
        {product.fabric && (
          <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-stone-100 text-[10px] px-2 py-0.5 rounded">
            {product.fabric}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          <h3 className="text-sm font-medium text-stone-900 group-hover:text-ethnic-red transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-stone-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Action */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-400 block font-sans">মূল্য</span>
            <span className="text-lg font-bold text-stone-900 font-sans tracking-tight">
              ৳ {product.price.toLocaleString('en-IN')}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-lg font-medium transition-all ${
              added
                ? 'bg-emerald-700 text-white shadow-sm'
                : isOutOfStock
                ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                : 'bg-stone-900 text-amber-50 hover:bg-ethnic-red active:scale-95 shadow-sm'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>যোগ হয়েছে</span>
              </>
            ) : isOutOfStock ? (
              <span>স্টক নেই</span>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>কার্টে যোগ করুন</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

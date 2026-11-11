# React.js Frontend Codebase for Soheli's

## 1. Navbar Component (`Navbar.jsx`)
```jsx
import React from 'react';
import { ShoppingBag, Heart, Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center lg:hidden">
          <button className="text-stone-700 hover:text-black">
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 lg:flex-none text-center lg:text-left">
          <a href="/" className="font-serif text-2xl tracking-wider text-stone-900">
            Soheli's
          </a>
        </div>
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-stone-700">
          <a href="/" className="hover:text-stone-900 transition-colors">হোম</a>
          <a href="/shop" className="hover:text-stone-900 transition-colors">শাড়ি কালেকশন</a>
          <a href="/shop" className="hover:text-stone-900 transition-colors">থ্রি-পিস</a>
          <a href="/about" className="hover:text-stone-900 transition-colors">আমাদের গল্প</a>
        </nav>
        <div className="flex items-center space-x-4">
          <button aria-label="Wishlist" className="p-2 text-stone-700 hover:text-stone-950 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          <a href="/cart" aria-label="Shopping Cart" className="p-2 text-stone-700 hover:text-stone-950 transition-colors relative">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute top-1 right-1 bg-stone-900 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
```

## 2. Product Card Component (`ProductCard.jsx`)
```jsx
import React from 'react';

export default function ProductCard({ product }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm hover:shadow-md transition-all duration-300">
      <div className="aspect-h-4 aspect-h-3 bg-stone-100 overflow-hidden relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-72 w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-stone-800 text-xs px-2.5 py-1 rounded-full font-medium">
          {product.category}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-sm font-medium text-stone-900 font-serif">
            <a href={`/product/${product._id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </a>
          </h3>
          <p className="mt-1 text-xs text-stone-500 line-clamp-1">{product.description}</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-base font-semibold text-stone-900">৳ {product.price}</span>
          <button className="relative z-10 bg-stone-900 text-white text-xs px-3 py-2 rounded hover:bg-stone-800 transition-colors">
            কার্টে যোগ করুন
          </button>
        </div>
      </div>
    </div>
  );
}
```

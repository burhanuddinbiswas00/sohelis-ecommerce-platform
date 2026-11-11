import React, { useState } from 'react';
import { ShoppingBag, Heart, Menu, X, ShieldCheck, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

export default function Navbar({ currentPath, navigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { isAuthenticated, logout } = useAuth();

  const navLinks = [
    { label: 'হোম', path: '/' },
    { label: 'শাড়ি কালেকশন', path: '/shop?category=Sari' },
    { label: 'থ্রি-পিস', path: '/shop?category=Three-Piece' },
    { label: 'সকল পণ্য', path: '/shop' },
    { label: 'অর্ডার ট্র্যাক', path: '/track-order' },
    { label: 'আমাদের গল্প', path: '/about' },
  ];

  const handleNav = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#faf8f5]/95 backdrop-blur-md border-b border-stone-200 shadow-sm">
      {/* Top Heritage Notice Bar */}
      <div className="bg-ethnic-red text-amber-50 text-[11px] sm:text-xs py-1.5 px-4 text-center tracking-wider flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        <span>শতভাগ হাতে বোনা গ্রামীণ নকশী কাঁথা শিল্প | সমগ্র বাংলাদেশে ক্যাশ অন ডেলিভারি</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Mobile menu trigger */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-700 hover:text-stone-950 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Brand Logo */}
        <div className="flex-1 lg:flex-none text-center lg:text-left">
          <button
            onClick={() => handleNav('/')}
            className="group text-left focus:outline-none"
          >
            <span className="font-serif text-2xl sm:text-3xl tracking-widest text-stone-900 group-hover:text-ethnic-red transition-colors font-bold">
              Soheli's
            </span>
            <span className="block text-[9px] uppercase tracking-[0.25em] text-stone-500 font-sans -mt-1">
              Heritage Woven Modern
            </span>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-stone-700">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path || (link.path.startsWith('/shop?category=') && currentPath.includes(link.path.split('?')[1]));
            return (
              <button
                key={link.label}
                onClick={() => handleNav(link.path)}
                className={`transition-colors py-1 relative ${
                  isActive
                    ? 'text-ethnic-red font-semibold'
                    : 'hover:text-stone-900 text-stone-700'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ethnic-red rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleNav('/admin')}
                className="flex items-center gap-1.5 text-xs bg-stone-900 text-white px-3 py-1.5 rounded-full hover:bg-stone-800 transition"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>অ্যাডমিন</span>
              </button>
              <button
                onClick={logout}
                className="text-xs text-stone-500 hover:text-stone-800 underline"
              >
                লগআউট
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleNav('/admin/login')}
              title="Admin Portal"
              className="text-stone-400 hover:text-stone-700 transition p-1"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
          )}

          {/* Wishlist Icon */}
          <button
            onClick={() => handleNav('/wishlist')}
            aria-label="Wishlist"
            className="p-2 text-stone-700 hover:text-ethnic-red transition relative focus:outline-none"
            title="পছন্দের তালিকা (Wishlist)"
          >
            <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 bg-stone-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Icon */}
          <button
            onClick={() => handleNav('/cart')}
            aria-label="Shopping Cart"
            className="p-2 text-stone-800 hover:text-ethnic-red transition relative focus:outline-none"
          >
            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-ethnic-red text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-50 border-b border-stone-200 px-4 pt-2 pb-6 space-y-3 animate-fadeIn">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.path)}
              className="block w-full text-left py-2 px-3 rounded text-stone-800 hover:bg-stone-200 font-medium text-sm"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-stone-200">
            {isAuthenticated ? (
              <button
                onClick={() => handleNav('/admin')}
                className="block w-full text-left py-2 px-3 text-ethnic-red font-medium text-sm"
              >
                অ্যাডমিন ড্যাশবোর্ড
              </button>
            ) : (
              <button
                onClick={() => handleNav('/admin/login')}
                className="block w-full text-left py-2 px-3 text-stone-500 text-sm"
              >
                অ্যাডমিন লগইন
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}


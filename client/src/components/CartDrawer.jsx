import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, ArrowRight, Truck, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer({ navigate }) {
  const {
    cart,
    cartCount,
    subtotal,
    shippingFee,
    grandTotal,
    deliveryDistrict,
    setDeliveryDistrict,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const handleCheckoutClick = () => {
    closeDrawer();
    navigate('/checkout');
  };

  const handleShopClick = () => {
    closeDrawer();
    navigate('/shop');
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Dimmed Blurred Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeDrawer}
            className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm"
          />

          {/* Slide-over Container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-5 sm:p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-ethnic-red" />
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                    শপিং ব্যাগ ({cartCount})
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={closeDrawer}
                  aria-label="Close cart drawer"
                  className="p-2 rounded-full text-stone-500 hover:text-stone-950 hover:bg-stone-200/60 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Delivery Bar */}
              <div className="bg-[#f5efe7] px-5 py-2.5 border-b border-stone-200/70 flex items-center gap-2 text-xs text-stone-700">
                <Truck className="w-4 h-4 text-ethnic-terracotta shrink-0" />
                <span>সমগ্র বাংলাদেশে ক্যাশ অন ডেলিভারি ও দ্রুত কুরিয়ার সুবিধা</span>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="py-20 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <p className="text-base font-serif font-bold text-stone-900">
                      আপনার ব্যাগ বর্তমানে খালি
                    </p>
                    <p className="text-xs text-stone-500 max-w-xs mx-auto">
                      আমাদের ঐতিহ্যবাহী নকশী কাঁথা কালেকশন থেকে আপনার প্রিয় পণ্যটি যুক্ত করুন।
                    </p>
                    <button
                      type="button"
                      onClick={handleShopClick}
                      className="inline-flex items-center gap-2 bg-stone-900 text-white text-xs px-5 py-2.5 rounded-xl hover:bg-ethnic-red transition"
                    >
                      <span>কালেকশন দেখুন</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-stone-100 space-y-3">
                    {cart.map((item) => (
                      <div key={item.product._id} className="pt-3 flex gap-3.5 items-center">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-20 object-cover rounded-xl border border-stone-100 shrink-0"
                        />

                        <div className="flex-1 min-w-0 text-xs">
                          <h4 className="font-serif text-sm font-bold text-stone-900 truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-[11px] text-stone-500 truncate">
                            ফ্যাব্রিক: {item.product.fabric || 'Pure Cotton'}
                          </p>
                          <p className="text-sm font-bold text-stone-950 font-sans mt-0.5">
                            ৳ {(item.product.price * item.quantity).toLocaleString('en-IN')}
                          </p>

                          {/* Quantity selector & Delete */}
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                                className="px-2 py-0.5 text-stone-600 hover:bg-stone-200"
                              >
                                -
                              </button>
                              <span className="px-2.5 py-0.5 font-bold text-stone-900 text-xs">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                                className="px-2 py-0.5 text-stone-600 hover:bg-stone-200"
                                disabled={item.quantity >= (item.product.stock || 99)}
                              >
                                +
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeFromCart(item.product._id)}
                              className="text-stone-400 hover:text-red-600 p-1"
                              title="মুছে ফেলুন"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Drawer Footer / Totals & Checkout */}
              {cart.length > 0 && (
                <div className="border-t border-stone-200 p-5 sm:p-6 space-y-4 bg-stone-50/50">
                  {/* Delivery Location Toggle */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-stone-700 block">
                      ডেলিভারি এলাকা:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setDeliveryDistrict('Dhaka')}
                        className={`text-xs py-1.5 px-2 rounded-lg border font-medium text-center transition ${
                          deliveryDistrict === 'Dhaka'
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-white text-stone-700 border-stone-300'
                        }`}
                      >
                        ঢাকা সিটি (৳৮০)
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeliveryDistrict('Outside Dhaka')}
                        className={`text-xs py-1.5 px-2 rounded-lg border font-medium text-center transition ${
                          deliveryDistrict === 'Outside Dhaka'
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-white text-stone-700 border-stone-300'
                        }`}
                      >
                        ঢাকার বাইরে (৳১৫০)
                      </button>
                    </div>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="space-y-1.5 text-xs text-stone-600 pt-1 border-t border-stone-200/60">
                    <div className="flex justify-between">
                      <span>সাবটোটাল</span>
                      <span className="font-semibold text-stone-900 font-sans">
                        ৳ {subtotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>ডেলিভারি চার্জ</span>
                      <span className="font-semibold text-stone-900 font-sans">
                        ৳ {shippingFee}
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-stone-950 pt-1.5 border-t border-stone-200">
                      <span>সর্বমোট</span>
                      <span className="text-ethnic-red font-sans">
                        ৳ {grandTotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Action Button */}
                  <button
                    type="button"
                    onClick={handleCheckoutClick}
                    className="w-full py-3.5 rounded-xl bg-stone-900 hover:bg-ethnic-red text-white text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 shadow-lg active:scale-95"
                  >
                    <span>অর্ডার সম্পন্ন করতে এগিয়ে যান</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    <span>ক্যাশ অন ডেলিভারি অথবা বিকাশ / নগদ</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}


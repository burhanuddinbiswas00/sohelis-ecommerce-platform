import React from 'react';
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart({ navigate }) {
  const {
    cart,
    subtotal,
    shippingFee,
    grandTotal,
    deliveryDistrict,
    setDeliveryDistrict,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-stone-900">আপনার শপিং ব্যাগ বর্তমানে খালি</h2>
        <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto">
          আমাদের এক্সক্লুসিভ নকশী কাঁথা শাড়ি ও থ্রি-পিস কালেকশন থেকে আপনার পছন্দের পোশাকটি ব্যাগে যোগ করুন।
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="mt-2 inline-flex items-center gap-2 bg-stone-900 text-amber-50 px-6 py-3 rounded-lg text-xs font-medium hover:bg-ethnic-red transition"
        >
          <span>শপিং শুরু করুন</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center justify-between border-b border-stone-200 pb-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-ethnic-red font-semibold">শপিং ব্যাগ</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-0.5">
            কার্টের আইটেমসমূহ ({cart.length})
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-stone-500 hover:text-red-600 transition underline"
        >
          সব খালি করুন
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Cart Item List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.product._id}
              className="bg-white rounded-xl border border-stone-200 p-4 sm:p-5 flex gap-4 sm:gap-6 items-center shadow-sm"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-lg border border-stone-100 shrink-0"
              />

              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                  {item.product.category}
                </span>
                <h3 className="font-serif text-sm sm:text-base font-bold text-stone-900 truncate mt-1">
                  {item.product.name}
                </h3>
                <p className="text-xs text-stone-500">ফ্যাব্রিক: {item.product.fabric || 'Pure Cotton'}</p>
                <p className="text-sm font-bold text-stone-900 mt-1 font-sans">
                  ৳ {item.product.price.toLocaleString('en-IN')}
                </p>

                {/* Quantity and Delete */}
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center border border-stone-300 rounded overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                      className="px-2.5 py-0.5 text-xs text-stone-600 hover:bg-stone-100"
                    >
                      -
                    </button>
                    <span className="px-3 py-0.5 text-xs font-semibold text-stone-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                      className="px-2.5 py-0.5 text-xs text-stone-600 hover:bg-stone-100"
                      disabled={item.quantity >= (item.product.stock || 99)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product._id)}
                    className="text-stone-400 hover:text-red-600 transition p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Line total */}
              <div className="text-right hidden sm:block">
                <span className="text-xs text-stone-400 block">মোট</span>
                <span className="text-base font-bold text-stone-900 font-sans">
                  ৳ {(item.product.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          ))}

          <button
            onClick={() => navigate('/shop')}
            className="flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 font-medium pt-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>আরও কেনাকাটা করুন</span>
          </button>
        </div>

        {/* Order Summary & District Selection */}
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-6">
          <h2 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">
            অর্ডার সামারি
          </h2>

          {/* District selector for shipping calculation */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-stone-700 block">
              ডেলিভারি এলাকা নির্বাচন করুন:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setDeliveryDistrict('Dhaka')}
                className={`text-xs py-2 px-3 rounded-lg border font-medium transition text-center ${
                  deliveryDistrict === 'Dhaka'
                    ? 'border-stone-900 bg-stone-900 text-white'
                    : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400'
                }`}
              >
                ঢাকা সিটি (৳৮০)
              </button>
              <button
                type="button"
                onClick={() => setDeliveryDistrict('Outside Dhaka')}
                className={`text-xs py-2 px-3 rounded-lg border font-medium transition text-center ${
                  deliveryDistrict === 'Outside Dhaka'
                    ? 'border-stone-900 bg-stone-900 text-white'
                    : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400'
                }`}
              >
                ঢাকার বাইরে (৳১৫০)
              </button>
            </div>
          </div>

          <div className="space-y-2.5 text-xs text-stone-600 border-t border-b border-stone-100 py-4">
            <div className="flex justify-between">
              <span>সাবটোটাল</span>
              <span className="font-semibold text-stone-900 font-sans">
                ৳ {subtotal.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between">
              <span>ডেলিভারি চার্জ ({deliveryDistrict === 'Dhaka' ? 'ঢাকা' : 'ঢাকার বাইরে'})</span>
              <span className="font-semibold text-stone-900 font-sans">
                ৳ {shippingFee}
              </span>
            </div>
            <div className="flex justify-between text-sm font-bold text-stone-950 pt-2 border-t border-stone-100">
              <span>সর্বমোট প্রদেয়</span>
              <span className="text-lg text-ethnic-red font-sans">
                ৳ {grandTotal.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-3.5 px-4 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-ethnic-red transition flex items-center justify-center gap-2 shadow-sm"
          >
            <span>অর্ডার সম্পন্ন করতে এগিয়ে যান</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[11px] text-center text-stone-400">
            সমগ্র বাংলাদেশে ক্যাশ অন ডেলিভারি প্রযোজ্য।
          </p>
        </div>
      </div>
    </div>
  );
}

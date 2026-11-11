import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, Truck, ArrowLeft, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/api';

export default function Checkout({ navigate }) {
  const {
    cart,
    subtotal,
    shippingFee,
    grandTotal,
    deliveryDistrict,
    setDeliveryDistrict,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    address: '',
    district: deliveryDistrict || 'Dhaka',
    paymentMethod: 'Cash on Delivery',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [placedOrder, setPlacedOrder] = useState(null);

  if (cart.length === 0 && !placedOrder) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <p className="text-stone-600 text-sm">আপনার ব্যাগে কোনো পণ্য নেই। অর্ডার করতে প্রথমে পণ্য যুক্ত করুন।</p>
        <button
          onClick={() => navigate('/shop')}
          className="text-xs bg-stone-900 text-white px-6 py-2.5 rounded-lg hover:bg-stone-800"
        >
          দোকানে ফিরে যান
        </button>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'district') {
      setDeliveryDistrict(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.customerName.trim()) {
      setError('অনুগ্রহ করে আপনার পুরো নাম লিখুন।');
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      setError('অনুগ্রহ করে সঠিক মোবাইল নম্বর প্রদান করুন (কমপক্ষে ১১ ডিজিট)।');
      return;
    }
    if (!formData.address.trim()) {
      setError('অনুগ্রহ করে বিস্তারিত ডেলিভারি ঠিকানা প্রদান করুন।');
      return;
    }

    setLoading(true);

    try {
      const orderPayload = {
        customerName: formData.customerName.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        district: formData.district,
        paymentMethod: formData.paymentMethod,
        shippingFee,
        notes: formData.notes.trim(),
        items: cart.map((item) => ({
          productId: item.product._id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image,
        })),
      };

      const result = await createOrder(orderPayload);
      if (result.success) {
        setPlacedOrder(result.order);
        clearCart();
      } else {
        setError(result.message || 'অর্ডার সম্পন্ন হতে সমস্যা হয়েছে।');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(
        err.response?.data?.message || err.message || 'অর্ডার করতে সাময়িক ত্রুটি দেখা দিয়েছে।'
      );
    } finally {
      setLoading(false);
    }
  };

  // Order Confirmation Success View
  if (placedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 space-y-6">
        <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs uppercase tracking-widest text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded-full">
            অর্ডার সফলভাবে গৃহীত হয়েছে
          </span>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            ধন্যবাদ, {placedOrder.customerName}!
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
            আপনার ঐতিহ্যবাহী নকশী কাঁথা অর্ডারের জন্য আন্তরিক ধন্যবাদ। খুব শীঘ্রই আমাদের কাস্টমার কেয়ার প্রতিনিধি ফোন কলের মাধ্যমে অর্ডারটি কনফার্ম করবেন।
          </p>

          <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 text-left space-y-3 text-xs">
            <div className="flex justify-between border-b border-stone-200 pb-2">
              <span className="text-stone-500">অর্ডার নম্বর:</span>
              <span className="font-mono font-bold text-stone-900">{placedOrder._id}</span>
            </div>
            <div className="flex justify-between border-b border-stone-200 pb-2">
              <span className="text-stone-500">মোবাইল:</span>
              <span className="font-semibold text-stone-800">{placedOrder.phone}</span>
            </div>
            <div className="flex justify-between border-b border-stone-200 pb-2">
              <span className="text-stone-500">ঠিকানা:</span>
              <span className="text-stone-800 max-w-xs text-right">{placedOrder.address} ({placedOrder.district})</span>
            </div>
            <div className="flex justify-between border-b border-stone-200 pb-2">
              <span className="text-stone-500">পেমেন্ট মেথড:</span>
              <span className="font-semibold text-stone-800">{placedOrder.paymentMethod}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-stone-900 pt-1">
              <span>সর্বমোট প্রদেয় বিল:</span>
              <span className="text-ethnic-red font-sans">৳ {placedOrder.totalAmount?.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/shop')}
              className="bg-stone-900 text-amber-50 px-6 py-3 rounded-lg text-xs font-medium hover:bg-stone-800 transition"
            >
              আরও কেনাকাটা করুন
            </button>
            <button
              onClick={() => navigate('/')}
              className="border border-stone-300 text-stone-700 px-6 py-3 rounded-lg text-xs font-medium hover:bg-stone-100 transition"
            >
              হোম পেজে যান
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-stone-200 pb-4">
        <button
          onClick={() => navigate('/cart')}
          className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 mb-2 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>কার্টে ফিরে যান</span>
        </button>
        <span className="text-xs uppercase tracking-widest text-ethnic-red font-semibold">চেকআউট ও ডেলিভারি</span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-0.5">
          ডেলিভারি তথ্য ও অর্ডার নিশ্চিতকরণ
        </h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-xs font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6 bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">
            গ্রাহকের তথ্য ও ঠিকানা
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                আপনার পুরো নাম <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                required
                placeholder="যেমন: সোনিয়া আক্তার"
                className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-ethnic-red"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                সচল মোবাইল নম্বর <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="যেমন: 01712345678"
                className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-ethnic-red"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                ডেলিভারি এলাকা <span className="text-red-500">*</span>
              </label>
              <select
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-ethnic-red"
              >
                <option value="Dhaka">ঢাকা সিটি (ডেলিভারি চার্জ ৳৮০)</option>
                <option value="Outside Dhaka">ঢাকার বাইরে (ডেলিভারি চার্জ ৳১৫০)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                পেমেন্ট মেথড
              </label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-ethnic-red"
              >
                <option value="Cash on Delivery">ক্যাশ অন ডেলিভারি (পণ্য পেয়ে মূল্য পরিশোধ)</option>
                <option value="bKash / Nagad">বিকাশ / নগদ (অগ্রিম পরিশোধ)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              বিস্তারিত ডেলিভারি ঠিকানা <span className="text-red-500">*</span>
            </label>
            <textarea
              name="address"
              rows={3}
              value={formData.address}
              onChange={handleInputChange}
              required
              placeholder="বাড়ি নং, রোড নং, এলাকা/মহল্লা, থানা..."
              className="w-full text-xs p-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-ethnic-red"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              বিশেষ কোনো নির্দেশনা (ঐচ্ছিক)
            </label>
            <input
              type="text"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="যেমন: বিকেলে ডেলিভারি করবেন"
              className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-ethnic-red"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 bg-ethnic-red text-white rounded-lg text-sm font-semibold hover:bg-red-800 transition flex items-center justify-center gap-2 shadow-md active:scale-[0.99] disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>অর্ডার প্রসেস হচ্ছে...</span>
              </>
            ) : (
              <span>অর্ডার কনফার্ম করুন (৳ {grandTotal.toLocaleString('en-IN')})</span>
            )}
          </button>
        </form>

        {/* Mini Order Summary */}
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-4">
          <h3 className="font-serif text-base font-bold text-stone-900 border-b border-stone-100 pb-2">
            অর্ডারের পণ্যসমূহ ({cart.length})
          </h3>

          <div className="divide-y divide-stone-100 max-h-72 overflow-y-auto space-y-2 pr-1">
            {cart.map((item) => (
              <div key={item.product._id} className="pt-2 flex items-center gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-12 h-14 object-cover rounded border border-stone-200 shrink-0"
                />
                <div className="flex-1 min-w-0 text-xs">
                  <p className="font-medium text-stone-800 truncate">{item.product.name}</p>
                  <p className="text-stone-400">পরিমাণ: {item.quantity} টি</p>
                  <p className="font-semibold text-stone-900 font-sans">
                    ৳ {(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-stone-200 pt-3 space-y-2 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>সাবটোটাল</span>
              <span className="font-semibold text-stone-900 font-sans">
                ৳ {subtotal.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between">
              <span>ডেলিভারি চার্জ</span>
              <span className="font-semibold text-stone-900 font-sans">৳ {shippingFee}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-stone-950 pt-2 border-t border-stone-100">
              <span>সর্বমোট</span>
              <span className="text-ethnic-red font-sans text-base">
                ৳ {grandTotal.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


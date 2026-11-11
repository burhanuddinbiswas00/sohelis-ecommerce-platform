import React, { useState } from 'react';
import { Search, Package, Clock, Truck, CheckCircle2, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { trackOrder } from '../services/api';

export default function TrackOrder({ navigate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState('');

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setError('অনুগ্রহ করে অর্ডার নম্বর অথবা মোবাইল নম্বর লিখুন।');
      return;
    }

    setLoading(true);
    setError('');
    setOrders(null);

    try {
      const data = await trackOrder(searchQuery.trim());
      if (data.orders && data.orders.length > 0) {
        setOrders(data.orders);
      } else {
        setError('এই তথ্যের সাথে কোনো অর্ডার খুঁজে পাওয়া যায়নি। অনুগ্রহ করে সঠিক নম্বর দিয়ে পুনরায় চেষ্টা করুন।');
      }
    } catch (err) {
      console.error('Tracking error:', err);
      setError(err.response?.data?.message || 'অর্ডার ট্র্যাক করতে সমস্যা হয়েছে।');
    } finally {
      setLoading(false);
    }
  };

  const getStepIndex = (status) => {
    switch (status) {
      case 'Pending': return 1;
      case 'Processing': return 2;
      case 'Shipped': return 3;
      case 'Delivered': return 4;
      case 'Cancelled': return 0;
      default: return 1;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs uppercase tracking-widest text-ethnic-red font-semibold">
          অর্ডার ট্র্যাকিং
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
          আপনার অর্ডারের বর্তমান অবস্থা জানুন
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
          অর্ডার দেওয়ার সময় প্রাপ্ত অর্ডার নম্বর (Order ID) অথবা অর্ডারকৃত মোবাইল নম্বর প্রদান করে রিয়েল-টাইম ডেলিভারি আপডেট দেখুন।
        </p>
      </div>

      {/* Search Box */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm max-w-xl mx-auto">
        <form onSubmit={handleTrack} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="অর্ডার আইডি (যেমন: 6618f0...) বা মোবাইল নম্বর"
              className="w-full text-xs pl-10 pr-4 py-3.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-ethnic-red"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-4" />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-ethnic-red transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>অনুসন্ধান করা হচ্ছে...</span>
              </>
            ) : (
              <>
                <span>অর্ডার ট্র্যাক করুন</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Tracking Results */}
      {orders && (
        <div className="space-y-6">
          <h2 className="font-serif text-xl font-bold text-stone-900">
            অনুসন্ধানের ফলাফল ({orders.length} টি অর্ডার পাওয়া গেছে)
          </h2>

          <div className="space-y-6">
            {orders.map((ord) => {
              const currentStep = getStepIndex(ord.status);
              const isCancelled = ord.status === 'Cancelled';

              return (
                <div
                  key={ord._id}
                  className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6"
                >
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-stone-100 pb-4">
                    <div>
                      <span className="text-[10px] font-mono text-stone-400 uppercase">
                        অর্ডার আইডি: {ord._id}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-stone-900 mt-0.5">
                        {ord.customerName}
                      </h3>
                      <p className="text-xs text-stone-500">
                        তারিখ: {new Date(ord.createdAt).toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>

                    <div>
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-semibold ${
                          ord.status === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : ord.status === 'Shipped'
                            ? 'bg-purple-100 text-purple-800'
                            : ord.status === 'Processing'
                            ? 'bg-blue-100 text-blue-800'
                            : ord.status === 'Cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        বর্তমান স্ট্যাটাস: {ord.status}
                      </span>
                    </div>
                  </div>

                  {/* Status Visual Tracker */}
                  {!isCancelled ? (
                    <div className="py-4">
                      <div className="grid grid-cols-4 gap-2 relative">
                        {/* Tracker step 1 */}
                        <div className="text-center space-y-1.5">
                          <div
                            className={`w-9 h-9 mx-auto rounded-full flex items-center justify-center text-xs font-bold ${
                              currentStep >= 1 ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-500'
                            }`}
                          >
                            <Package className="w-4 h-4" />
                          </div>
                          <span className="text-[11px] font-semibold text-stone-800 block">অর্ডার গৃহীত</span>
                          <span className="text-[10px] text-stone-400 block hidden sm:block">Pending</span>
                        </div>

                        {/* Tracker step 2 */}
                        <div className="text-center space-y-1.5">
                          <div
                            className={`w-9 h-9 mx-auto rounded-full flex items-center justify-center text-xs font-bold ${
                              currentStep >= 2 ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-500'
                            }`}
                          >
                            <Clock className="w-4 h-4" />
                          </div>
                          <span className="text-[11px] font-semibold text-stone-800 block">প্রস্তুত হচ্ছে</span>
                          <span className="text-[10px] text-stone-400 block hidden sm:block">Processing</span>
                        </div>

                        {/* Tracker step 3 */}
                        <div className="text-center space-y-1.5">
                          <div
                            className={`w-9 h-9 mx-auto rounded-full flex items-center justify-center text-xs font-bold ${
                              currentStep >= 3 ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-500'
                            }`}
                          >
                            <Truck className="w-4 h-4" />
                          </div>
                          <span className="text-[11px] font-semibold text-stone-800 block">কুরিয়ারে হস্তান্তর</span>
                          <span className="text-[10px] text-stone-400 block hidden sm:block">Shipped</span>
                        </div>

                        {/* Tracker step 4 */}
                        <div className="text-center space-y-1.5">
                          <div
                            className={`w-9 h-9 mx-auto rounded-full flex items-center justify-center text-xs font-bold ${
                              currentStep >= 4 ? 'bg-emerald-700 text-white' : 'bg-stone-200 text-stone-500'
                            }`}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <span className="text-[11px] font-semibold text-stone-800 block">ডেলিভার্ড</span>
                          <span className="text-[10px] text-stone-400 block hidden sm:block">Delivered</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg">
                      এই অর্ডারটি বাতিল করা হয়েছে। বিস্তারিত জানতে অনুগ্রহ করে আমাদের হটলাইনে যোগাযোগ করুন।
                    </div>
                  )}

                  {/* Order Details */}
                  <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-600">
                    <div>
                      <p className="font-semibold text-stone-900 mb-1">ডেলিভারি ঠিকানা:</p>
                      <p>{ord.address} ({ord.district})</p>
                      <p className="mt-1">মোবাইল: {ord.phone}</p>
                      <p className="mt-1">পেমেন্ট: {ord.paymentMethod}</p>
                    </div>

                    <div>
                      <p className="font-semibold text-stone-900 mb-1">পণ্যসমূহ:</p>
                      <div className="space-y-1">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between">
                            <span className="truncate pr-2">{it.name} (x{it.quantity})</span>
                            <span className="font-semibold font-sans">৳ {(it.price * it.quantity).toLocaleString('en-IN')}</span>
                          </div>
                        ))}
                        <div className="border-t border-stone-200 pt-1 flex justify-between font-bold text-stone-900">
                          <span>সর্বমোট বিল:</span>
                          <span className="text-ethnic-red font-sans">৳ {ord.totalAmount?.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

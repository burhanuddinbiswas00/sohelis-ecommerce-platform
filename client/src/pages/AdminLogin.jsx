import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin({ navigate }) {
  const [email, setEmail] = useState('admin@sohelis.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      console.error('Login error:', err);
      setError(
        err.response?.data?.message || 'লগইন ব্যর্থ হয়েছে। ইমেইল ও পাসওয়ার্ড পুনরায় পরীক্ষা করুন।'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20 space-y-6">
      <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-stone-900 text-amber-400 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold">
            সোহেলিস অ্যাডমিন পোর্টাল
          </span>
          <h1 className="text-2xl font-serif font-bold text-stone-900">
            অ্যাডমিন ড্যাশবোর্ড লগইন
          </h1>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-lg text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              অ্যাডমিন ইমেইল
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full text-xs pl-9 pr-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900"
              />
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              পাসওয়ার্ড
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full text-xs pl-9 pr-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900"
              />
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800 transition flex items-center justify-center gap-2 shadow-sm"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>যাচাই করা হচ্ছে...</span>
              </>
            ) : (
              <>
                <span>লগইন করুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-[11px] text-stone-600 space-y-1">
          <p className="font-semibold text-stone-800">ডিফল্ট অ্যাডমিন ক্রেডেনশিয়াল:</p>
          <p>ইমেইল: <code className="bg-stone-200 px-1 py-0.5 rounded">admin@sohelis.com</code></p>
          <p>পাসওয়ার্ড: <code className="bg-stone-200 px-1 py-0.5 rounded">admin123</code></p>
        </div>
      </div>
    </div>
  );
}

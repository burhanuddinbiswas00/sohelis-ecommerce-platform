import React, { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal, RefreshCw } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';

export default function Shop({ initialCategory, onSelectProduct }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    fetchFilteredProducts();
  }, [selectedCategory]);

  const fetchFilteredProducts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedCategory && selectedCategory !== 'All') {
        params.category = selectedCategory;
      }
      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }
      const data = await getProducts(params);
      setProducts(data.products || []);
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchFilteredProducts();
  };

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const categories = [
    { id: 'All', label: 'সকল কালেকশন' },
    { id: 'Sari', label: 'শাড়ি (Sari)' },
    { id: 'Three-Piece', label: 'থ্রি-পিস (Three-Piece)' },
    { id: 'Two-Piece', label: 'টু-পিস (Two-Piece)' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-ethnic-red font-semibold">আমাদের শপ</span>
          <h1 className="text-3xl sm:text-4xl font-serif text-stone-900 font-bold mt-1">
            {selectedCategory === 'All'
              ? 'সকল এক্সক্লুসিভ কালেকশন'
              : selectedCategory === 'Sari'
              ? 'নকশী কাঁথা শাড়ি সম্ভার'
              : selectedCategory === 'Three-Piece'
              ? 'হ্যান্ড-স্টিচড থ্রি-পিস সম্ভার'
              : `${selectedCategory} কালেকশন`}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            মোট {sortedProducts.length} টি ঐতিহ্যবাহী পণ্য পাওয়া গেছে
          </p>
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-3">
          <label className="text-xs text-stone-500 font-medium whitespace-nowrap">সর্ট করুন:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs border border-stone-300 rounded-lg px-3 py-2 bg-white text-stone-800 focus:outline-none focus:ring-1 focus:ring-ethnic-red"
          >
            <option value="newest">নতুন সংযোজন (Newest)</option>
            <option value="price-low">মূল্য: কম থেকে বেশি</option>
            <option value="price-high">মূল্য: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-xs px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="পণ্য বা ফ্যাব্রিক খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-8 py-2.5 rounded-lg border border-stone-300 bg-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-ethnic-red"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                fetchFilteredProducts();
              }}
              className="text-stone-400 hover:text-stone-700 absolute right-3 top-2.5 text-xs font-bold"
            >
              ✕
            </button>
          )}
        </form>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div key={n} className="animate-pulse bg-stone-200/70 rounded-xl h-80" />
          ))}
        </div>
      ) : sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl border border-stone-200 space-y-4">
          <p className="text-stone-500 text-sm">এই ক্যাটেগরি বা অনুসন্ধানে কোনো পণ্য পাওয়া যায়নি।</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
              fetchFilteredProducts();
            }}
            className="text-xs bg-stone-900 text-white px-4 py-2 rounded-lg hover:bg-stone-800 transition"
          >
            ফিল্টার রিসেট করুন
          </button>
        </div>
      )}
    </div>
  );
}


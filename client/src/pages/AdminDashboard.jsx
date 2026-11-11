import React, { useState, useEffect } from 'react';
import {
  Package,
  ShoppingBag,
  Clock,
  DollarSign,
  Plus,
  Trash2,
  Edit2,
  RefreshCw,
  LogOut,
  AlertCircle,
  CheckCircle,
  Search,
  Printer,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  getOrders,
  updateOrderStatus,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/api';

export default function AdminDashboard({ navigate }) {
  const { user, token, logout, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'products'

  // Orders State
  const [orders, setOrders] = useState([]);
  const [orderStats, setOrderStats] = useState(null);
  const [orderFilter, setOrderFilter] = useState('All');
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);

  // Products State
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form State for Products
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Sari',
    price: '',
    image: '',
    description: '',
    fabric: 'Pure Cotton',
    stock: 10,
    featured: false,
  });

  const [actionMessage, setActionMessage] = useState('');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchOrders();
    fetchProductsList();
  }, [token, orderFilter]);

  const showFeedback = (msg) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(''), 3000);
  };

  const fetchOrders = async () => {
    setOrdersLoading(true);
    try {
      const data = await getOrders(token, orderFilter);
      setOrders(data.orders || []);
      if (data.stats) {
        setOrderStats(data.stats);
      }
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setOrdersLoading(false);
    }
  };

  const fetchProductsList = async () => {
    setProductsLoading(true);
    try {
      const data = await getProducts();
      setProducts(data.products || []);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setProductsLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus, token);
      showFeedback(`অর্ডার স্ট্যাটাস সফলভাবে "${newStatus}" এ পরিবর্তন হয়েছে।`);
      fetchOrders();
    } catch (err) {
      alert('স্ট্যাটাস পরিবর্তন করা সম্ভব হয়নি: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, productForm, token);
        showFeedback('পণ্যটি সফলভাবে আপডেট করা হয়েছে।');
      } else {
        await createProduct(productForm, token);
        showFeedback('নতুন পণ্য সফলভাবে যুক্ত করা হয়েছে।');
      }
      setShowAddModal(false);
      setEditingProduct(null);
      setProductForm({
        name: '',
        category: 'Sari',
        price: '',
        image: '',
        description: '',
        fabric: 'Pure Cotton',
        stock: 10,
        featured: false,
      });
      fetchProductsList();
    } catch (err) {
      alert('পণ্য সংরক্ষণ ব্যর্থ: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      description: product.description,
      fabric: product.fabric || 'Pure Cotton',
      stock: product.stock,
      featured: product.featured || false,
    });
    setShowAddModal(true);
  };

  const handleDeleteProduct = async (id, name) => {
    if (!window.confirm(`আপনি কি নিশ্চিত যে "${name}" মুছে ফেলতে চান?`)) return;
    try {
      await deleteProduct(id, token);
      showFeedback('পণ্য মুছে ফেলা হয়েছে।');
      fetchProductsList();
    } catch (err) {
      alert('পণ্য ডিলিট ব্যর্থ: ' + (err.response?.data?.message || err.message));
    }
  };

  const openNewProductModal = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      category: 'Sari',
      price: '',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      description: '',
      fabric: 'Pure Cotton',
      stock: 10,
      featured: false,
    });
    setShowAddModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-ethnic-red font-semibold">
            কন্ট্রোল প্যানেল
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-0.5">
            সোহেলিস অ্যাডমিন ড্যাশবোর্ড
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            লগইন আছেন: <span className="font-semibold text-stone-800">{user?.name || user?.email}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="text-xs border border-stone-300 text-stone-700 px-3.5 py-2 rounded-lg hover:bg-white"
          >
            ওয়েবসাইট দেখুন
          </button>
          <button
            onClick={() => {
              logout();
              navigate('/admin/login');
            }}
            className="flex items-center gap-1.5 text-xs bg-stone-900 text-white px-3.5 py-2 rounded-lg hover:bg-stone-800 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>লগআউট</span>
          </button>
        </div>
      </div>

      {actionMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2.5 rounded-lg text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs">মোট বিক্রয় (বিক্রিত মূল্য)</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-stone-900 font-sans">
            ৳ {(orderStats?.totalSales || orders.reduce((acc, o) => acc + o.totalAmount, 0)).toLocaleString('en-IN')}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs">মোট অর্ডার সংখ্যা</span>
            <ShoppingBag className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-stone-900 font-sans">
            {orderStats?.totalOrders || orders.length} টি
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs">অপেক্ষমান (Pending)</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-amber-600 font-sans">
            {orderStats?.pendingCount || orders.filter((o) => o.status === 'Pending').length} টি
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs">সক্রিয় পণ্য সংখ্যা</span>
            <Package className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-stone-900 font-sans">
            {products.length} টি
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-stone-200 gap-6">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 text-sm font-semibold transition relative ${
            activeTab === 'orders'
              ? 'text-ethnic-red border-b-2 border-ethnic-red'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          অর্ডার ম্যানেজমেন্ট ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 text-sm font-semibold transition relative ${
            activeTab === 'products'
              ? 'text-ethnic-red border-b-2 border-ethnic-red'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          পণ্য ক্যাটালগ ও স্টক ({products.length})
        </button>
      </div>

      {/* TAB 1: ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex flex-wrap gap-2">
              {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((st) => (
                <button
                  key={st}
                  onClick={() => setOrderFilter(st)}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition ${
                    orderFilter === st
                      ? 'bg-stone-900 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {st === 'All' ? 'সকল অর্ডার' : st}
                </button>
              ))}
            </div>

            <button
              onClick={fetchOrders}
              className="text-xs flex items-center gap-1.5 text-stone-600 hover:text-stone-900 bg-white border border-stone-300 px-3 py-1.5 rounded-lg"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>রিফ্রেশ</span>
            </button>
          </div>

          {ordersLoading ? (
            <div className="text-center py-12 text-stone-500 text-xs">অর্ডার লোড হচ্ছে...</div>
          ) : orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((ord) => (
                <div
                  key={ord._id}
                  className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
                    <div>
                      <span className="text-[10px] font-mono text-stone-400">আইডি: {ord._id}</span>
                      <h3 className="font-serif text-base font-bold text-stone-900">
                        {ord.customerName}
                      </h3>
                      <p className="text-xs text-stone-600">
                        মোবাইল: <a href={`tel:${ord.phone}`} className="text-blue-600 underline font-semibold">{ord.phone}</a> | এলাকা: {ord.district}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedInvoiceOrder(ord)}
                        className="flex items-center gap-1.5 text-xs bg-stone-100 hover:bg-stone-200 text-stone-800 px-3 py-1.5 rounded-lg border border-stone-200 transition"
                        title="Print Packaging Slip / Invoice"
                      >
                        <Printer className="w-3.5 h-3.5 text-stone-600" />
                        <span>ইনভয়েস</span>
                      </button>

                      <div>
                        <span className="text-[10px] text-stone-400 block sm:text-right">স্ট্যাটাস পরিবর্তন</span>
                        <select
                          value={ord.status}
                          onChange={(e) => handleStatusChange(ord._id, e.target.value)}
                          className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border focus:outline-none ${
                            ord.status === 'Pending'
                              ? 'bg-amber-50 text-amber-800 border-amber-300'
                              : ord.status === 'Processing'
                              ? 'bg-blue-50 text-blue-800 border-blue-300'
                              : ord.status === 'Shipped'
                              ? 'bg-purple-50 text-purple-800 border-purple-300'
                              : ord.status === 'Delivered'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : 'bg-red-50 text-red-800 border-red-300'
                          }`}
                        >
                          <option value="Pending">Pending (অপেক্ষমান)</option>
                          <option value="Processing">Processing (প্রস্তুত হচ্ছে)</option>
                          <option value="Shipped">Shipped (কুরিয়ারে হস্তান্তর)</option>
                          <option value="Delivered">Delivered (ডেলিভার্ড)</option>
                          <option value="Cancelled">Cancelled (বাতিল)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Order items & address details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-stone-600">
                    <div>
                      <p className="font-semibold text-stone-800 mb-1">ডেলিভারি ঠিকানা:</p>
                      <p className="bg-stone-50 p-2.5 rounded border border-stone-100">
                        {ord.address}
                      </p>
                      {ord.notes && (
                        <p className="mt-1 text-[11px] text-stone-500 italic">নোট: {ord.notes}</p>
                      )}
                    </div>

                    <div>
                      <p className="font-semibold text-stone-800 mb-1">অর্ডারকৃত পণ্যসমূহ:</p>
                      <div className="space-y-1.5 bg-stone-50 p-2.5 rounded border border-stone-100">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between">
                            <span className="truncate pr-2">{it.name} (x{it.quantity})</span>
                            <span className="font-mono font-semibold">৳ {(it.price * it.quantity).toLocaleString('en-IN')}</span>
                          </div>
                        ))}
                        <div className="border-t border-stone-200 pt-1 flex justify-between font-bold text-stone-900">
                          <span>ডেলিভারি সহ সর্বমোট:</span>
                          <span className="text-ethnic-red">৳ {ord.totalAmount?.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-stone-200 text-stone-500 text-xs">
              এই ফিল্টারে কোনো অর্ডার পাওয়া যায়নি।
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PRODUCTS */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-xs text-stone-500">
              দোকানের সকল পণ্য পরিচালনা ও নতুন পণ্য আপলোড করুন
            </p>
            <button
              onClick={openNewProductModal}
              className="flex items-center gap-1.5 bg-stone-900 text-amber-50 px-4 py-2 rounded-lg text-xs font-medium hover:bg-ethnic-red transition shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন পণ্য যুক্ত করুন</span>
            </button>
          </div>

          {productsLoading ? (
            <div className="text-center py-12 text-stone-500 text-xs">পণ্য লোড হচ্ছে...</div>
          ) : (
            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs text-stone-700">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-900 uppercase font-semibold">
                  <tr>
                    <th className="p-3.5">পণ্য</th>
                    <th className="p-3.5">ক্যাটেগরি</th>
                    <th className="p-3.5">মূল্য</th>
                    <th className="p-3.5">স্টক</th>
                    <th className="p-3.5">ফ্যাব্রিক</th>
                    <th className="p-3.5 text-right">একশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {products.map((prod) => (
                    <tr key={prod._id} className="hover:bg-stone-50/70 transition">
                      <td className="p-3.5 flex items-center gap-3">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-10 h-12 object-cover rounded border border-stone-200"
                        />
                        <div className="max-w-xs">
                          <p className="font-semibold text-stone-900 truncate">{prod.name}</p>
                          {prod.featured && (
                            <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-medium">
                              Featured
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-3.5">{prod.category}</td>
                      <td className="p-3.5 font-bold font-sans">৳ {prod.price.toLocaleString('en-IN')}</td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded font-medium ${
                          prod.stock <= 0
                            ? 'bg-red-100 text-red-700'
                            : prod.stock <= 3
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {prod.stock} টি
                        </span>
                      </td>
                      <td className="p-3.5 text-stone-500">{prod.fabric || 'Cotton'}</td>
                      <td className="p-3.5 text-right space-x-2">
                        <button
                          onClick={() => handleEditClick(prod)}
                          className="p-1.5 text-stone-600 hover:text-stone-950 hover:bg-stone-200 rounded"
                          title="Edit Product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(prod._id, prod.name)}
                          className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Product Add / Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-stone-200 pb-3">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                {editingProduct ? 'পণ্য আপডেট করুন' : 'নতুন পণ্য যুক্ত করুন'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">পণ্যের নাম *</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="যেমন: ক্লাসিক লাল নকশী কাঁথা শাড়ি"
                  className="w-full px-3 py-2 border rounded-lg border-stone-300 focus:outline-none focus:ring-1 focus:ring-ethnic-red"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">ক্যাটেগরি *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg border-stone-300 bg-white"
                  >
                    <option value="Sari">Sari (শাড়ি)</option>
                    <option value="Three-Piece">Three-Piece (থ্রি-পিস)</option>
                    <option value="Two-Piece">Two-Piece (টু-পিস)</option>
                    <option value="Dupatta">Dupatta (ওড়না)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">মূল্য (টাকা) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    placeholder="যেমন: 5200"
                    className="w-full px-3 py-2 border rounded-lg border-stone-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">স্টক পরিমাণ *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg border-stone-300"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">ফ্যাব্রিক টাইপ</label>
                  <input
                    type="text"
                    value={productForm.fabric}
                    onChange={(e) => setProductForm({ ...productForm, fabric: e.target.value })}
                    placeholder="যেমন: Pure Cotton, Half-Silk"
                    className="w-full px-3 py-2 border rounded-lg border-stone-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">ছবির লিঙ্ক (Image URL) *</label>
                <input
                  type="url"
                  required
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border rounded-lg border-stone-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">বিস্তারিত বিবরণ *</label>
                <textarea
                  required
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="পণ্যের উপাদান, হাতের কাজের বিবরণ..."
                  className="w-full p-2.5 border rounded-lg border-stone-300"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={productForm.featured}
                  onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })}
                  className="rounded border-stone-300 text-ethnic-red"
                />
                <label htmlFor="featured" className="text-stone-700 font-medium">
                  হোমপেজে স্পেশাল ফিচারড হিসেবে প্রদর্শন করুন
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-stone-300 rounded-lg text-stone-600 hover:bg-stone-100"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-stone-900 text-white rounded-lg hover:bg-ethnic-red transition font-medium"
                >
                  {editingProduct ? 'আপডেট করুন' : 'সংরক্ষণ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable Packaging Slip & Invoice Modal */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[95vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-stone-200 pb-3 print:hidden">
              <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
                ডেলিভারি প্যাকেজিং স্লিপ ও ইনভয়েস
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 text-xs bg-stone-900 text-white px-3.5 py-1.5 rounded-lg hover:bg-stone-800 transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>প্রিন্ট করুন</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedInvoiceOrder(null)}
                  className="p-1.5 text-stone-400 hover:text-stone-700 font-bold text-sm"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Printable Content Body */}
            <div className="border border-stone-300 p-6 rounded-xl space-y-6 text-stone-800">
              {/* Header */}
              <div className="flex justify-between items-start border-b border-stone-300 pb-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-stone-900">Soheli's</h2>
                  <p className="text-[10px] uppercase tracking-widest text-stone-500">Heritage Woven Modern</p>
                  <p className="text-xs text-stone-600 mt-1">বনানী, ঢাকা - ১২১৩ | হটলাইন: +880 1711-000000</p>
                </div>
                <div className="text-right text-xs">
                  <p className="font-mono font-bold text-stone-900">ইনভয়েস নং: #{selectedInvoiceOrder._id.slice(-6).toUpperCase()}</p>
                  <p className="text-stone-500">তারিখ: {new Date(selectedInvoiceOrder.createdAt).toLocaleDateString()}</p>
                  <p className="font-semibold text-ethnic-red mt-1">ক্যাশ অন ডেলিভারি স্লিপ</p>
                </div>
              </div>

              {/* Recipient Details */}
              <div className="grid grid-cols-2 gap-4 text-xs bg-stone-50 p-3.5 rounded-lg border border-stone-200">
                <div>
                  <span className="text-[10px] text-stone-400 block uppercase font-bold">গ্রাহকের তথ্য (To):</span>
                  <p className="font-bold text-stone-900 text-sm mt-0.5">{selectedInvoiceOrder.customerName}</p>
                  <p className="font-semibold text-stone-800">ফোন: {selectedInvoiceOrder.phone}</p>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block uppercase font-bold">ডেলিভারি ঠিকানা:</span>
                  <p className="text-stone-800">{selectedInvoiceOrder.address}</p>
                  <p className="font-medium text-stone-700">জেলা/সিটি: {selectedInvoiceOrder.district}</p>
                </div>
              </div>

              {/* Items Table */}
              <table className="w-full text-left text-xs border border-stone-200">
                <thead className="bg-stone-100 border-b border-stone-200 text-stone-900 font-bold">
                  <tr>
                    <th className="p-2.5">বিবরণ</th>
                    <th className="p-2.5 text-center">পরিমাণ</th>
                    <th className="p-2.5 text-right">একক মূল্য</th>
                    <th className="p-2.5 text-right">মোট</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {selectedInvoiceOrder.items.map((it, idx) => (
                    <tr key={idx}>
                      <td className="p-2.5 font-medium">{it.name}</td>
                      <td className="p-2.5 text-center">{it.quantity}</td>
                      <td className="p-2.5 text-right font-mono">৳ {it.price.toLocaleString('en-IN')}</td>
                      <td className="p-2.5 text-right font-mono font-semibold">৳ {(it.price * it.quantity).toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Summary Totals */}
              <div className="flex justify-end text-xs">
                <div className="w-64 space-y-1.5 border-t border-stone-300 pt-2">
                  <div className="flex justify-between">
                    <span className="text-stone-600">ডেলিভারি চার্জ:</span>
                    <span className="font-mono">৳ {selectedInvoiceOrder.shippingFee || 80}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-stone-950 border-t border-stone-200 pt-1">
                    <span>সংগ্রহযোগ্য বিল (COD):</span>
                    <span className="text-ethnic-red font-mono font-bold">৳ {selectedInvoiceOrder.totalAmount?.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Footer Note */}
              <div className="border-t border-dashed border-stone-300 pt-3 text-[10px] text-stone-500 text-center">
                <p>পণ্য গ্রহণের সময় অনুগ্রহ করে চেক করে নিন। সোহেলিসের সাথে থাকার জন্য ধন্যবাদ!</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


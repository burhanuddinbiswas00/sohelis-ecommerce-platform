import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import About from './pages/About';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname + window.location.search);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname + window.location.search);
      // check if path is product detail
      const match = window.location.pathname.match(/\/product\/([a-zA-Z0-9]+)/);
      if (match) {
        setSelectedProductId(match[1]);
      } else {
        setSelectedProductId(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const match = path.match(/\/product\/([a-zA-Z0-9]+)/);
    if (match) {
      setSelectedProductId(match[1]);
    } else {
      setSelectedProductId(null);
    }
  };

  const handleSelectProduct = (id) => {
    setSelectedProductId(id);
    navigate(`/product/${id}`);
  };

  const renderPage = () => {
    const path = currentPath.split('?')[0];
    const searchParams = new URLSearchParams(currentPath.split('?')[1] || '');
    const categoryParam = searchParams.get('category');

    if (selectedProductId || path.startsWith('/product/')) {
      const pId = selectedProductId || path.split('/product/')[1];
      return (
        <ProductDetail
          productId={pId}
          onBack={() => navigate('/shop')}
          navigate={navigate}
        />
      );
    }

    switch (path) {
      case '/':
        return <Home navigate={navigate} onSelectProduct={handleSelectProduct} />;
      case '/shop':
        return (
          <Shop
            initialCategory={categoryParam || 'All'}
            onSelectProduct={handleSelectProduct}
          />
        );
      case '/cart':
        return <Cart navigate={navigate} />;
      case '/checkout':
        return <Checkout navigate={navigate} />;
      case '/admin':
        return <AdminDashboard navigate={navigate} />;
      case '/admin/login':
        return <AdminLogin navigate={navigate} />;
      case '/about':
        return <About navigate={navigate} />;
      default:
        return <Home navigate={navigate} onSelectProduct={handleSelectProduct} />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-[#faf8f5]">
          <Navbar currentPath={currentPath} navigate={navigate} />
          <main className="flex-1">{renderPage()}</main>
          <Footer navigate={navigate} />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

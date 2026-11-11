import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('soheli_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [deliveryDistrict, setDeliveryDistrict] = useState('Dhaka');

  useEffect(() => {
    try {
      localStorage.setItem('soheli_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to persist cart to localStorage', e);
    }
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product._id === product._id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIndex].quantity + quantity;
        const maxStock = product.stock !== undefined ? product.stock : 99;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: Math.min(newQty, maxStock),
        };
        return updated;
      } else {
        return [...prevCart, { product, quantity: Math.min(quantity, product.stock || 1) }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.product._id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.product._id === productId) {
          const maxStock = item.product.stock !== undefined ? item.product.stock : 99;
          return { ...item, quantity: Math.min(newQuantity, maxStock) };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('soheli_cart');
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = deliveryDistrict === 'Dhaka' ? 80 : 150;
  const grandTotal = subtotal > 0 ? subtotal + shippingFee : 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        subtotal,
        shippingFee,
        grandTotal,
        deliveryDistrict,
        setDeliveryDistrict,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

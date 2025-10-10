import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { cartAPI } from '../api/cartAPI';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], subtotal: 0, itemCount: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCart({ items: [], subtotal: 0, itemCount: 0 });
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await cartAPI.getCart();
      setCart({
        items: data.items || [],
        subtotal: data.subtotal || 0,
        itemCount: data.itemCount || 0
      });
      setError(null);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    if (!isAuthenticated) {
      throw new Error('Please login to add items to cart');
    }

    try {
      setLoading(true);
      setError(null);
      await cartAPI.addToCart(product._id || product.id, quantity);
      await fetchCart();
      return { success: true };
    } catch (err) {
      console.error('Failed to add to cart:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      setError(null);
      await cartAPI.updateQuantity(productId, quantity);
      await fetchCart();
    } catch (err) {
      console.error('Failed to update quantity:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      setError(null);
      await cartAPI.removeFromCart(productId);
      await fetchCart();
    } catch (err) {
      console.error('Failed to remove from cart:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated) {
      setCart({ items: [], subtotal: 0, itemCount: 0 });
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await cartAPI.clearCart();
      setCart({ items: [], subtotal: 0, itemCount: 0 });
    } catch (err) {
      console.error('Failed to clear cart:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const isInCart = (productId) => {
    return cart.items.some(item =>
      (item.product._id || item.product.id) === productId
    );
  };

  const getItemQuantity = (productId) => {
    const item = cart.items.find(item =>
      (item.product._id || item.product.id) === productId
    );
    return item ? item.quantity : 0;
  };

  const getCartSummary = () => {
    const subtotal = cart.subtotal;
    const shipping = subtotal > 999 ? 0 : 50;
    const tax = subtotal * 0.18;
    const total = subtotal + shipping + tax;

    return {
      subtotal,
      shipping,
      tax,
      total,
      itemCount: cart.itemCount
    };
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    cart,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    fetchCart,
    clearError,
    isInCart,
    getItemQuantity,
    getCartSummary
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

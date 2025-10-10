import axiosInstance from './axios';

export const cartAPI = {
  getCart: async () => {
    const response = await axiosInstance.get('/cart');
    return response.data;
  },

  addToCart: async (productId, quantity) => {
    const response = await axiosInstance.post('/cart', { productId, quantity });
    return response.data;
  },

  updateQuantity: async (productId, quantity) => {
    const response = await axiosInstance.put(`/cart/${productId}`, { quantity });
    return response.data;
  },

  removeFromCart: async (productId) => {
    const response = await axiosInstance.delete(`/cart/${productId}`);
    return response.data;
  },

  clearCart: async () => {
    const response = await axiosInstance.delete('/cart');
    return response.data;
  }
};

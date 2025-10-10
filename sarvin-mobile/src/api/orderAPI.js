import axiosInstance from './axios';

export const orderAPI = {
  createOrder: async (orderData) => {
    const response = await axiosInstance.post('/orders', orderData);
    return response.data;
  },

  getOrders: async () => {
    const response = await axiosInstance.get('/orders');
    return response.data;
  },

  getOrderById: async (orderId) => {
    const response = await axiosInstance.get(`/orders/${orderId}`);
    return response.data;
  },

  verifyPayment: async (paymentData) => {
    const response = await axiosInstance.post('/orders/verify-payment', paymentData);
    return response.data;
  }
};

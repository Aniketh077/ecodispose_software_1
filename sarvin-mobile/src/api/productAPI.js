import axiosInstance from './axios';

export const productAPI = {
  getAllProducts: async (params = {}) => {
    const response = await axiosInstance.get('/products', { params });
    return response.data;
  },

  getProductById: async (id) => {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  },

  getProductsByCollection: async (collectionName, params = {}) => {
    const response = await axiosInstance.get(`/products/collection/${collectionName}`, { params });
    return response.data;
  },

  searchProducts: async (query) => {
    const response = await axiosInstance.get('/products/search', { params: { query } });
    return response.data;
  }
};

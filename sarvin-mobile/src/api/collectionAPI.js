import axiosInstance from './axios';

export const collectionAPI = {
  getAllCollections: async () => {
    const response = await axiosInstance.get('/collections');
    return response.data;
  },

  getCollectionBySlug: async (slug) => {
    const response = await axiosInstance.get(`/collections/${slug}`);
    return response.data;
  }
};

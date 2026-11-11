import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token helper
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Auto-attach from localStorage if available
const storedToken = localStorage.getItem('soheli_admin_token');
if (storedToken) {
  setAuthToken(storedToken);
}

// Products API
export const getProducts = async (params = {}) => {
  const response = await api.get('/products', { params });
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (productData, token) => {
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  const response = await api.post('/products', productData, config);
  return response.data;
};

export const updateProduct = async (id, productData, token) => {
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  const response = await api.put(`/products/${id}`, productData, config);
  return response.data;
};

export const deleteProduct = async (id, token) => {
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  const response = await api.delete(`/products/${id}`, config);
  return response.data;
};

// Orders API
export const createOrder = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

export const getOrders = async (token, status) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    params: status && status !== 'All' ? { status } : {},
  };
  const response = await api.get('/orders', config);
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

export const updateOrderStatus = async (id, status, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await api.put(`/orders/${id}/status`, { status }, config);
  return response.data;
};

// Auth API
export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const getMe = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await api.get('/auth/me', config);
  return response.data;
};

export default api;

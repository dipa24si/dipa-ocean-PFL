import axios from 'axios';

/**
 * API Service dengan Axios
 * Digunakan untuk semua API calls dari aplikasi
 */

// Base URL - Ganti dengan API Anda yang sebenarnya
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor untuk menambahkan token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor untuk handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired - redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * Auth API Calls
 */
export const authAPI = {
  // Login
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  
  // Register
  register: (name, email, password) =>
    api.post('/auth/register', { name, email, password }),
  
  // Logout
  logout: () =>
    api.post('/auth/logout'),
  
  // Get current user
  getCurrentUser: () =>
    api.get('/auth/me'),
  
  // Refresh token
  refreshToken: () =>
    api.post('/auth/refresh'),
};

/**
 * Dashboard API Calls
 */
export const dashboardAPI = {
  // Get stats
  getStats: () =>
    api.get('/dashboard/stats'),
  
  // Get orders
  getOrders: () =>
    api.get('/dashboard/orders'),
  
  // Get inventory
  getInventory: () =>
    api.get('/dashboard/inventory'),
  
  // Get sales data
  getSalesData: () =>
    api.get('/dashboard/sales'),
};

/**
 * Products API Calls
 */
export const productsAPI = {
  // Get all products
  getAll: () =>
    api.get('/products'),
  
  // Get product by ID
  getById: (id) =>
    api.get(`/products/${id}`),
  
  // Create product
  create: (data) =>
    api.post('/products', data),
  
  // Update product
  update: (id, data) =>
    api.put(`/products/${id}`, data),
  
  // Delete product
  delete: (id) =>
    api.delete(`/products/${id}`),
};

/**
 * Orders API Calls
 */
export const ordersAPI = {
  // Get all orders
  getAll: () =>
    api.get('/orders'),
  
  // Get order by ID
  getById: (id) =>
    api.get(`/orders/${id}`),
  
  // Create order
  create: (data) =>
    api.post('/orders', data),
  
  // Update order status
  updateStatus: (id, status) =>
    api.patch(`/orders/${id}/status`, { status }),
};

/**
 * Demo API Calls (untuk testing tanpa backend real)
 */
export const demoAPI = {
  // Simulasi login - ganti dengan real API
  loginDemo: async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'demo@kafe.com' && password === 'demo123') {
          const token = 'demo_token_' + Date.now();
          localStorage.setItem('authToken', token);
          resolve({
            data: {
              user: {
                id: 1,
                name: 'Dipa Tranggana',
                email: email,
                role: 'Manager',
                avatar: '/profile-dipa.svg'
              },
              token: token
            }
          });
        } else {
          reject({
            response: {
              data: {
                message: 'Email atau password salah'
              }
            }
          });
        }
      }, 1000);
    });
  },
  
  // Simulasi get stats
  getStatsDemo: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            stats: [
              { id: 1, title: 'Total Penjualan', value: 'Rp 1.240.000', change: '+8.2%', icon: '💰' },
              { id: 2, title: 'Pesanan Selesai', value: '158', change: '+32 terjual', icon: '✅' },
              { id: 3, title: 'Minuman Terlaris', value: 'Iced Latte', change: 'Tren hari ini', icon: '☕' },
              { id: 4, title: 'Staf Aktif', value: '5', change: 'Shift saat ini', icon: '👥' }
            ]
          }
        });
      }, 500);
    });
  }
};

export default api;

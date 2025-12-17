// src/utils/api.js
import axios from 'axios';

const REACT_APP_API_BASE_URL = 'https://qless-backend-2.onrender.com';

const api = axios.create({
  baseURL: REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
// export const authAPI = {
//   register: (data) => api.post('/auth/register', data),
//   login: (data) => api.post('/auth/login', data),
//   getProfile: () => api.get('/auth/profile'),
// };

export const authAPI = {
  register: (data) => api.post('/api/auth/register', data),
  login: (data) => api.post('/api/auth/login', data),
  getProfile: () => api.get('/api/auth/profile'),
};



// // Booking APIs
// export const bookingAPI = {
//   getAvailableSlots: (date) => api.get(`/bookings/available-slots?date=${date}`),
//   createBooking: (data) => api.post('/bookings', data),
//   getMyBookings: () => api.get('/bookings/my-bookings'),
//   cancelBooking: (id) => api.put(`/bookings/${id}/cancel`),
// };

export const bookingAPI = {
  getAvailableSlots: (date) =>
    api.get(`/api/bookings/available-slots?date=${date}`),
  createBooking: (data) =>
    api.post('/api/bookings', data),
  getMyBookings: () =>
    api.get('/api/bookings/my-bookings'),
  cancelBooking: (id) =>
    api.put(`/api/bookings/${id}/cancel`),
};


// Admin APIs
// export const adminAPI = {
//   login: (data) => api.post('/admin/login', data),
//   getAllBookings: (date) => api.get(`/admin/bookings?date=${date}`),
//   getCurrentToken: (date) => api.get(`/admin/current-token?date=${date}`),
//   updateCurrentToken: (data) => api.put('/admin/current-token', data),
//   updateBookingStatus: (id, status) => api.put(`/admin/bookings/${id}/status`, { status }),
//   getDashboardStats: () => api.get('/admin/stats'),
// };


export const adminAPI = {
  login: (data) =>
    api.post('/api/admin/login', data),
  getAllBookings: (date) =>
    api.get(`/api/admin/bookings?date=${date}`),
  getCurrentToken: (date) =>
    api.get(`/api/admin/current-token?date=${date}`),
  updateCurrentToken: (data) =>
    api.put('/api/admin/current-token', data),
  updateBookingStatus: (id, status) =>
    api.put(`/api/admin/bookings/${id}/status`, { status }),
  getDashboardStats: () =>
    api.get('/api/admin/stats'),
};

export default api;

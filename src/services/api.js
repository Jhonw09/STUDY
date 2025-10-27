import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para tratar respostas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  login: (credentials) => api.post('/api/auth/login', credentials),
  register: (userData) => api.post('/api/clientes', userData),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return Promise.resolve();
  },
  deleteAccount: (id) => api.delete(`/api/clientes/${id}`),
}

export const bookingAPI = {
  create: (bookingData) => api.post('/api/agendamentos', bookingData),
  getAll: () => api.get('/api/agendamentos'),
  getById: (id) => api.get(`/api/agendamentos/${id}`),
  update: (id, data) => api.put(`/api/agendamentos/${id}`, data),
  delete: (id) => api.delete(`/api/agendamentos/${id}`),
}

export const clienteAPI = {
  getAll: () => api.get('/api/clientes'),
  getById: (id) => api.get(`/api/clientes/${id}`),
  update: (id, data) => api.put(`/api/clientes/${id}`, data),
  delete: (id) => api.delete(`/api/clientes/${id}`),
}

export default api
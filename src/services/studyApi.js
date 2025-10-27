import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const clienteService = {
  getAll: () => api.get('/api/clientes'),
  getById: (id) => api.get(`/api/clientes/${id}`),
  create: (cliente) => api.post('/api/clientes', cliente),
  update: (id, cliente) => api.put(`/api/clientes/${id}`, cliente),
  delete: (id) => api.delete(`/api/clientes/${id}`)
};

export const agendamentoService = {
  getAll: () => api.get('/api/agendamentos'),
  getById: (id) => api.get(`/api/agendamentos/${id}`),
  getByStatus: (status) => api.get(`/api/agendamentos/status/${status}`),
  create: (agendamento) => api.post('/api/agendamentos', agendamento),
  update: (id, agendamento) => api.put(`/api/agendamentos/${id}`, agendamento),
  delete: (id) => api.delete(`/api/agendamentos/${id}`)
};

export const authService = {
  login: (credentials) => api.post('/api/auth/login', credentials)
};

export const testConnection = () => api.get('/health');

export default api;

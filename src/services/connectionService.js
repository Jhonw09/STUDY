import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para logs de requisições
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Erro na requisição:', error);
    return Promise.reject(error);
  }
);

// Interceptor para logs de respostas
api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`);
    return response;
  },
  (error) => {
    console.error(`❌ ${error.config?.method?.toUpperCase()} ${error.config?.url} - ${error.response?.status || 'Network Error'}`);
    return Promise.reject(error);
  }
);

export const connectionService = {
  // Testar conexão básica
  testHealth: () => api.get('/health'),
  
  // Testar conexão com banco
  testDatabase: () => api.get('/api/clientes'),
  
  // Verificar status completo
  checkStatus: async () => {
    try {
      const health = await api.get('/health');
      const db = await api.get('/api/clientes');
      return {
        backend: true,
        database: true,
        message: 'Todas as conexões OK!'
      };
    } catch (error) {
      return {
        backend: false,
        database: false,
        message: error.message
      };
    }
  }
};

export default api;
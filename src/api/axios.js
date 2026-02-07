import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
  response => response,
  error => {
    const normalizedError = {
      status: error.response?.status,
      message:
        error.response?.data?.message ||
        "Erro ao comunicar com o servidor",
      raw: error
    };

    return Promise.reject(normalizedError);
  }
);

export default api;
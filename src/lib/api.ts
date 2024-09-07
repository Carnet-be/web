import axios from 'axios';
import useAuthStore from '../state/auth';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL ?? 'http://localhost:4000'}/api/v1`,
  timeout: 10000,
  headers: {
    'x-secret-key': import.meta.env.VITE_API_KEY,
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token && token?.token) {
    config.headers.Authorization = `Bearer ${token?.token}`;
  }
  return config;
});
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        // useAuthStore.setState({ token: null });
        // toast.error('Unauthorized');
        console.error('Session expired');
      } else if (status === 403) {
        console.error('You are not allowed to access this resource');
      } else {
        console.error(error.response.data);
      }
    }
    return Promise.reject(error);
  },
);

export default api;

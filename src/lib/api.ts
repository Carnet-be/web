import axios from "axios";
import { toast } from "sonner";
import useAuthStore from "../state/auth";

const api = axios.create({
  baseURL: `${
    import.meta.env.VITE_API_URL ??
    import.meta.env.API_URL ??
    "http://localhost:4000"
  }/api/v1`,
  timeout: 10000,
  headers: {
    "x-secret-key": "mega-super-ultra-secret",
    "Content-Type": "application/json",
  },
});

console.log(import.meta.env.VITE_API_KEY);
console.log(import.meta.env.API_KEY);

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        ///  useAuthStore.setState({ token: null });
        toast.error("Unauthorized");
        //  toast.error("You have been logged out");
      } else if (status === 403) {
        toast.error("You are not allowed to access this resource");
      } else {
        console.error(error.response.data);
      }
    }
    return Promise.reject(error);
  }
);

export default api;

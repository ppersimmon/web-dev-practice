import axios, {
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem("token");

      if (window.location.pathname !== "/sign-in") {
        window.location.href = "/sign-in";
      }
    }

    return Promise.reject(error);
  },
);

export default api;

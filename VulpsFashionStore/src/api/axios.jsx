// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://vulps-fashion-store.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

// 🔥 Auto Refresh Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loop
    if (originalRequest.url.includes("/api/auth/refresh")) {
      return Promise.reject(error);
    }

    // Only refresh on 401 (NOT 403)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.post("/api/auth/refresh");
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = "/signin";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
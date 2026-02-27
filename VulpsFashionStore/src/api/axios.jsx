// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://vulps-fashion-store.onrender.com",
  withCredentials: true // 🔥 Required for HttpOnly cookies
});

// 🔥 Auto Refresh Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If access token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.post("/api/auth/refresh");
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("user");
        localStorage.removeItem("userId");
        window.location.href = "/signin";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
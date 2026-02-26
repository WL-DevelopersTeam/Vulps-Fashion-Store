import axios from "axios";

const api = axios.create({
  baseURL: "https://vulps-fashion-store.onrender.com",
  withCredentials: true   // 🔥 Required for HttpOnly cookies
});

export default api;
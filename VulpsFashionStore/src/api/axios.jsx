import axios from "axios";

const api = axios.create({
  baseURL: "https://vulps-fashion-store.onrender.com",
  withCredentials: true   // 🔥 THIS is the new important thing
});

export default api;
import axios from "axios";

const BACKEND_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:4001";

const api = axios.create({
  baseURL: BACKEND_BASE,
  timeout: 10000,
});

export default api;

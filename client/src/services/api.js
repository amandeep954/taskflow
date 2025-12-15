import axios from "axios";

const api = axios.create({
  baseURL: "https://taskflow-api-uh3i.onrender.com/api",
  withCredentials: true,
});

export default api;

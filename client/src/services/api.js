import axios from "axios";

const api = axios.create({
  baseURL: "https://taskflow-api-ep1v.onrender.com/api",
  withCredentials: true,
});

export default api;

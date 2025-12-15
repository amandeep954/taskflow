import axios from 'axios';

// Ek central instance banaya
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend ka address
  withCredentials: true, // ⚠️ SABSE ZAROORI: Ye cookies ko aane-jane dega
});

export default api;

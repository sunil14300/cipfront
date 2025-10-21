import axios from 'axios'

const api = axios.create({
  // FIX: Switched from 'import.meta.env.VITE_API_URL' (Vite) to 
  // 'process.env.REACT_APP_API_URL' (Create React App standard) 
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  withCredentials: true
})

export default api
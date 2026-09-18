import axios from 'axios';

// withCredentials is required so the httpOnly auth cookie set by the
// backend actually gets sent with every request.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

export default api;

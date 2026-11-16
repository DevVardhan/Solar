import axios from 'axios';

// withCredentials is required so the httpOnly auth cookie set by the
// backend actually gets sent with every request.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

export function getErrorMessage(err: unknown, fallback = 'An error occurred'): string {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message || fallback;
  }
  if (err instanceof Error) {
    return err.message;
  }
  return fallback;
}

export default api;

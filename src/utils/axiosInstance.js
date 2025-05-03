import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// ✅ Attach token to each request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Intercept responses and auto-logout on 401
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      alert("Session expired. You have been logged out.");
      localStorage.removeItem('access_token');
      window.location.href = '/'; // Redirect to login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
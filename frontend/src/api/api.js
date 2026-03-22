import axios from 'axios';

const apiHost = (import.meta.env.VITE_API_URL || '').trim().replace(/\/$/, '');
const apiBaseURL = apiHost ? `${apiHost}/api` : '/api';

const api = axios.create({
    baseURL: apiBaseURL,
    headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            localStorage.removeItem('adminToken');
            window.location.href = '/admin/login';
        }
        return Promise.reject(err);
    }
);

export default api;

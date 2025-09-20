import axios from 'axios';
// In client/src/calls/index.js
export const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' 
        ? "http://localhost:8082/api" 
        : "/api",
    headers: {
        "Content-Type": "application/json"
    }
});

// Add request interceptor to dynamically add token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
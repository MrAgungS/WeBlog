import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
    headers:{
        "Content-Type" : "application/json"
    }
});
api.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        console.log("API Request:", {
            url: (config.baseURL || '') + (config.url || ''),
            method: config.method,
            data: config.data,
            hasToken: !!config.headers.Authorization,
        });
        return config;
    },
    (error) => {
        console.error("Request setup error:", error);
        return Promise.reject(error);
    }
);
api.interceptors.response.use(
    (response) => {
        console.log("API Response:", {
            status: response.status,
            statusText: response.statusText,
            data: response.data,
        });
        return response;
    },
    (error) => {
        if (error.response) {
            console.error("API Error Response:", {
                status: error.response.status,
                statusText: error.response.statusText,
                data: error.response.data,
                headers: error.response.headers,
                requestConfig: {
                    method: error.config?.method,
                    url: error.config?.url,
                    data: error.config?.data,
                }
            });
            // Handle 401 - token expired or invalid
            if (error.response.status === 401) {
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    // Optionally redirect to login
                    // window.location.href = '/login';
                }
            }
        } else if (error.request) {
            console.error("No response from server:", {
                request: error.request,
                message: error.message,
            });
        } else {
            console.error("Request setup error:", error.message);
        }
        return Promise.reject(error);
    }
);

export default api
import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "https://dev.anantpragya.com/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // Set to true if you need to send cookies
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle CORS and network errors
    if (!error.response) {
      return Promise.reject({
        response: {
          data: {
            status: false,
            message:
              "Network error. Please check your connection and ensure the server is running.",
          },
        },
      });
    }

    // Handle 401 errors by redirecting to login
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_data");
      window.location.href = "/login";
    }

    // Handle other errors
    return Promise.reject(error);
  }
);

export default api;

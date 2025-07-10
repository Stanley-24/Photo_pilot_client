import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/v1";

const getToken = () => localStorage.getItem("token") || sessionStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Attach token dynamically
axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🚫 401 Interceptor: Only redirect if NOT auth/login or signup
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error?.config?.url || "";

    const isLoginOrSignup =
      url.includes("/auth/login") || url.includes("/auth/signup");

    if (error.response?.status === 401 && !isLoginOrSignup) {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");

      sessionStorage.setItem("auth_error", "Your session expired. Please log in again.");
      window.location.href = "/auth";
    }

    return Promise.reject(error); // let AuthPage handle it
  }
);

export default axiosInstance;

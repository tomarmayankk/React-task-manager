import axios from "axios";
import { BASE_URL } from "./constants";

const axiosInstance = axios.create({
  baseURL: BASE_URL, // Correct property name
  timeout: 10000, // Correct property name
  headers: {
    "Content-Type": "application/json", // Consistent casing for the header key
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token"); // Retrieve token from localStorage
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // Add Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle request errors
  }
);

export default axiosInstance;

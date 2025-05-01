import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import Cookies from "js-cookie";

// API javob turlari uchun interfeyslar
interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

interface ApiError {
  status: number;
  message: string;
  details?: any;
}

// Axios instansiyasini yaratamiz
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Request Interceptor: Har bir so'rov oldidan token qo'shish
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Javob va xatolarni boshqarish
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError<ApiError>) => {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 401) {
        console.error("Unauthorized: Invalid or expired token");
        Cookies.remove("authToken");
        if (typeof window !== "undefined") {
          window.location.href = "/sign-in"; // login o‘rniga sign-in sahifasiga yo‘naltirish
        }
      }

      const errorMessage: ApiError = {
        status,
        message: data?.message || "Something went wrong",
        details: data?.details,
      };
      return Promise.reject(errorMessage);
    } else if (error.request) {
      const networkError: ApiError = {
        status: 0,
        message: "Network Error: Could not connect to the server",
      };
      return Promise.reject(networkError);
    } else {
      const genericError: ApiError = {
        status: 500,
        message: error.message || "An unexpected error occurred",
      };
      return Promise.reject(genericError);
    }
  }
);

export default api;

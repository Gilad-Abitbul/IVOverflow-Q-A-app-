import axios from "axios";
import store from "../store";
import { clearUser } from "../store/auth.slice";

const baseURL = (() => {
  const url = import.meta.env.VITE_BASE_URL || "http://localhost:8080/api";
  if (!url) {
    throw new Error("env error: VITE_BASE_URL is not defined");
  }
  return url;
})();

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000, // 10 sec
});

axiosInstance.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem("token");
      store.dispatch(clearUser());
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

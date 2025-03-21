import { getErrorMessage } from "@/lib/getErrorMessage";
import type { ApiErrorResponse } from "@/types";
import axios, { type AxiosError, type AxiosRequestConfig } from "axios";
import { toast } from "sonner";
import { store } from "@/redux/store";
import { authApiSlice } from "@/redux/store/auth/authApiSlice";
import { setAccessError } from "@/redux/store/auth/authSlice";
import { router } from "@/main";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let isRefreshing = false;

let failedQueue: {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
  config: AxiosRequestConfig;
}[] = [];

const processQueue = (error: unknown = null) => {
  failedQueue.forEach((request) => {
    if (error) {
      request.reject(error);
    } else {
      const retryRequest = axios.request({
        ...request.config,
        baseURL: import.meta.env.VITE_API_URL,
        withCredentials: true,
      });
      request.resolve(retryRequest);
    }
  });

  failedQueue = [];
};

const handleLogout = () => {
  store.dispatch(authApiSlice.endpoints.logout.initiate());
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    if (!error.config) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    if (error.code === "ERR_CONNECTION_REFUSED") {
      toast.error(
        "Nie udało się połączyć z serwerem. Sprawdź swoje połączenie internetowe lub spróbuj ponownie później."
      );
      return Promise.reject(error);
    }

    if (error.response?.data.title === "UserNotFound") {
      handleLogout();
      return Promise.reject(error);
    }

    if (error.response?.data.title === "NoAccessToThisSalon") {
      store.dispatch(setAccessError());
      router.navigate("/no-access");
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      const isRefreshRequest = originalRequest.url === "/api/auth/refreshtoken";
      if (isRefreshRequest) {
        handleLogout();
        return Promise.reject(error);
      }

      // @ts-expect-error - we're adding our own property to the config
      if (originalRequest._retry) {
        handleLogout();
        return Promise.reject(error);
      }

      // @ts-expect-error - we're adding our own property to the config
      originalRequest._retry = true;

      if (isRefreshing) {
        try {
          const retryResponse = await new Promise<unknown>(
            (resolve, reject) => {
              failedQueue.push({
                resolve,
                reject,
                config: originalRequest,
              });
            }
          );
          return retryResponse;
        } catch (queueError) {
          return Promise.reject(queueError);
        }
      }

      isRefreshing = true;

      try {
        await api.get("/api/auth/refreshtoken");

        processQueue();

        return axios({
          ...originalRequest,
          baseURL: import.meta.env.VITE_API_URL,
          withCredentials: true,
        });
      } catch (refreshError) {
        processQueue(refreshError);

        handleLogout();

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    } else if (error.response) {
      toast.error(getErrorMessage(error.response.data?.title));
    } else {
      toast.error("Wystąpił problem z połączeniem. Spróbuj ponownie.");
    }

    return Promise.reject(error);
  }
);

export default api;

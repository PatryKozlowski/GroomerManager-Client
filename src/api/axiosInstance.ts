import { getErrorMessage } from "@/lib/getErrorMessage";
import type { ApiErrorResponse } from "@/types";
import axios, { type AxiosError } from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (error) {
      toast.error(getErrorMessage(error.response!.data!.title));
    }
    return Promise.reject(error);
  }
);

export default api;

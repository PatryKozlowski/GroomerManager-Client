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
    if (error.code === "ERR_CONNECTION_REFUSED") {
      toast.error(
        "Nie udało się połączyć z serwerem. Sprawdź swoje połączenie internetowe lub spróbuj ponownie później."
      );
    } else if (error.response) {
      toast.error(getErrorMessage(error.response!.data!.title));
    } else {
      toast.error("Wystąpił problem z połączeniem. Spróbuj ponownie.");
    }
    return Promise.reject(error);
  }
);

export default api;

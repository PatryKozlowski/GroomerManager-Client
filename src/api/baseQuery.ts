import type { ApiErrorResponse } from "@/types";
import type { AxiosError, AxiosRequestConfig } from "axios";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import axiosInstance from "./axiosInstance";

export interface AxiosBaseQueryArgs {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
}

export interface StandardizedApiError {
  status?: number;
  data?: unknown;
  code?: string;
  message?: string;
  details?: Record<string, unknown>;
}

export const axiosBaseQuery =
  (): BaseQueryFn<AxiosBaseQueryArgs, unknown, StandardizedApiError> =>
  async ({ url, method = "GET", data, params, headers }) => {
    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        headers,
      });

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError<ApiErrorResponse>;
      const responseData = err.response?.data;

      const standardError: StandardizedApiError = {
        status: err.response?.status,
        data: responseData,
        code: responseData?.code || "UNKNOWN_ERROR",
        message: responseData?.message || responseData?.title || err.message,
        details: responseData?.details || {},
      };

      return { error: standardError };
    }
  };

export default axiosBaseQuery;

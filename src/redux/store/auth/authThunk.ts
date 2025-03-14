import api from "@/api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LoginResponse } from "@/types";
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (values: { email: string; password: string }) => {
    const response = await api.post<LoginResponse>("/api/auth/login", {
      email: values.email,
      password: values.password,
    });
    return response.data;
  }
);

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  const response = await api.get("/api/auth/logout");
  return response.data;
});

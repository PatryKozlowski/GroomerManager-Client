import api from "@/api/axiosInstance";
import type { User } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserThunk = createAsyncThunk("user/fetchUser", async () => {
  const response = await api.get<User>("/api/user/getuserinfo");
  return response.data;
});

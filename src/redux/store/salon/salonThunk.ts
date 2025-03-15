import api from "@/api/axiosInstance";
import { Salon } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSalons = createAsyncThunk("salon/fetchSalons", async () => {
  const response = await api.get<Salon[]>("/api/salon/getsalons");
  return response.data;
});

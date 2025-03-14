import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, logoutThunk } from "./authThunk";

const LOCAL_STORAGE_KEY = "auth.groomer-manager";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const getInitialAuthState = (): boolean => {
  const storedAuth = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedAuth === "true";
};

const initialState: AuthState = {
  isAuthenticated: getInitialAuthState(),
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginThunk.fulfilled, (state) => {
      state.isAuthenticated = true;
      localStorage.setItem(LOCAL_STORAGE_KEY, "true");
      state.isLoading = false;
    });
    builder.addCase(loginThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    });
  },
});

export default authSlice.reducer;

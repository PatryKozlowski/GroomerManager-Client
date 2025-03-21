import { createSlice } from "@reduxjs/toolkit";

export const LOCAL_STORAGE_AUTH_KEY = "auth.groomer-manager";

interface AuthState {
  isAuthenticated: boolean;
  isAccessError: boolean;
}

const getInitialAuthState = (): boolean => {
  const storedAuth = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
  return storedAuth === "true";
};

const initialState: AuthState = {
  isAuthenticated: getInitialAuthState(),
  isAccessError: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthStore: (state) => {
      state.isAuthenticated = false;
      state.isAccessError = false;
      localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
    },
    setAuthenticated: (state) => {
      state.isAuthenticated = true;
      localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, "true");
    },
    setAccessError: (state) => {
      state.isAccessError = true;
    },
    clearAccessError: (state) => {
      state.isAccessError = false;
    },
  },
});

export const {
  clearAuthStore,
  setAuthenticated,
  setAccessError,
  clearAccessError,
} = authSlice.actions;
export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const LOCAL_STORAGE_AUTH_KEY = "auth.groomer-manager";

interface AuthState {
  isAuthenticated: boolean;
}

const getInitialAuthState = (): boolean => {
  const storedAuth = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
  return storedAuth === "true";
};

const initialState: AuthState = {
  isAuthenticated: getInitialAuthState(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthStore: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
    },
    setAuthenticated: (state) => {
      state.isAuthenticated = true;
      localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, "true");
    },
  },
});

export const { clearAuthStore, setAuthenticated } = authSlice.actions;
export default authSlice.reducer;

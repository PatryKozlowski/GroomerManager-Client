import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isCollapsed: false,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setIsCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isCollapsed = action.payload;
    },
    resetSidebar: (state) => {
      state.isCollapsed = false;
    },
  },
});

export const { setIsCollapsed, resetSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;

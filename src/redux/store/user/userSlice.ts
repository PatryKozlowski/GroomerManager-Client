import type { User } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchUserThunk } from "@/redux/store/user/userThunk";
interface UserState {
  user: User | null;
  isLoading: boolean;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    clearUserStore: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchUserThunk.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(fetchUserThunk.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { setUser, clearUserStore } = userSlice.actions;
export default userSlice.reducer;

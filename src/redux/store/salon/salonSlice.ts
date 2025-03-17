import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Salon } from "@/types";

interface SalonState {
  currentSalon: Salon | null;
}

const initialState: SalonState = {
  currentSalon: null,
};

const salonSlice = createSlice({
  name: "salon",
  initialState,
  reducers: {
    setCurrentSalon: (state, action: PayloadAction<Salon>) => {
      state.currentSalon = action.payload;
    },
  },
});

export const { setCurrentSalon } = salonSlice.actions;
export default salonSlice.reducer;

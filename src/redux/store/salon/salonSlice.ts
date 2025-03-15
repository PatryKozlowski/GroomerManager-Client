import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Salon } from "@/types";
import { fetchSalons } from "./salonThunk";
interface SalonState {
  salons: Salon[];
  currentSalon: Salon | null;
  isLoading: boolean;
}

const initialState: SalonState = {
  salons: [],
  currentSalon: null,
  isLoading: false,
};

const salonSlice = createSlice({
  name: "salon",
  initialState,
  reducers: {
    setCurrentSalon: (state, action: PayloadAction<Salon>) => {
      state.currentSalon = action.payload;
    },
    clearSalonStore: (state) => {
      state.currentSalon = null;
      state.salons = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSalons.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchSalons.fulfilled,
      (state, action: PayloadAction<Salon[]>) => {
        state.salons = action.payload;
        state.currentSalon = action.payload[0];
        state.isLoading = false;
      }
    );
    builder.addCase(fetchSalons.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { setCurrentSalon, clearSalonStore } = salonSlice.actions;
export default salonSlice.reducer;

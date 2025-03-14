import { RegisterData } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface RegisterInitialState {
  currentStep: number;
  totalSteps: number;
  data: RegisterData;
}

const initialState: RegisterInitialState = {
  currentStep: 0,
  totalSteps: 4,
  data: {
    account: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    personal: {
      firstName: "",
      lastName: "",
      phone: "",
    },
    salon: {
      name: "",
    },
  },
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.currentStep = Math.min(state.currentStep + 1, state.totalSteps - 1);
    },
    prevStep: (state) => {
      state.currentStep = Math.max(state.currentStep - 1, 0);
    },
    updateData: <K extends keyof RegisterData>(
      state: RegisterInitialState,
      action: PayloadAction<{ stepKey: K; values: Partial<RegisterData[K]> }>
    ) => {
      const { stepKey, values } = action.payload;
      state.data[stepKey] = { ...state.data[stepKey], ...values };
    },
  },
});

export const { nextStep, prevStep, updateData } = registerSlice.actions;
export default registerSlice.reducer;

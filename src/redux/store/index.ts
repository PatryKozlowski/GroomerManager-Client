import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "@/redux/store/theme/themeSlice";
import sidebarReducer from "@/redux/store/sidebar/sidebarSlice";
import registerStepperReducer from "@/redux/store/registerStepper/registerStepperSlice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    theme: themeReducer,
    registerStepper: registerStepperReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

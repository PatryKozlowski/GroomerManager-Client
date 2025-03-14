import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "@/redux/store/theme/themeSlice";
import sidebarReducer from "@/redux/store/sidebar/sidebarSlice";
import registerStepperReducer from "@/redux/store/registerStepper/registerStepperSlice";
import userReducer from "@/redux/store/user/userSlice";
import authReducer from "@/redux/store/auth/authSlice";
export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    theme: themeReducer,
    registerStepper: registerStepperReducer,
    user: userReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

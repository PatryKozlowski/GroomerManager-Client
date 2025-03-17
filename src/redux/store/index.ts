import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "@/redux/store/theme/themeSlice";
import sidebarReducer from "@/redux/store/sidebar/sidebarSlice";
import registerStepperReducer from "@/redux/store/registerStepper/registerStepperSlice";
import authReducer from "@/redux/store/auth/authSlice";
import salonReducer from "@/redux/store/salon/salonSlice";
import { authApiSlice } from "./auth/authApiSlice";
import { salonApiSlice } from "./salon/salonApiSlice";
import { userApiSlice } from "./user/userApiSlice";
export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    theme: themeReducer,
    registerStepper: registerStepperReducer,
    auth: authReducer,
    salon: salonReducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [salonApiSlice.reducerPath]: salonApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApiSlice.middleware,
      salonApiSlice.middleware,
      userApiSlice.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

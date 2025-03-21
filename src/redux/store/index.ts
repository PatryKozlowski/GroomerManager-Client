import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "@/redux/store/theme/themeSlice";
import sidebarReducer from "@/redux/store/sidebar/sidebarSlice";
import registerStepperReducer from "@/redux/store/registerStepper/registerStepperSlice";
import authReducer from "@/redux/store/auth/authSlice";
import salonReducer from "@/redux/store/salon/salonSlice";
import { authApiSlice } from "@/redux/store/auth/authApiSlice";
import { salonApiSlice } from "@/redux/store/salon/salonApiSlice";
import { userApiSlice } from "@/redux/store/user/userApiSlice";
import { clientsApiSlice } from "@/redux/store/clients/clientsApiSlice";
import { petsApiSlice } from "./pets/petsApiSlice";

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
    [clientsApiSlice.reducerPath]: clientsApiSlice.reducer,
    [petsApiSlice.reducerPath]: petsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApiSlice.middleware,
      salonApiSlice.middleware,
      userApiSlice.middleware,
      clientsApiSlice.middleware,
      petsApiSlice.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import type { LoginResponse, RegisterData } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/api/baseQuery";
import { clearAuthStore, setAuthenticated } from "@/redux/store/auth/authSlice";
import { salonApiSlice } from "@/redux/store/salon/salonApiSlice";
import { userApiSlice } from "@/redux/store/user/userApiSlice";
import { clientsApiSlice } from "@/redux/store/clients/clientsApiSlice";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { email: string; password: string }>(
      {
        query: (credentials) => ({
          url: "/api/auth/login",
          method: "POST",
          data: credentials,
        }),
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          await queryFulfilled;
          dispatch(setAuthenticated());
        },
      }
    ),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/api/auth/logout",
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch }) {
        dispatch(authApiSlice.util.resetApiState());
        dispatch(salonApiSlice.util.resetApiState());
        dispatch(userApiSlice.util.resetApiState());
        dispatch(clientsApiSlice.util.resetApiState());

        dispatch(clearAuthStore());
      },
    }),
    createAccount: builder.mutation<
      { message: string },
      { data: RegisterData }
    >({
      query: ({ data }) => ({
        url: "/api/auth/create",
        method: "POST",
        data,
      }),
    }),
    confirmEmail: builder.mutation<{ message: string }, { token: string }>({
      query: ({ token }) => ({
        url: `/api/auth/verifyemail?token=${token}`,
        method: "GET",
      }),
    }),
    sendConfirmEmailToken: builder.mutation<
      { message: string },
      { email: string }
    >({
      query: ({ email }) => ({
        url: `/api/auth/newverifyemail`,
        method: "POST",
        data: { email },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useConfirmEmailMutation,
  useSendConfirmEmailTokenMutation,
  useCreateAccountMutation,
} = authApiSlice;

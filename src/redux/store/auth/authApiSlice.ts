import type { LoginResponse, RegisterData } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/api/baseQuery";
import { clearAuthStore, setAuthenticated } from "@/redux/store/auth/authSlice";

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

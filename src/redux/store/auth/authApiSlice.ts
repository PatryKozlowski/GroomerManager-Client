import type { LoginResponse } from "@/types";
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
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApiSlice;

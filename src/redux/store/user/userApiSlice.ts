import { createApi } from "@reduxjs/toolkit/query/react";
import type { User } from "@/types";
import { axiosBaseQuery } from "@/api/baseQuery";

export const userApiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      query: () => ({
        url: "/api/user/getuserinfo",
        method: "GET",
        providesTags: ["user"],
        keepUnusedDataFor: 60 * 60 * 24,
      }),
    }),
  }),
});

export const { useGetUserQuery } = userApiSlice;

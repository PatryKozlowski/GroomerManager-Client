import { createApi } from "@reduxjs/toolkit/query/react";
import type { Salon } from "@/types";
import { setCurrentSalon } from "@/redux/store/salon/salonSlice";
import axiosBaseQuery from "@/api/baseQuery";

export const salonApiSlice = createApi({
  reducerPath: "salonApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getSalons: builder.query<Salon[], void>({
      query: () => ({
        url: "/api/salon/getsalons",
        method: "GET",
        providesTags: ["salons"],
        keepUnusedDataFor: 60 * 60 * 24,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        if (data && data.length > 0) {
          dispatch(setCurrentSalon(data[0]));
        }
      },
    }),
  }),
});

export const { useGetSalonsQuery } = salonApiSlice;

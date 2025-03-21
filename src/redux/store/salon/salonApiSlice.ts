import { createApi } from "@reduxjs/toolkit/query/react";
import type { Salon } from "@/types";
import { setCurrentSalon } from "@/redux/store/salon/salonSlice";
import { axiosBaseQuery } from "@/api/baseQuery";

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
          dispatch(
            setCurrentSalon(data.find((salon) => salon.isDefault) || data[0])
          );
        }
      },
    }),
    createSalon: builder.mutation<Salon, { name: string }>({
      query: (data) => ({
        url: "/api/salon/create",
        method: "POST",
        data: data,
        invalidatesTags: ["salons"],
      }),
      async onQueryStarted(newSalonData, { dispatch, queryFulfilled }) {
        const tempId = `temp-${Date.now()}`;

        const optimisticSalon: Partial<Salon> = {
          name: newSalonData.name,
          isDefault: false,
          id: tempId,
        };

        const patchResult = dispatch(
          salonApiSlice.util.updateQueryData(
            "getSalons",
            undefined,
            (draft) => {
              draft.push(optimisticSalon as Salon);
            }
          )
        );

        try {
          const { data: createdSalon } = await queryFulfilled;

          dispatch(
            salonApiSlice.util.updateQueryData(
              "getSalons",
              undefined,
              (draft) => {
                const optimisticSalonIndex = draft.findIndex(
                  (salon) => salon.id === tempId
                );
                if (optimisticSalonIndex !== -1) {
                  draft[optimisticSalonIndex] = createdSalon;
                }
              }
            )
          );
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useGetSalonsQuery, useCreateSalonMutation } = salonApiSlice;

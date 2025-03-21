import { axiosBaseQuery } from "@/api/baseQuery";
import type { Pet } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

export const petsApiSlice = createApi({
  reducerPath: "petsApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["pets"],
  endpoints: (builder) => ({
    getClientPets: builder.query<Pet[], { salonId: string; clientId: string }>({
      query: ({ salonId, clientId }) => ({
        url: `/api/pets/getclientpets`,
        method: "GET",
        params: { salonId, clientId },
      }),
      providesTags: ["pets"],
      keepUnusedDataFor: 60 * 60 * 24,
    }),
    createPet: builder.mutation<
      Pet,
      Omit<Pet, "id" | "notes" | "createdAt" | "updatedAt">
    >({
      query: (pet) => ({
        url: `/api/pets/create`,
        method: "POST",
        data: pet,
      }),
      invalidatesTags: ["pets"],
    }),
    updatePet: builder.mutation<Pet, Partial<Pet> & { id: string }>({
      query: ({ id, ...pet }) => ({
        url: `/api/pets/update/${id}`,
        method: "PATCH",
        data: pet,
      }),
      invalidatesTags: ["pets"],
    }),
    deletePet: builder.mutation<void, { salonId: string; petId: string }>({
      query: ({ salonId, petId }) => ({
        url: `/api/pets/delete/${petId}`,
        method: "DELETE",
        params: { salonId },
      }),
      invalidatesTags: ["pets"],
    }),
    addPetNote: builder.mutation<
      Pet,
      { salonId: string; petId: string; text: string }
    >({
      query: ({ salonId, petId, text }) => ({
        url: `/api/pets/${petId}/notes`,
        method: "POST",
        data: { text },
        params: { salonId },
      }),
      invalidatesTags: ["pets"],
    }),
  }),
});

export const {
  useGetClientPetsQuery,
  useCreatePetMutation,
  useUpdatePetMutation,
  useDeletePetMutation,
  useAddPetNoteMutation,
} = petsApiSlice;

import { axiosBaseQuery } from "@/api/baseQuery";
import type { Client } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

export interface GetClientsQueryParams {
  salonId: string;
  search?: string;
  page?: number;
  pageSize?: number;
  hasPets?: boolean;
  hasEmail?: boolean;
  lastVisitBefore?: string;
  lastVisitAfter?: string;
}

export const clientsApiSlice = createApi({
  reducerPath: "clientsApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["clients"],
  endpoints: (builder) => ({
    getClients: builder.query<
      { clients: Client[]; totalCount: number },
      GetClientsQueryParams
    >({
      query: ({
        salonId,
        search,
        page,
        pageSize,
        hasPets,
        hasEmail,
        lastVisitBefore,
        lastVisitAfter,
      }) => ({
        url: `/api/client/getclients`,
        method: "GET",
        params: {
          salonId,
          search,
          page,
          pageSize,
          hasPets,
          hasEmail,
          lastVisitBefore,
          lastVisitAfter,
        },
      }),
      providesTags: [{ type: "clients" }],
      keepUnusedDataFor: 60 * 60 * 24,
    }),
    getClient: builder.query<Client, { salonId: string; clientId: string }>({
      query: ({ salonId, clientId }) => ({
        url: `/api/client/getclient`,
        method: "GET",
        params: { salonId, clientId },
        providesTags: ["client"],
        keepUnusedDataFor: 60 * 60 * 24,
      }),
    }),
    createClient: builder.mutation<Client, Omit<Client, "id">>({
      query: (client) => ({
        url: `/api/client/create?salonId=${client.salonId}`,
        method: "POST",
        data: client,
        invalidatesTags: ["clients"],
      }),
      async onQueryStarted(newClientData, { dispatch, queryFulfilled }) {
        const tempId = `temp-${Date.now()}`;

        const optimisticClient: Partial<Client> = {
          id: tempId,
          firstName: newClientData.firstName,
          lastName: newClientData.lastName,
          phone: newClientData.phone,
          email: newClientData.email,
        };

        const patchResult = dispatch(
          clientsApiSlice.util.updateQueryData(
            "getClients",
            { salonId: newClientData.salonId },
            (draft) => {
              draft.clients.push(optimisticClient as Client);
            }
          )
        );

        try {
          const { data: createdClient } = await queryFulfilled;

          dispatch(
            clientsApiSlice.util.updateQueryData(
              "getClients",
              { salonId: newClientData.salonId },
              (draft) => {
                const optimisticClientIndex = draft.clients.findIndex(
                  (client) => client.id === tempId
                );
                if (optimisticClientIndex !== -1) {
                  draft.clients[optimisticClientIndex] = createdClient;
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

export const {
  useGetClientsQuery,
  useCreateClientMutation,
  useGetClientQuery,
} = clientsApiSlice;

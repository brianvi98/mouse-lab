import { api } from "./baseApi";
import type { ApiEnvelope, PagedData } from "../types/common";
import type { CreateSessionRequest, SessionDetailsResponse, SessionSummaryResponse } from "../types/sessions";

const sessionsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSessions: build.query<ApiEnvelope<PagedData<SessionSummaryResponse>>, { page: number; size: number }>({
      query: ({ page, size }) => `sessions?page=${page}&size=${size}`,
      providesTags: ["Session"],
    }),
    getSessionById: build.query<ApiEnvelope<SessionDetailsResponse>, string>({
      query: (id) => `sessions/${id}`,
      providesTags: ["Session"],
    }),
    createSession: build.mutation<ApiEnvelope<SessionSummaryResponse>, CreateSessionRequest>({
      query: (body) => ({
        url: `sessions`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Session"],
    }),
    deleteSessionById: build.mutation<void, string>({
      query: (id) => ({
        url: `sessions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Session"],
    }),
  }),
});

export const { useGetSessionsQuery, useGetSessionByIdQuery, useDeleteSessionByIdMutation } = sessionsApi;

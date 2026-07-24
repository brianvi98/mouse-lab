import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: async (headers) => {
      if (typeof window !== "undefined" && window.Clerk) {
        const token = await window.Clerk?.session?.getToken();

        if (token) headers.set("Authorization", `Bearer ${token}`);

        return headers;
      }
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["Session"],
});

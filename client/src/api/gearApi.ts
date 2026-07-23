import { api } from "./baseApi";
import type { GearResponse } from "../types/gear";

const gearApi = api.injectEndpoints({
  endpoints: (build) => ({
    getGear: build.query<GearResponse, void>({
      query: () => ({ url: "gear" }),
    }),
  }),
});

export const { useGetGearQuery } = gearApi;

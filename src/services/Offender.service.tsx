import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  getSearchLvlFromWeekDays,
  getWeekDaysFromSearchLvl,
} from "../helpers/getSearchLvlFromWeekDays";
import type { Offender_I } from "../types/OffenderType";

export const offenderApi = createApi({
  reducerPath: "offender",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://68265c8f397e48c91315dac2.mockapi.io/api/",
  }),
  tagTypes: ["Offender"],
  endpoints: (build) => ({
    getAllOffender: build.query<
      Offender_I[],
      {
        limit: number;
        page: number;
        isBusted?: boolean;
        name?: string;
        searchLvl?: string;
      }
    >({
      query: ({ limit = 12, page = 1, isBusted, name, searchLvl }) => ({
        url: "wanted",
        params: {
          limit,
          page,
          isBusted,
          name,
          searchLvl: getWeekDaysFromSearchLvl(Number(searchLvl)),
        },
      }),
      providesTags: ["Offender"],
      transformResponse: (response: Offender_I[]) => {
        return response.map((offender) => ({
          ...offender,
          searchLvl: getSearchLvlFromWeekDays(String(offender.searchLvl)),
        }));
      },
    }),
    updateOffender: build.mutation<Offender_I, Offender_I>({
      query: (offender) => ({
        url: `wanted/${offender.id}`,
        method: "PUT",
        body: offender,
      }),
      invalidatesTags: ["Offender"],
    }),
  }),
});

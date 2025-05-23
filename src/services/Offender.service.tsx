import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  getSearchLvlFromWeekDays,
  getWeekDaysFromSearchLvl,
} from "../helpers/getSearchLvlFromWeekDays";
import type { Offender_I } from "../types/OffenderType";

// Т.к используется бесплатная версия mockup.io было принято решение указать дни недели и переформатировать их в уровни розыска
type OffenderServer = Omit<Offender_I, "searchLvl"> & {
  searchLvl: string;
};

export const getAllOffenderService = async (
  page = 1,
  limit = 12
): Promise<Offender_I[]> => {
  const url = new URL("https://68265c8f397e48c91315dac2.mockapi.io/api/wanted");
  url.searchParams.append("page", page.toString());
  url.searchParams.append("limit", limit.toString());

  try {
    const offenders = await fetch(url, {
      method: "GET",
      headers: { "content-type": "application/json" },
    }).then((offenders) => offenders.json());

    return offenders.map((offender: OffenderServer) => ({
      ...offender,
      searchLvl: getSearchLvlFromWeekDays(offender.searchLvl),
    }));
  } catch {
    return [];
  }
};

export const offenderApi = createApi({
  reducerPath: "offender",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://68265c8f397e48c91315dac2.mockapi.io/api/",
  }),
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
      transformResponse: (response: Offender_I[]) => {
        return response.map((offender) => ({
          ...offender,
          searchLvl: getSearchLvlFromWeekDays(String(offender.searchLvl)),
        }));
      },
    }),
  }),
});

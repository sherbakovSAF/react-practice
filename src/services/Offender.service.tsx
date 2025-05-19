import { getSearchLvlFromWeekDays } from "../helpers/getSearchLvlFromWeekDays";
import type { Offender_I } from "../types/OffenderType";

// Т.к используется бесплатная версия mockup.io было принято решение указать дни недели и переформатировать их в уровни розыска
type OffenderServer = Omit<Offender_I, "searchLvl"> & {
  searchLvl: string;
};

export const getAllOffenderService = async (page = 1, limit = 12) => {
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

import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks/redux";
import { offenderApi } from "./services/Offender.service";
import type { Offender_I } from "./types/OffenderType";
import { OffenderSlice } from "./store/slices/offenderSlice";

export const useOffenders = () => {
  const dispatch = useAppDispatch();
  const { offenders, status, currentPage, hasMore, search, lvl } =
    useAppSelector((state) => state.offenderReducer);
  const { addOffenders, setCurrentPage, setHasMore, replaceOffenders } =
    OffenderSlice.actions;
  const [fetchMore, { isLoading, error }] =
    offenderApi.useLazyGetAllOffenderQuery();
  const TIME_DEBOUNCE_MS = 1000;
  const debounce = useRef<number | null>(null);

  const fetchAllOffender = useCallback(async (): Promise<Offender_I[]> => {
    if (!hasMore) return [];

    const newOffenders = await fetchMore({
      page: currentPage,
      limit: 12,
      isBusted: status ? status === "busted" : undefined,
      name: search.length ? search : undefined,
      searchLvl: lvl ?? undefined,
    }).unwrap();

    if (!newOffenders.length) {
      dispatch(setHasMore(false));
      return [];
    }

    if (newOffenders.length) {
      dispatch(setCurrentPage(currentPage + 1));

      return newOffenders;
    } else {
      dispatch(setHasMore(false));
    }

    return [];
  }, [currentPage, status, fetchMore, hasMore, setHasMore, lvl, search]);

  const fetchMoreOffenders = () => {
    fetchAllOffender().then((newOffenders) =>
      dispatch(addOffenders(newOffenders))
    );
  };

  useEffect(() => {
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(() => {
      dispatch(setHasMore(true));
      fetchAllOffender().then((newOffenders) =>
        dispatch(replaceOffenders(newOffenders))
      );
    }, TIME_DEBOUNCE_MS);
    return () => {
      if (debounce.current) clearTimeout(debounce.current);
    };
  }, [status, search, lvl]);

  useEffect(() => {
    if (error) alert(error.data);
  }, [error]);

  return { fetchMoreOffenders, offenders, hasMore, isLoading };
};

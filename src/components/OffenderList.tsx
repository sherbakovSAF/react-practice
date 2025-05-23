import OffenderCard from "../components/OffenderCard";
import Loader from "./Loader";
import styles from "./OffenderList.module.scss";
import { useCallback, useEffect, useRef } from "react";
import { offenderApi } from "../services/Offender.service";
import { useAppDispatch, useAppSelector } from "../store/hooks/redux";
import { OffenderSlice } from "../store/reducers/offenderReducer";
import type { Offender_I } from "../types/OffenderType";

const OffenderList = () => {
  const dispatch = useAppDispatch();
  const { offenders, status, currentPage, hasMore, search, lvl } =
    useAppSelector((state) => state.offenderReducer);
  const { addOffenders, setCurrentPage, setHasMore, replaceOffenders } =
    OffenderSlice.actions;
  const [fetchMore, { isLoading, error }] =
    offenderApi.useLazyGetAllOffenderQuery();
  const observer = useRef<IntersectionObserver | null>(null);

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
      setHasMore(false);
      return [];
    }

    if (newOffenders.length) {
      dispatch(setCurrentPage(currentPage + 1));
      return newOffenders;
    } else {
      setHasMore(false);
    }

    return [];
  }, [currentPage, status, fetchMore, hasMore, setHasMore]);

  const lastOffenderEl = useCallback(
    (node: HTMLLIElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting)
          fetchAllOffender().then((newOffenders) =>
            dispatch(addOffenders(newOffenders))
          );
      });
      if (node) observer.current.observe(node);
    },
    [fetchAllOffender]
  );

  useEffect(() => {
    fetchAllOffender().then((newOffenders) =>
      dispatch(addOffenders(newOffenders))
    );
  }, []);

  const debounce = useRef<number | null>(null);
  useEffect(() => {
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(() => {
      fetchAllOffender().then((newOffenders) =>
        dispatch(replaceOffenders(newOffenders))
      );
    }, 4000);
    return () => {
      if (debounce.current) clearTimeout(debounce.current);
    };
  }, [status, search, lvl]);

  useEffect(() => {
    if (error) alert(error.data);
  }, [error]);
  return (
    <div>
      {offenders && (
        <ul className={styles["list"]}>
          {offenders.map((offender, idx) => {
            const isLast = idx === offenders.length - 1;
            return (
              <li key={offender.id} ref={isLast ? lastOffenderEl : null}>
                <OffenderCard
                  offender={offender}
                  onBusted={() => console.log("Открываем")}
                />
              </li>
            );
          })}
        </ul>
      )}

      {isLoading && <Loader />}
    </div>
  );
};

export default OffenderList;

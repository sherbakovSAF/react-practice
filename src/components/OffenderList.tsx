import OffenderCard from "../components/OffenderCard";
import Loader from "./Loader";
import styles from "./OffenderList.module.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import { getAllOffenderService } from "../services/Offender.service";
import type { Offender_I } from "../types/OffenderType";

const OffenderList = () => {
  const [offenderLoading, setOffenderLoading] = useState(false);
  const [offenders, setOffenders] = useState<Offender_I[]>([]);
  const hasMore = useRef(true);
  const currentPage = useRef(1);

  const observer = useRef<IntersectionObserver | null>(null);

  const fetchAllOffender = useCallback(async () => {
    if (!hasMore.current) return;
    setOffenderLoading(true);
    const nextPage = currentPage.current;
    currentPage.current += 1;
    const newOffenders = await getAllOffenderService(nextPage);
    if (newOffenders.length) {
      setOffenders((prev) => prev.concat(newOffenders));
    } else {
      hasMore.current = false;
    }

    setOffenderLoading(false);
  }, []);

  const lastOffenderEl = useCallback(
    (node: HTMLLIElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) fetchAllOffender();
      });
      if (node) observer.current.observe(node);
    },
    [fetchAllOffender]
  );

  // TODO: Спросить про ref и StrictMode
  useEffect(() => {
    fetchAllOffender();
  }, [fetchAllOffender]);
  return (
    <div>
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
      {offenderLoading && <Loader />}
      {hasMore.current && (
        <button onClick={() => fetchAllOffender()}>Ещё</button>
      )}
    </div>
  );
};

export default OffenderList;

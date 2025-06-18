import { useCallback, useRef } from "react";
import OffenderCard from "../components/OffenderCard";
import { useOffenders } from "../hooks/useOffenders";
import Loader from "./Loader";
import styles from "./OffenderList.module.scss";

const OffenderList = () => {
  const {
    fetchMoreOffenders,
    isLoading,
    offenders,
    hasMore,
    callApproveOffenderModal,
  } = useOffenders();

  const observer = useRef<IntersectionObserver | null>(null);
  const lastOffenderEl = useCallback((node: HTMLLIElement | null) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) fetchMoreOffenders();
    });
    if (node) observer.current.observe(node);
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader data-testid="loader-offender" />
      ) : offenders ? (
        <ul data-testid="offender-list" className={styles["list"]}>
          {offenders.map((offender, idx) => {
            const isLast = idx === offenders.length - 1 && hasMore;
            return (
              <li
                key={offender.id}
                ref={isLast ? lastOffenderEl : null}
                data-testid="offender-card"
              >
                <OffenderCard
                  offender={offender}
                  onBusted={() => callApproveOffenderModal(offender)}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Увы, но данных нет</p>
      )}
    </div>
  );
};

export default OffenderList;

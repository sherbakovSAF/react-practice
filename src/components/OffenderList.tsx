import OffenderCard from "../components/OffenderCard";
import Loader from "./Loader";
import styles from "./OffenderList.module.scss";
import { useCallback, useEffect, useState } from "react";
import { getAllOffenderService } from "../services/Offender.service";
import type { Offender_I } from "../types/OffenderType";

const OffenderList = () => {
  const [offenderLoading, setOffenderLoading] = useState(true);
  const [offenders, setOffenders] = useState<Offender_I[]>([]);

  const getAllOffender = useCallback(async () => {
    setOffenderLoading(true);
    const offender = await getAllOffenderService();
    setOffenders(offender);
    setOffenderLoading(false);
  }, []);

  useEffect(() => {
    getAllOffender();
  }, [getAllOffender]);
  return (
    <>
      {offenderLoading ? (
        <Loader />
      ) : (
        <ul className={styles["list"]}>
          {offenders.map((offender) => (
            <li key={offender.id}>
              <OffenderCard
                offender={offender}
                onBusted={() => console.log("Открываем")}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default OffenderList;

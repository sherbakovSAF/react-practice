import { useMemo } from "react";
import type { Offender_I } from "../types/OffenderType";
import Button from "./Button";
import SearchLevel from "./SearchLevel";
import styles from "./OffenderCard.module.scss";
import CashIcon from "../assets/cash-icon.svg";
import clsx from "clsx";

interface OffenderCardProps {
  offender: Offender_I;
  onBusted: () => void;
}

const OffenderCard: React.FC<OffenderCardProps> = ({ offender, onBusted }) => {
  const getFormatFee = useMemo(
    () =>
      new Intl.NumberFormat("ru-Ru", {
        style: "currency",
        currency: "USD",
      }).format(offender.fee),
    [offender.fee]
  );

  return (
    <article
      className={clsx(
        styles.offender,
        offender.isBusted && styles["offender--busted"]
      )}
      tabIndex={0}
    >
      <div className={styles.offender_img}>
        <img src={offender.avatar} alt="Преступник" loading="lazy" />
      </div>
      <div className={styles.offender_info}>
        <p className={styles.offender_info_name}>
          <strong>{offender.name}</strong>
        </p>
        <p>Возраст {offender.age}</p>
        <p className={styles.offender_info_city}>{offender.city}</p>
      </div>
      <SearchLevel lvl={offender.searchLvl} />
      <p className={styles.offender_fee}>
        <img src={CashIcon} alt="Иконка денег" loading="lazy" />
        <span> {getFormatFee}</span>
      </p>
      <hr />
      {offender.isBusted ? (
        <p className={styles.offender_busted}>Преступник пойман</p>
      ) : (
        <Button onClick={() => onBusted()}>Я поймал</Button>
      )}
    </article>
  );
};

export default OffenderCard;

import React, { useEffect, useMemo, useRef } from "react";
import styles from "./OffenderModal.module.scss";
import stylesCard from "./OffenderCard.module.scss";
import { useAppDispatch, useAppSelector } from "../store/hooks/redux";
import { offenderModalSlice } from "../store/slices/offenderModalSlice";
import type { Offender_I } from "../types/OffenderType";
import SearchLevel from "./SearchLevel";
import Button from "./Button";
import clsx from "clsx";

interface offenderModalProps {
  offender: Offender_I;
  onApprove: () => void;
  onClose: () => void;
}

const OffenderModal: React.FC<offenderModalProps> = ({
  offender,
  onClose,
  onApprove,
}) => {
  const { closeOffenderModal } = offenderModalSlice.actions;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { isOpen } = useAppSelector((state) => state.offenderModalSlice);
  const dispatch = useAppDispatch();

  const handleClickBackdropModal = (
    e: React.MouseEvent<HTMLDialogElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      dispatch(closeOffenderModal());
    }
  };

  const getFormatFee = useMemo(
    () =>
      new Intl.NumberFormat("ru-Ru", {
        style: "currency",
        currency: "USD",
      }).format(offender.fee * 1.5),
    [offender.fee]
  );

  useEffect(() => {
    if (!dialogRef.current) return;

    if (isOpen) {
      dialogRef.current.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialogRef.current.close();
      document.body.style.overflow = "";
      onClose();
    }
  }, [isOpen]);

  return (
    <dialog
      className={styles.modal}
      ref={dialogRef}
      onClick={handleClickBackdropModal}
    >
      <div className={clsx(stylesCard.offender, styles.modal_info)}>
        <div className={stylesCard.offender_img}>
          <img src={offender.avatar} alt="Преступник" loading="lazy" />
        </div>
        <div className={stylesCard.offender_info}>
          <p className={stylesCard.offender_info_name}>
            <strong>{offender.name}</strong>
          </p>
          <p>Возраст {offender.age}</p>
          <p className={stylesCard.offender_info_city}>{offender.city}</p>
        </div>
        <SearchLevel lvl={offender.searchLvl} />
      </div>
      <div className={styles.modal_alert}>
        <p>
          Вы уверены, что поймали преступника <b>{offender.name}</b>. Если это
          не так, то Вы заплатите штраф <b>{getFormatFee}</b>
        </p>
        <Button
          className={styles.modal_alert_approve}
          onClick={() => onApprove()}
        >
          Я уверен
        </Button>
      </div>
    </dialog>
  );
};

export default OffenderModal;

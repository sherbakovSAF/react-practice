import { useEffect, useRef } from "react";
import styles from "./OffenderModal.module.scss";
import { useAppDispatch, useAppSelector } from "../store/hooks/redux";
import { offenderModalSlice } from "../store/slices/offenderModalSlice";

const OffenderModal = () => {
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

  useEffect(() => {
    if (!dialogRef.current) return;

    if (isOpen) {
      dialogRef.current.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialogRef.current.close();
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <dialog
      className={styles.modal}
      ref={dialogRef}
      onClick={handleClickBackdropModal}
    >
      <p>Это диалог</p>
      <button onClick={() => dispatch(closeOffenderModal())}>Закрыть</button>
    </dialog>
  );
};

export default OffenderModal;

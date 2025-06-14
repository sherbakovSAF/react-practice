import React, { useEffect, useRef } from "react";
import styles from "./AuthModal.module.scss";
import Input from "./Input";
// import stylesCard from "./OffenderCard.module.scss";
import { useAppDispatch, useAppSelector } from "../store/hooks/redux";
// import { offenderModalSlice } from "../store/slices/offenderModalSlice";
// import type { Offender_I } from "../types/OffenderType";
// import SearchLevel from "./SearchLevel";
import Button from "./Button";
import Label from "./Label";
import { authModalSlice } from "../store/slices/authModalSlice";
// import clsx from "clsx";

interface AuthModalProps {
  // offender: Offender_I;
  // onApprove: () => void;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const { closeAuthModal } = authModalSlice.actions;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isOpen = useAppSelector((state) => state.authModalSlice.isOpen);
  const dispatch = useAppDispatch();

  const handleClickBackdropModal = (
    e: React.MouseEvent<HTMLDialogElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      dispatch(closeAuthModal());
    }
  };

  // const getFormatFee = useMemo(
  //   () =>
  //     new Intl.NumberFormat("ru-Ru", {
  //       style: "currency",
  //       currency: "USD",
  //     }).format(offender.fee * 1.5),
  //   [offender.fee]
  // );

  useEffect(() => {
    if (!dialogRef.current) return;
    console.log(isOpen);
    if (isOpen) {
      dialogRef.current.showModal();
      document.body.style.overflow = "hidden";
      console.log("inOpen");
    } else {
      dialogRef.current.close();
      document.body.style.overflow = "";
      onClose();
    }
  }, [isOpen, onClose]);

  return (
    <dialog
      className={styles.modal}
      ref={dialogRef}
      onClick={handleClickBackdropModal}
      onClose={() => dispatch(closeAuthModal())}
    >
      <form className={styles.form}>
        <div className={styles.form_info}>
          <p>
            Почта для входа: <b>test@mail.ru</b>
          </p>
          <p>
            Пароль для входа: <b>123123</b>
          </p>
        </div>
        <div className={styles.form_control}>
          <Label id="login" label="Ваш логин" view="secondary">
            <Input id="login" view={"ghost"} />
          </Label>
          <Label id="pass" label="Ваш пароль" view="secondary">
            <Input id="pass" view={"ghost"} />
          </Label>

          <Button type="submit" className={styles.form_control_submit}>
            Войти
          </Button>
        </div>
      </form>
      {/* <div className={clsx(stylesCard.offender, styles.modal_info)}>
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
      </div> */}
    </dialog>
  );
};

export default AuthModal;

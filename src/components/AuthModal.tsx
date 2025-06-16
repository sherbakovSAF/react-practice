import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./AuthModal.module.scss";
import Input from "./Input";
import { useAppDispatch, useAppSelector } from "../store/hooks/redux";
import Button from "./Button";
import Label from "./Label";
import { authModalSlice } from "../store/slices/authModalSlice";
import { AuthSlice } from "../store/slices/authSlice";
import { validateEmail, validatePassword } from "../lib/validate.lib";

const CORRECT_MAIL = "test@mail.ru";
const CORRECT_PASS = "Ab123123";

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const { closeAuthModal } = authModalSlice.actions;
  const { setAuthUser } = AuthSlice.actions;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isOpen = useAppSelector((state) => state.authModalSlice.isOpen);
  const isAuthUser = useAppSelector((state) => state.authSlice.isAuthUser);
  const dispatch = useAppDispatch();
  const [errorMail, setErrorMail] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");

  const isDisabledSubmit = useMemo(() => {
    if (!mail.length || !pass.length) return true;
    if (errorMail || errorPass) return true;
    return false;
  }, [mail, pass, errorMail, errorPass]);

  const handleClickBackdropModal = (
    e: React.MouseEvent<HTMLDialogElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      dispatch(closeAuthModal());
    }
  };

  const isValidMail = useCallback((mail: string) => {
    return validateEmail(mail);
  }, []);

  const isValidPassword = useCallback((password: string) => {
    return validatePassword(password);
  }, []);

  const handleChangeEmail = useCallback(
    (newMail: string) => {
      setMail(newMail);
      if (!isValidMail(newMail)) setErrorMail("Почта невалидна");
      else setErrorMail("");
    },
    [isValidMail]
  );

  const handleChangePass = useCallback(
    (newPass: string) => {
      setPass(newPass);
      setErrorPass(
        isValidPassword(newPass) ? "" : "Введите более подходящий пароль"
      );
    },
    [isValidPassword]
  );

  const handleSubmit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (mail === CORRECT_MAIL && pass === CORRECT_PASS) {
        dispatch(setAuthUser(true));
        return;
      }
    },
    [mail, pass, setAuthUser, dispatch]
  );

  useEffect(() => {
    if (!dialogRef.current) return;
    console.log(isOpen);
    if (isOpen) {
      dialogRef.current.showModal();
      document.body.style.overflow = "hidden";
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
      {isAuthUser ? (
        <div className={styles.isAuth}>
          <p className={styles.isAuth_title}>Вы авторизованы</p>
          <Button type="button" onClick={() => dispatch(setAuthUser(false))}>
            Выйти
          </Button>
        </div>
      ) : (
        <form className={styles.form}>
          <div className={styles.form_info}>
            <p>
              Почта для входа: <b>{CORRECT_MAIL}</b>
            </p>
            <p>
              Пароль для входа: <b>{CORRECT_PASS}</b>
            </p>
          </div>
          <div className={styles.form_control}>
            <Label
              id="login"
              label="Ваш логин"
              view="secondary"
              error={errorMail}
            >
              <Input
                data-testid="email"
                id="login"
                view={"ghost"}
                value={mail}
                onChange={(e) => handleChangeEmail(e.target.value)}
              />
            </Label>
            <Label
              id="pass"
              label="Ваш пароль"
              view="secondary"
              error={errorPass}
            >
              <Input
                data-testid="password"
                id="pass"
                view={"ghost"}
                value={pass}
                onChange={(e) => handleChangePass(e.target.value)}
              />
            </Label>

            <Button
              type="submit"
              className={styles.form_control_submit}
              disabled={isDisabledSubmit}
              onClick={(e) => e && handleSubmit(e)}
            >
              Войти
            </Button>
          </div>
        </form>
      )}
    </dialog>
  );
};

export default AuthModal;

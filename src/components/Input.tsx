import { useMemo, type InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";
import clsx from "clsx";
import type { TypeViewComponent } from "../types/UiTypes";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  view?: TypeViewComponent | "ghost";
}

const Input: React.FC<InputProps> = ({ view = "primary", ...props }) => {
  const getClassByView = useMemo(() => {
    switch (view) {
      case "secondary":
        return styles["input--secondary"];
      case "ghost":
        return styles["input--ghost"];
      default:
        return "";
    }
  }, [view]);
  return <input className={clsx(styles.input, getClassByView)} {...props} />;
};

export default Input;

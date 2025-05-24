import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";
import clsx from "clsx";
import type { TypeViewComponent } from "../types/UiTypes";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  view?: TypeViewComponent;
}

const Input: React.FC<InputProps> = ({ view = "primary", ...props }) => {
  return (
    <input
      className={clsx(
        styles.input,
        view === "secondary" && styles["input--secondary"]
      )}
      {...props}
    />
  );
};

export default Input;

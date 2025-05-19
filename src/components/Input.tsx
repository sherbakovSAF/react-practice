import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";
import clsx from "clsx";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  view?: "primary" | "secondary";
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

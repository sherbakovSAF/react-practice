import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";
interface ButtonProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  view?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  view = "primary",
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(
        className,
        styles.btn,
        view === "secondary" && styles["btn--secondary"]
      )}
    >
      {children}
    </button>
  );
};

export default Button;

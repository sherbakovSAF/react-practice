import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";
import type { TypeViewComponent } from "../types/UiTypes";
interface ButtonProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  view?: TypeViewComponent;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  type = "button",
  view = "primary",
  ...props
}) => {
  return (
    <button
      {...props}
      type={type}
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

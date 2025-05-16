import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styles from "./Button.module.scss";
type MarkBustedButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
>;

const MarkBustedButton: React.FC<MarkBustedButtonProps> = ({
  children,
  ...props
}) => {
  console.log(styles);
  return (
    <button className={styles.btn} {...props}>
      {children}
    </button>
  );
};

export default MarkBustedButton;

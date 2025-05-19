import type { HTMLAttributes, PropsWithChildren } from "react";
import styles from "./Label.module.scss";
import clsx from "clsx";
interface LabelProps
  extends PropsWithChildren<HTMLAttributes<HTMLDListElement>> {
  label: string;
  id: string;
}

const Label: React.FC<LabelProps> = ({ children, id, label, ...props }) => {
  return (
    <dl className={clsx(styles.label)} {...props}>
      <dt>
        <label htmlFor={id}>{label}</label>
      </dt>
      <dd>{children}</dd>
    </dl>
  );
};

export default Label;

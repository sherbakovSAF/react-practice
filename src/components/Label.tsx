import { useMemo, type HTMLAttributes, type PropsWithChildren } from "react";
import styles from "./Label.module.scss";
import clsx from "clsx";
import type { TypeViewComponent } from "../types/UiTypes";
interface LabelProps
  extends PropsWithChildren<HTMLAttributes<HTMLDListElement>> {
  label: string;
  id: string;
  view?: TypeViewComponent;
}

const Label: React.FC<LabelProps> = ({
  children,
  id,
  label,
  view = "primary",
  ...props
}) => {
  const getClassByView = useMemo(() => {
    switch (view) {
      case "secondary":
        return styles["label--secondary"];

      default:
        return "";
    }
  }, [view]);
  return (
    <dl className={clsx(styles.label, getClassByView)} {...props}>
      <dt>
        <label htmlFor={id}>{label}</label>
      </dt>
      <dd>{children}</dd>
    </dl>
  );
};

export default Label;

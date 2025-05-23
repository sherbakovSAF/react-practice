import React from "react";
import type { SelectHTMLAttributes } from "react";
import styles from "./Select.module.scss";
import clsx from "clsx";
import type { OptionItem_I } from "../types/SettingsTypes";
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  view?: "primary" | "secondary";
  options: OptionItem_I[];
  onOptionSelect: (option: OptionItem_I | null) => void;
  selected?: OptionItem_I | null;
}

const Select: React.FC<SelectProps> = React.memo(
  ({
    view = "primary",
    options,
    onOptionSelect,
    selected = null,
    ...props
  }) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedOption = options.find((opt) => opt.code === e.target.value);
      onOptionSelect(selectedOption ?? null);
    };

    return (
      <select
        className={clsx(
          styles.select,
          view === "secondary" && styles["select--secondary"]
        )}
        onChange={handleChange}
        value={selected ? selected.code : "null"}
        {...props}
      >
        <option key={"null"} value={"null"}>
          Не выбрано
        </option>
        {options.map((option) => (
          <option key={option.code} value={option.code}>
            {option.title}
          </option>
        ))}
      </select>
    );
  }
);
export default Select;

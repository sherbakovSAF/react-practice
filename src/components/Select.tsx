import type { SelectHTMLAttributes } from "react";
import styles from "./Select.module.scss";
import clsx from "clsx";
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  view?: "primary" | "secondary";
  options: { code: string; title: string }[];
  onOptionSelect: (option: { code: string; title: string }) => void;
  selected?: { code: string; title: string } | null;
}

const Select: React.FC<SelectProps> = ({
  view = "primary",
  options,
  onOptionSelect,
  selected,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCode = e.target.value;
    const selectedOption = options.find((opt) => opt.code === selectedCode);
    if (selectedOption) {
      onOptionSelect(selectedOption);
    }
  };

  return (
    <select
      className={clsx(
        styles.select,
        view === "secondary" && styles["select--secondary"]
      )}
      onChange={handleChange}
      value={selected?.code}
      {...props}
    >
      {options.map((option) => (
        <option key={option.code} value={option.code}>
          {option.title}
        </option>
      ))}
    </select>
  );
};

export default Select;

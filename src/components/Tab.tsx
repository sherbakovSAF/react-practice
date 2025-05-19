import { type HTMLAttributes } from "react";
import styles from "./Tab.module.scss";
import clsx from "clsx";

interface TabProps extends HTMLAttributes<HTMLDivElement> {
  view?: "primary" | "secondary";
  tabs: { code: string; title: string }[];
  selectedTab?: string | null;
  onSelectTab: (tab: { code: string; title: string }) => void;
}

const Tab: React.FC<TabProps> = ({
  view = "primary",
  tabs,
  selectedTab = null,
  onSelectTab,
  ...props
}) => {
  console.log(styles.tab_item);
  return (
    <div
      className={clsx(
        styles.tab,
        view === "secondary" && styles["tab--secondary"]
      )}
      {...props}
    >
      {tabs.map((tab, tabIdx) => (
        <span
          className={clsx(
            styles.tab_item,
            tab.code === selectedTab && styles["tab_item--active"]
          )}
          onClick={() => onSelectTab(tab)}
          key={tabIdx}
        >
          {tab.title}
        </span>
      ))}
    </div>
  );
};

export default Tab;

import React from "react";
import { type HTMLAttributes } from "react";
import styles from "./Tab.module.scss";
import clsx from "clsx";
import type { OptionItem_I } from "../types/SettingsTypes";

interface TabProps extends HTMLAttributes<HTMLDivElement> {
  view?: "primary" | "secondary";
  tabs: OptionItem_I[];
  selectedTab?: OptionItem_I | null;
  onSelectTab: (tab: OptionItem_I) => void;
}

const Tab: React.FC<TabProps> = React.memo(
  ({ view = "primary", tabs, selectedTab = null, onSelectTab, ...props }) => {
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
              tab.code === selectedTab?.code && styles["tab_item--active"]
            )}
            onClick={() => onSelectTab(tab)}
            key={tabIdx}
          >
            {tab.title}
          </span>
        ))}
      </div>
    );
  }
);

export default Tab;

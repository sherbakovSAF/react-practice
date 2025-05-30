import React from "react";
import { type HTMLAttributes } from "react";
import styles from "./Tab.module.scss";
import clsx from "clsx";
import type { OptionItem_I } from "../types/SettingsTypes";
import type { TypeViewComponent } from "../types/UiTypes";

interface TabProps extends HTMLAttributes<HTMLDivElement> {
  view?: TypeViewComponent;
  tabs: OptionItem_I[];
  selectedTab?: OptionItem_I | null;
  onSelectTab: (tab: OptionItem_I | null) => void;
}

const Tab: React.FC<TabProps> = React.memo(
  ({ view = "primary", tabs, selectedTab = null, onSelectTab, ...props }) => {
    const handleTab = (tab: OptionItem_I) => {
      if (selectedTab?.code === tab.code) return onSelectTab(null);
      return onSelectTab(tab);
    };

    const handleKeyDown = (
      e: React.KeyboardEvent<HTMLSpanElement>,
      tab: OptionItem_I
    ) => {
      if (e.code === "Enter") handleTab(tab);
    };
    return (
      <div
        className={clsx(
          styles.tab,
          view === "secondary" && styles["tab--secondary"]
        )}
        {...props}
        role="tablist"
      >
        {tabs.map((tab, tabIdx) => (
          <span
            className={clsx(
              styles.tab_item,
              tab.code === selectedTab?.code && styles["tab_item--active"]
            )}
            onClick={() => handleTab(tab)}
            onKeyDown={(e) => handleKeyDown(e, tab)}
            key={tabIdx}
            tabIndex={0}
            role="tab"
          >
            {tab.title}
          </span>
        ))}
      </div>
    );
  }
);

export default Tab;

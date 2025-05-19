import Input from "./Input";
import Button from "./Button";
import Label from "./Label";
import Select from "./Select";
import Tab from "./Tab";
import styles from "./Header.module.scss";
import { useEffect, useState } from "react";
import clsx from "clsx";

const Header = () => {
  // TODO: Вернуться к тому, чтобы при смене level, не перерендеривался TAB => Statuses
  const [lvl, setLvl] = useState<{ code: string; title: string } | null>(null);
  const levels = [
    { code: "1", title: "Низкий уровень угрозы" },
    { code: "2", title: "Склонен к нарушению порядка" },
    { code: "3", title: "Замечен в агрессивном поведении" },
    { code: "4", title: "Потенциально опасен" },
    { code: "5", title: "Угроза общественной безопасности" },
    { code: "6", title: "Опасен для окружающих" },
    { code: "7", title: "Особо опасен" },
  ];

  const [status, setStatus] = useState<string | null>(null);
  const statuses = [
    { code: "fining", title: "Разыскивает" },
    { code: "busted", title: "Пойман" },
  ];

  return (
    <header className={styles.header}>
      <div className={clsx(styles.header_logo, "container")}>
        <span className={styles.header_logo_title}>Wanted</span>
        <Timer />
      </div>
      <div className={clsx(styles.header_control, "container")}>
        <search>
          <Input
            role="search"
            view="secondary"
            placeholder="Введите имя преступника"
          />
        </search>
        <div className={styles.header_control_params}>
          <Label label="Уровень розыска" id="lvl">
            <Select
              id="lvl"
              view="secondary"
              options={levels}
              selected={lvl}
              onOptionSelect={(e) => setLvl(e)}
            />
          </Label>
          <Label label="Состояние" id="status">
            <Tab
              id="status"
              view="secondary"
              tabs={statuses}
              selectedTab={status}
              onSelectTab={(status) => status && setStatus(status.code)}
            />
          </Label>

          <Button
            className={styles.header_control_params_reset}
            view="secondary"
          >
            Сброс
          </Button>
        </div>
      </div>
    </header>
  );
};

const Timer = () => {
  const getCurrentTimeAndDate = () => {
    return `${new Date().toLocaleDateString()}/${new Date().toLocaleTimeString()}`;
  };
  const [currentTime, setCurrentTime] = useState(() => getCurrentTimeAndDate());

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentTime(getCurrentTimeAndDate()),
      1000
    );

    return () => clearInterval(interval);
  });

  return <span>{currentTime}</span>;
};

export default Header;

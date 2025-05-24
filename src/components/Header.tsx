import Input from "./Input";
import Button from "./Button";
import Label from "./Label";
import Select from "./Select";
import Tab from "./Tab";
import styles from "./Header.module.scss";
import { useCallback, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "../store/hooks/redux";
import { OffenderSlice } from "../store/slices/offenderSlice";
import type { OptionItem_I } from "../types/SettingsTypes";
import { WantedLevel, type WantedLevel_E } from "../types/WantedLevelTypes";
import {
  OffenderStatus,
  type OffenderStatus_E,
} from "../types/OffenderStatusTypes";

const Header = () => {
  // TODO: Вернуться к тому, чтобы при смене level, не перерендеривался TAB => Statuses
  const { lvl, status, search } = useAppSelector(
    (state) => state.offenderReducer
  );

  const { setLvl, setSearch, setStatus, resetFilter } = OffenderSlice.actions;
  const dispatch = useAppDispatch();

  const levels = useMemo((): OptionItem_I<WantedLevel_E>[] => {
    return [
      { code: WantedLevel.ONE, title: "Низкий уровень угрозы" },
      { code: WantedLevel.TWO, title: "Склонен к нарушению порядка" },
      { code: WantedLevel.THREE, title: "Замечен в агрессивном поведении" },
      { code: WantedLevel.FOUR, title: "Потенциально опасен" },
      { code: WantedLevel.FIVE, title: "Угроза общественной безопасности" },
      { code: WantedLevel.SIX, title: "Опасен для окружающих" },
      { code: WantedLevel.SEVEN, title: "Особо опасен" },
    ];
  }, []);

  const currentLvl = useMemo((): OptionItem_I<WantedLevel_E> | null => {
    return levels.find(({ code }) => code === lvl) ?? null;
  }, [lvl]);

  const statuses = useMemo((): OptionItem_I<OffenderStatus_E>[] => {
    return [
      { code: OffenderStatus.BUSTED, title: "Пойман" },
      { code: OffenderStatus.FINING, title: "Разыскивает" },
    ];
  }, []);
  const currentStatus = useMemo((): OptionItem_I<OffenderStatus_E> | null => {
    return statuses.find(({ code }) => code === status) ?? null;
  }, [status]);

  const handleUpdateLvl = useCallback((updatedLvl: OptionItem_I | null) => {
    // TODO: Подумать над "as"
    dispatch(setLvl(updatedLvl ? (updatedLvl.code as WantedLevel_E) : null));
  }, []);

  const handleStatusLvl = useCallback((updatedStatus: OptionItem_I | null) => {
    // TODO: Подумать над "as"
    dispatch(
      setStatus(updatedStatus ? (updatedStatus.code as OffenderStatus_E) : null)
    );
  }, []);

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
            value={search}
            onChange={(newValue) => dispatch(setSearch(newValue.target.value))}
          />
        </search>
        <div className={styles.header_control_params}>
          <Label label="Уровень розыска" id="lvl">
            <Select
              id="lvl"
              view="secondary"
              options={levels}
              selected={currentLvl}
              onOptionSelect={handleUpdateLvl}
            />
          </Label>
          <Label label="Состояние" id="status">
            <Tab
              id="status"
              view="secondary"
              tabs={statuses}
              selectedTab={currentStatus}
              onSelectTab={handleStatusLvl}
            />
          </Label>

          <Button
            className={styles.header_control_params_reset}
            view="secondary"
            onClick={() => dispatch(resetFilter())}
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

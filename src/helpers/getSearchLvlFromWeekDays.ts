// Т.к используется бесплатная версия mockup.io было принято решение указать дни недели и переформатировать их в уровни розыска

export const getSearchLvlFromWeekDays = (dayWeek: string) => {
  const searchLevels: Record<
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday",
    number
  > = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 7,
  };

  return searchLevels[dayWeek as keyof typeof searchLevels] ?? 0;
};

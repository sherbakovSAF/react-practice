export const WantedLevel = {
  ONE: "1",
  TWO: "2",
  THREE: "3",
  FOUR: "4",
  FIVE: "5",
  SIX: "6",
  SEVEN: "7",
} as const;

export type WantedLevel_E = (typeof WantedLevel)[keyof typeof WantedLevel];

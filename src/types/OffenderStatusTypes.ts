export const OffenderStatus = {
  FINING: "fining",
  BUSTED: "busted",
} as const;

export type OffenderStatus_E =
  (typeof OffenderStatus)[keyof typeof OffenderStatus];

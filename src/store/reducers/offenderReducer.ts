import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Offender_I } from "../../types/OffenderType";

export const OffenderStatus = {
  FINING: "fining",
  BUSTED: "busted",
} as const;

export type OffenderStatus_E =
  (typeof OffenderStatus)[keyof typeof OffenderStatus];

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

interface InitialState_I {
  offenders: Offender_I[];
  search: string;
  status: OffenderStatus_E | null;
  lvl: WantedLevel_E | null;
  currentPage: number;
  hasMore: boolean;
}

const initialState: InitialState_I = {
  offenders: [],
  search: "",
  status: null,
  lvl: null,
  currentPage: 1,
  hasMore: true,
};

export const OffenderSlice = createSlice({
  name: "offender",
  initialState,
  reducers: {
    setLvl: (state, action: PayloadAction<WantedLevel_E | null>) => {
      state.lvl = action.payload;
      state.currentPage = initialState.currentPage;
    },
    setStatus: (state, action: PayloadAction<OffenderStatus_E>) => {
      state.status = action.payload;
      state.currentPage = initialState.currentPage;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.currentPage = initialState.currentPage;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
    resetFilter: () => initialState,
    addOffenders(state, action: PayloadAction<Offender_I[]>) {
      state.offenders = state.offenders.concat(action.payload);
    },
    replaceOffenders(state, action: PayloadAction<Offender_I[]>) {
      state.offenders = action.payload;
    },
  },
});

export default OffenderSlice.reducer;

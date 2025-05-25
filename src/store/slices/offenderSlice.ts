import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Offender_I } from "../../types/OffenderType";
import type { WantedLevel_E } from "../../types/WantedLevelTypes";
import type { OffenderStatus_E } from "../../types/OffenderStatusTypes";

interface InitialState_I {
  offenders: Offender_I[];
  search: string;
  status: OffenderStatus_E | null;
  lvl: WantedLevel_E | null;
  currentPage: number;
  hasMore: boolean;
  offenderForApprove: Offender_I | null;
}

const initialState: InitialState_I = {
  offenders: [],
  search: "",
  status: null,
  lvl: null,
  currentPage: 1,
  hasMore: true,
  offenderForApprove: null,
};

export const OffenderSlice = createSlice({
  name: "offender",
  initialState,
  reducers: {
    setLvl: (state, action: PayloadAction<WantedLevel_E | null>) => {
      state.lvl = action.payload;
      state.currentPage = initialState.currentPage;
    },
    setStatus: (state, action: PayloadAction<OffenderStatus_E | null>) => {
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
    setOffenderForApprove(state, action: PayloadAction<Offender_I | null>) {
      state.offenderForApprove = action.payload;
    },
    updateOffender(state, action: PayloadAction<Offender_I>) {
      const idxOffender = state.offenders.findIndex(
        ({ id }) => id === action.payload.id
      );
      state.offenders[idxOffender] = action.payload;
    },
  },
});

export default OffenderSlice.reducer;

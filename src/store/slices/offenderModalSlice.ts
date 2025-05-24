import { createSlice } from "@reduxjs/toolkit";

interface OffenderModalState_I {
  isOpen: boolean;
}

const initialState: OffenderModalState_I = {
  isOpen: false,
};

export const offenderModalSlice = createSlice({
  name: "offenderModal",
  initialState,
  reducers: {
    openOffenderModal(state) {
      state.isOpen = true;
    },
    closeOffenderModal(state) {
      state.isOpen = false;
    },
  },
});

export default offenderModalSlice.reducer;

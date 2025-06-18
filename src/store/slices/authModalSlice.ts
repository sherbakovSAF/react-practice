import { createSlice } from "@reduxjs/toolkit";

interface AuthModalState_I {
  isOpen: boolean;
}

const initialState: AuthModalState_I = {
  isOpen: false,
};

export const authModalSlice = createSlice({
  name: "AuthModal",
  initialState,
  reducers: {
    openAuthModal(state) {
      state.isOpen = true;
    },
    closeAuthModal(state) {
      state.isOpen = false;
    },
  },
});

export default authModalSlice.reducer;

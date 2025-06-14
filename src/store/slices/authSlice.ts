import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface InitialState_I {
  isAuthUser: boolean;
}

const initialState: InitialState_I = {
  isAuthUser: false,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<boolean>) => {
      state.isAuthUser = action.payload;
    },
  },
});

export default AuthSlice.reducer;

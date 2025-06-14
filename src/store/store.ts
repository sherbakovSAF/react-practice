import { combineReducers, configureStore } from "@reduxjs/toolkit";
import offenderSlice from "./slices/offenderSlice";
import offenderModalSlice from "./slices/offenderModalSlice";
import authModalSlice from "./slices/authModalSlice";
import authSlice from "./slices/authSlice";
import { offenderApi } from "../services/Offender.service";

const rootReducer = combineReducers({
  offenderSlice,
  offenderModalSlice,
  authModalSlice,
  authSlice,
  [offenderApi.reducerPath]: offenderApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(offenderApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

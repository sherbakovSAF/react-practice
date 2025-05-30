import { combineReducers, configureStore } from "@reduxjs/toolkit";
import offenderSlice from "./slices/offenderSlice";
import offenderModalSlice from "./slices/offenderModalSlice";
import { offenderApi } from "../services/Offender.service";

const rootReducer = combineReducers({
  offenderSlice,
  offenderModalSlice,
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

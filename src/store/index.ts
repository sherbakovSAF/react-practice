import { combineReducers, configureStore } from "@reduxjs/toolkit";
import offenderReducer from "./reducers/offenderReducer";
import { offenderApi } from "../services/Offender.service";

const rootReducer = combineReducers({
  offenderReducer,
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

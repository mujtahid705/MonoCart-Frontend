// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/slice";
import userReducer from "./slices/userSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      counter: counterReducer,
      user: userReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const store = makeStore();

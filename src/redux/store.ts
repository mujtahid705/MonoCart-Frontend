// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/slice";
import userReducer from "./slices/userSlice";
import productsReducer from "./slices/productsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

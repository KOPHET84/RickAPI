import { configureStore } from "@reduxjs/toolkit";
import { characterSlice } from "../features/charactersSlice";

export const store = configureStore({
  reducer: {
    [characterSlice.name]: characterSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

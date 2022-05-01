import { configureStore } from "@reduxjs/toolkit";
import interfaceReducer from "./interfaceSlice";
import socialReducer from "./socialSlice";

export const store = configureStore({
  reducer: {
    interface: interfaceReducer,
    social: socialReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import interfaceReducer from "./interfaceSlice";
import sessionReducer from "./sessionSlice";

export const store = configureStore({
  reducer: {
    interface: interfaceReducer,
    session: sessionReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

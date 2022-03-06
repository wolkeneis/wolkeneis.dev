import { createSlice } from "@reduxjs/toolkit";

export const interfaceSlice = createSlice({
  name: "interface",
  initialState: {
    mobile: undefined,
    theme: "dark-theme"
  },
  reducers: {
    setMobile: (state, action) => {
      state.mobile = action.payload;
    },

    selectTheme: (state, action) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "dark-theme" ? "light-theme" : "dark-theme";
    }
  }
});

export const { setMobile } = interfaceSlice.actions;
export const { selectTheme, toggleTheme } = interfaceSlice.actions;

export default interfaceSlice.reducer;
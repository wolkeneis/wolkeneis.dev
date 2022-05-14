import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InterfaceState {
  theme: "dark-theme" | "light-theme";
  drawerOpen: boolean;
  drawerWidth: number;
}

const initialState: InterfaceState = {
  theme: "dark-theme",
  drawerOpen: true,
  drawerWidth: 240
};

export const interfaceSlice = createSlice({
  name: "interface",
  initialState,
  reducers: {
    selectTheme: (
      state,
      action: PayloadAction<"dark-theme" | "light-theme">
    ) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "dark-theme" ? "light-theme" : "dark-theme";
    },

    setDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.drawerOpen = action.payload;
    },
    toggleDrawer: (state) => {
      state.drawerOpen = !state.drawerOpen;
    },
    setDrawerWidth: (state, action: PayloadAction<number>) => {
      state.drawerWidth = action.payload;
    }
  }
});

export const { selectTheme, toggleTheme } = interfaceSlice.actions;
export const { setDrawerOpen, toggleDrawer, setDrawerWidth } =
  interfaceSlice.actions;

export default interfaceSlice.reducer;

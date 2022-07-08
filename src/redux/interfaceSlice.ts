import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";

interface InterfaceState {
  theme: "dark-theme" | "light-theme";
  mobile: boolean;
  drawerOpen: boolean;
  drawerWidth: number;
  uploadDialogVisible: boolean;
  fileDeletionErrorVisible: boolean;
}

const initialState: InterfaceState = {
  theme: "dark-theme",
  mobile: false,
  drawerOpen: false,
  drawerWidth: 240,
  uploadDialogVisible: false,
  fileDeletionErrorVisible: false
};

export const interfaceSlice: Slice = createSlice({
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

    setMobile: (state, action: PayloadAction<boolean>) => {
      state.mobile = action.payload;
    },

    setDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.drawerOpen = action.payload;
    },
    toggleDrawer: (state) => {
      state.drawerOpen = !state.drawerOpen;
    },
    setDrawerWidth: (state, action: PayloadAction<number>) => {
      state.drawerWidth = action.payload;
    },

    setUploadDialogVisible(state, action: PayloadAction<boolean>) {
      state.uploadDialogVisible = action.payload;
    },

    setFileDeletionErrorVisible(state, action: PayloadAction<boolean>) {
      state.fileDeletionErrorVisible = action.payload;
    }
  }
});

export const { selectTheme, toggleTheme } = interfaceSlice.actions;
export const { setMobile } = interfaceSlice.actions;
export const { setDrawerOpen, toggleDrawer, setDrawerWidth } =
  interfaceSlice.actions;
export const { setUploadDialogVisible, setFileDeletionErrorVisible } =
  interfaceSlice.actions;

export default interfaceSlice.reducer;

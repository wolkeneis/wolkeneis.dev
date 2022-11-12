import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";

interface InterfaceState {
  theme: "dark-theme" | "light-theme";
  mobile: boolean;
  drawerOpen: boolean;
  drawerWidth: number;
  uploadDialogVisible: boolean;
  folderDialogVisible: boolean;
  fileDeletionErrorVisible: boolean;
  fileEditErrorVisible: boolean;
  loginRequiredVisible: boolean;
  friendErrorVisible: boolean;
}

const initialState: InterfaceState = {
  theme: "dark-theme",
  mobile: false,
  drawerOpen: false,
  drawerWidth: 240,
  uploadDialogVisible: false,
  folderDialogVisible: false,
  fileDeletionErrorVisible: false,
  fileEditErrorVisible: false,
  loginRequiredVisible: false,
  friendErrorVisible: false
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
    toggleTheme: (state: InterfaceState) => {
      state.theme = state.theme === "dark-theme" ? "light-theme" : "dark-theme";
    },

    setMobile: (state: InterfaceState, action: PayloadAction<boolean>) => {
      state.mobile = action.payload;
    },

    setDrawerOpen: (state: InterfaceState, action: PayloadAction<boolean>) => {
      state.drawerOpen = action.payload;
    },
    toggleDrawer: (state: InterfaceState) => {
      state.drawerOpen = !state.drawerOpen;
    },
    setDrawerWidth: (state: InterfaceState, action: PayloadAction<number>) => {
      state.drawerWidth = action.payload;
    },

    setUploadDialogVisible(
      state: InterfaceState,
      action: PayloadAction<boolean>
    ) {
      state.uploadDialogVisible = action.payload;
    },

    setFolderDialogVisible(
      state: InterfaceState,
      action: PayloadAction<boolean>
    ) {
      state.folderDialogVisible = action.payload;
    },

    setFileDeletionErrorVisible(
      state: InterfaceState,
      action: PayloadAction<boolean>
    ) {
      state.fileDeletionErrorVisible = action.payload;
    },

    setFileEditErrorVisible(
      state: InterfaceState,
      action: PayloadAction<boolean>
    ) {
      state.fileEditErrorVisible = action.payload;
    },

    setLoginRequiredVisible(
      state: InterfaceState,
      action: PayloadAction<boolean>
    ) {
      state.loginRequiredVisible = action.payload;
    },

    setFriendErrorVisible(
      state: InterfaceState,
      action: PayloadAction<boolean>
    ) {
      state.friendErrorVisible = action.payload;
    }
  }
});

export const { selectTheme, toggleTheme } = interfaceSlice.actions;
export const { setMobile } = interfaceSlice.actions;
export const { setDrawerOpen, toggleDrawer, setDrawerWidth } =
  interfaceSlice.actions;
export const {
  setUploadDialogVisible,
  setFolderDialogVisible,
  setFileDeletionErrorVisible,
  setFileEditErrorVisible
} = interfaceSlice.actions;
export const { setLoginRequiredVisible, setFriendErrorVisible } =
  interfaceSlice.actions;

export default interfaceSlice.reducer;

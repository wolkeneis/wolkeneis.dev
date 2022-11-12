import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { type moos_api_v1 as v1 } from "moos-api";

interface SessionState {
  profile?: v1.UserProfile | null;
  friends?: v1.Friend[] | null;
  files?: v1.File[] | null;
  csrfToken?: string;
}

const initialState: SessionState = {
  profile: undefined,
  friends: undefined,
  files: undefined,
  csrfToken: undefined
};

export const sessionSlice: Slice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setProfile: (
      state: SessionState,
      action: PayloadAction<v1.UserProfile | null>
    ) => {
      state.profile = action.payload;
    },

    setFriends: (
      state: SessionState,
      action: PayloadAction<v1.Friend[] | null>
    ) => {
      state.friends = action.payload;
    },

    setFiles: (
      state: SessionState,
      action: PayloadAction<v1.File[] | null>
    ) => {
      state.files = action.payload;
    },

    setCSRFToken: (
      state: SessionState,
      action: PayloadAction<string | undefined>
    ) => {
      state.csrfToken = action.payload;
    }
  }
});

export const { setProfile, setFriends, setFiles, setCSRFToken } =
  sessionSlice.actions;

export default sessionSlice.reducer;

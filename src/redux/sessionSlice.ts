import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { type v1 } from "moos-api";

interface SessionState {
  profile?: v1.UserProfile | null;
  files?: v1.File[] | null;
  csrfToken?: string;
}

const initialState: SessionState = {
  profile: undefined,
  files: undefined,
  csrfToken: undefined
};

export const sessionSlice: Slice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<v1.UserProfile | null>) => {
      state.profile = action.payload;
    },

    setFiles: (state, action: PayloadAction<v1.File[] | null>) => {
      state.files = action.payload;
    },

    setCSRFToken: (state, action: PayloadAction<string | undefined>) => {
      state.csrfToken = action.payload;
    }
  }
});

export const { setProfile, setFiles, setCSRFToken } = sessionSlice.actions;

export default sessionSlice.reducer;

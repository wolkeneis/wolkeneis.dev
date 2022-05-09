import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v1 } from "moos-api";

interface SessionState {
  profile?: v1.components["schemas"]["UserProfile"] | null;
  csrfToken?: string;
}

const initialState: SessionState = {
  profile: undefined,
  csrfToken: undefined
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setProfile: (
      state,
      action: PayloadAction<v1.components["schemas"]["UserProfile"] | null>
    ) => {
      state.profile = action.payload;
    },

    setCSRFToken: (state, action: PayloadAction<string | undefined>) => {
      state.csrfToken = action.payload;
    }
  }
});

export const { setProfile, setCSRFToken } = sessionSlice.actions;

export default sessionSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "../logic/profile";

interface SocialState {
  profile?: Profile;
}

const initialState: SocialState = {
  profile: undefined
};

export const socialSlice = createSlice({
  name: "social",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
    }
  }
});

export const { setProfile } = socialSlice.actions;

export default socialSlice.reducer;

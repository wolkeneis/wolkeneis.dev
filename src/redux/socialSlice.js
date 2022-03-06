import { createSlice } from "@reduxjs/toolkit";

export const socialSlice = createSlice({
  name: "social",
  initialState: {
    profile: undefined,
    avatar: undefined,
    users: {},
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setAvatar: (state, action) => {
      state.avatar = action.payload;
    },

    setUser: (state, action) => {
      state.users[action.payload.id] = action.payload;
    },
  }
});

export const { setProfile, setAvatar } = socialSlice.actions;
export const { setUser } = socialSlice.actions;

export default socialSlice.reducer;
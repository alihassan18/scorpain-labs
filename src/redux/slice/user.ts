import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
    wantToSeeFriendOnMap: null,
  },
  reducers: {
    updateUser: (state, action) => {
      state.data = action.payload;
    },
    updateFriendOnMap: (state, action) => {
      state.wantToSeeFriendOnMap = action.payload;
    },
  },
});

export const { updateUser, updateFriendOnMap } = userSlice.actions;

export default userSlice.reducer;

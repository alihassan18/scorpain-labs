import { createSlice } from "@reduxjs/toolkit";

const poiSlice = createSlice({
  name: "pois",
  initialState: {
    data: [],
    filteredPois: [],
  },
  reducers: {
    updateInitialState: (state, action) => {
      state.data = action.payload;
      state.filteredPois = action.payload;
    },
    updatePois: (state, action) => {
      state.data = action.payload;
    },
    updateFilteredPois: (state, action) => {
      state.filteredPois = action.payload;
    },
  },
});

export const { updateInitialState, updatePois, updateFilteredPois } =
  poiSlice.actions;

export default poiSlice.reducer;

// slice.js

import { createSlice } from "@reduxjs/toolkit";

export const filtersSlice = createSlice({
  name: "filter",
  initialState: {
    filters: [
      {
        label: "Featured",
        value: "Featured",
        type: "type",
      },
      {
        value: "yolo_score",
        label: "Yolo Score",
        type: "sort",
      },
    ],
  },
  reducers: {
    saveValues: (state, action) => {
      state.filters = action.payload;
    },
    addValue: (state, action) => {
      const { value } = action.payload;
      const updatedFilters = state.filters.filter(
        (filter: { value: string; label: string; type: string }) =>
          filter?.value !== value
      );
      //   @ts-ignore
      updatedFilters.push(action.payload);
      state.filters = updatedFilters;
    },
    upadteSearch: (state, action) => {
      const { type } = action.payload;
      const updatedFilters = state.filters.filter(
        (filter: { value: string; label: string; type: string }) =>
          filter?.type !== type
      );
      //   @ts-ignore
      updatedFilters.push(action.payload);
      state.filters = updatedFilters;
    },
    updateType: (state, action) => {
      const { type } = action.payload;
      console.log('type',type)
      const updatedFilters = state.filters.filter(
        (filter: { value: string; label: string; type: string }) =>
          filter?.type !== type
      );
      //   @ts-ignore
      updatedFilters.push(action.payload);
      state.filters = updatedFilters;
    },
    addSort: (state, action) => {
      const { type } = action.payload;
      const updatedFilters = state.filters.filter(
        (filter: { value: string; label: string; type: string }) =>
          filter?.type !== type
      );
      //   @ts-ignore
      updatedFilters.push(action.payload);
      state.filters = updatedFilters;
    },
    removeValue: (state, action) => {
      state.filters = state.filters.filter(
        (value: { value: string; label: string; type: string }) =>
          value?.value !== action.payload
      );
    },
    resetFilters: (state) => {
      state.filters = [];
    },
  },
});

export const {
  saveValues,
  addValue,
  removeValue,
  addSort,
  resetFilters,
  updateType,
  upadteSearch,
} = filtersSlice.actions;

export const selectfilters = (state: any) => state.filter.filters;

export default filtersSlice;

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@/redux/slice/api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { filtersSlice } from "./slice/filters";
import poiReducer from "./slice/pois";
import userSlice from "./slice/user";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [filtersSlice.reducerPath]: filtersSlice.reducer,
    pois: poiReducer,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

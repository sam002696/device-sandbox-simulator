// src/redux/global/globalSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { getPresets } from "../shared/presetThunks";

const globalSlice = createSlice({
  name: "global",
  initialState: { presets: [], loading: false, error: null },
  reducers: {},
  // Handling asynchronous actions for fetching presets
  extraReducers: (builder) => {
    builder
      .addCase(getPresets("").pending, (state) => {
        state.loading = true;
      })
      .addCase(getPresets("").fulfilled, (state, action) => {
        state.loading = false;
        state.presets = action.payload;
      })
      .addCase(getPresets("").rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default globalSlice.reducer;

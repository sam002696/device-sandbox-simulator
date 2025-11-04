// src/redux/ui/toastSlice.js
import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: {
    message: null,
    type: "info", // info | success | error
    source: null, 
  },
  reducers: {
    showToast: (state, action) => {
      const { message, type = "info", source = null } = action.payload;
      state.message = message;
      state.type = type;
      state.source = source;
    },
    hideToast: (state) => {
      state.message = null;
      state.type = "info";
      state.source = null;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;

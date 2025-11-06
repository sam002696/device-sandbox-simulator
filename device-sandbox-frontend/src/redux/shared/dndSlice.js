// redux/shared/dndSlice.js
import { createSlice } from "@reduxjs/toolkit";

const dndSlice = createSlice({
  name: "dnd",
  initialState: { epoch: 0 },
  reducers: {
    restartDnd(state) {
      state.epoch += 1; // bump to force remount
    },
  },
});

export const { restartDnd } = dndSlice.actions;
export default dndSlice.reducer;

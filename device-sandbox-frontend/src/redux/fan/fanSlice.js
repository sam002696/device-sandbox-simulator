import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOn: false,
  speed: 64,
  showActions: false, // for Topbar buttons visibility
  showModal: false, // for save preset modal
};

const fanSlice = createSlice({
  name: "fan",
  initialState,
  reducers: {
    togglePower: (state) => {
      state.isOn = !state.isOn;
      if (!state.isOn) {
        state.speed = 0;
        state.showActions = false;
      }
    },
    setSpeed: (state, action) => {
      state.speed = action.payload;
      state.showActions = state.isOn && state.speed > 0;
    },
    clearFan: (state) => {
      state.isOn = false;
      state.speed = 0;
      state.showActions = false;
    },
    openModal: (state) => {
      state.showModal = true;
    },
    closeModal: (state) => {
      state.showModal = false;
    },
  },
});

export const { togglePower, setSpeed, clearFan, openModal, closeModal } =
  fanSlice.actions;

export default fanSlice.reducer;

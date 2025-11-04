import { createSlice } from "@reduxjs/toolkit";
import { createDeviceBase } from "../shared/deviceSliceBase";

const { baseInitialState, baseReducers } = createDeviceBase(
  {
    speed: 0,
  },
  {
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
      state.activePresetId = null;
    },

    // extend savePreset to apply fan settings
    savePreset: {
      reducer(state, action) {
        const { id, name, settings } = action.payload;
        state.presets.push({ id, name, settings });
        state.showModal = false;
        state.isOn = settings.power;
        state.speed = settings.speed;
        state.showActions = state.isOn && state.speed > 0;
        state.activePresetId = id;
        state.activeTab = "savedPreset";
      },
      prepare(name, settings) {
        return { payload: { id: crypto.randomUUID(), name, settings } };
      },
    },

    applyPreset: (state, action) => {
      const preset = action.payload;
      if (preset) {
        state.isOn = preset.settings.power;
        state.speed = preset.settings.speed;
        state.showActions = state.isOn && state.speed > 0;
        state.activePresetId = preset.id;
        state.activeTab = "savedPreset";
      }
    },
  }
);

const fanSlice = createSlice({
  name: "fan",
  initialState: baseInitialState,
  reducers: baseReducers,
});

export const {
  togglePower,
  setSpeed,
  clearFan,
  openModal,
  closeModal,
  savePreset,
  applyPreset,
  setActiveTab,
} = fanSlice.actions;

export default fanSlice.reducer;

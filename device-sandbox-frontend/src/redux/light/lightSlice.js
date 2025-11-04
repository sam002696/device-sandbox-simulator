import { createSlice } from "@reduxjs/toolkit";
import { createDeviceBase } from "../shared/deviceSliceBase";

const { baseInitialState, baseReducers } = createDeviceBase(
  {
    brightness: 0,
    color: "#FFD580",
  },
  {
    togglePower: (state) => {
      state.isOn = !state.isOn;
      if (!state.isOn) {
        state.brightness = 0;
        state.showActions = false;
      }
    },
    setBrightness: (state, action) => {
      state.brightness = action.payload;
      state.showActions = state.isOn && state.brightness > 0;
    },
    setColor: (state, action) => {
      state.color = action.payload;
      state.showActions = state.isOn && state.brightness > 0;
    },
    clearLight: (state) => {
      state.isOn = false;
      state.brightness = 0;
      state.showActions = false;
      state.activePresetId = null;
    },

    savePreset: {
      reducer(state, action) {
        const { id, name, settings } = action.payload;
        state.presets.push({ id, name, settings });
        state.showModal = false;
        state.isOn = settings.power;
        state.brightness = settings.brightness;
        state.color = settings.color;
        state.showActions = state.isOn && state.brightness > 0;
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
        state.brightness = preset.settings.brightness;
        state.color = preset.settings.color;
        state.showActions = state.isOn && state.brightness > 0;
        state.activePresetId = preset.id;
        state.activeTab = "savedPreset";
      }
    },
  }
);

const lightSlice = createSlice({
  name: "light",
  initialState: baseInitialState,
  reducers: baseReducers,
});

export const {
  togglePower,
  setBrightness,
  setColor,
  clearLight,
  openModal,
  closeModal,
  savePreset,
  applyPreset,
  setActiveTab,
} = lightSlice.actions;

export default lightSlice.reducer;

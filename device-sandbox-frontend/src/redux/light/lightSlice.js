// src/redux/light/lightSlice.js
import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  isOn: false,
  brightness: 0,
  color: "#FFD580", // default color (warm white)
  showActions: false,
  showModal: false,
  presets: [],
  activePresetId: null,
  activeTab: "",
  toast: null,
};

const lightSlice = createSlice({
  name: "light",
  initialState,
  reducers: {
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
    openModal: (state) => {
      state.showModal = true;
    },
    closeModal: (state) => {
      state.showModal = false;
    },

    savePreset: {
      reducer(state, action) {
        const { id, name, settings } = action.payload;
        const newPreset = { id, name, settings };
        state.presets.push(newPreset);
        state.showModal = false;

        // Apply new preset instantly
        state.isOn = settings.power;
        state.brightness = settings.brightness;
        state.color = settings.color;
        state.showActions = state.isOn && state.brightness > 0;
        state.activePresetId = id;
        state.activeTab = "savedPreset";
      },
      prepare(name, settings) {
        return {
          payload: {
            id: nanoid(),
            name,
            settings,
          },
        };
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

    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },

    showToast: (state, action) => {
      state.toast = action.payload;
    },
    hideToast: (state) => {
      state.toast = null;
    },
  },
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
  showToast,
  hideToast,
} = lightSlice.actions;

export default lightSlice.reducer;

import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  isOn: false,
  speed: 0,
  showActions: false,
  showModal: false,
  presets: [],
  activePresetId: null,
  activeTab: "",
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

        // push new preset
        const newPreset = { id, name, settings };
        state.presets.push(newPreset);

        // close modal
        state.showModal = false;

        // immediately apply new preset
        state.isOn = settings.power;
        state.speed = settings.speed;
        state.showActions = state.isOn && state.speed > 0;
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
        state.speed = preset.settings.speed;
        state.showActions = state.isOn && state.speed > 0;

        state.activePresetId = preset.id;
        state.activeTab = "savedPreset";
      }
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload; // e.g. "fan" or "savedPreset"
    },
  },
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

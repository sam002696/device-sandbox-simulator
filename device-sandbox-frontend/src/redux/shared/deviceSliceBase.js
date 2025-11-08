import { nanoid } from "@reduxjs/toolkit";

/**
 * Base slice factory for device types (fan, light, etc.)
 * It returns reusable reducers + initial state
 */
export const createDeviceBase = (
  extraInitialState = {},
  customReducers = {}
) => {
  // Defining the base initial state
  const baseInitialState = {
    isOn: false,
    showActions: false,
    showModal: false,
    presets: [],
    activePresetId: null,
    activeTab: "",
    loading: false,
    error: null,
    ...extraInitialState,
  };

  // Defining the base reducers
  const baseReducers = {
    openModal: (state) => {
      state.showModal = true;
    },
    closeModal: (state) => {
      state.showModal = false;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },

    // Saving a new preset
    savePreset: {
      reducer(state, action) {
        const { id, name, settings } = action.payload;
        const newPreset = { id, name, settings };
        state.presets.push(newPreset);
        state.showModal = false;
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

    // Applying a preset
    applyPreset: (state, action) => {
      const preset = action.payload;
      if (preset) {
        state.activePresetId = preset.id;
        state.activeTab = "savedPreset";
      }
    },

    ...customReducers,
  };

  return { baseInitialState, baseReducers };
};

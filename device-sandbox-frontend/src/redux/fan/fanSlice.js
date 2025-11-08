import { createSlice } from "@reduxjs/toolkit";
import { createDeviceBase } from "../shared/deviceSliceBase";
import { getPresets, savePresetOptimistic } from "../shared/presetThunks";

// Creating the base initial state and reducers for the fan device
const { baseInitialState, baseReducers } = createDeviceBase(
  { speed: 0 },
  // Custom reducers for fan device
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
    // Applying a preset
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

  // Handling asynchronous actions for presets
  extraReducers: (builder) => {
    builder
      // Fetching presets for fan device
      .addCase(getPresets("fan").fulfilled, (state, action) => {
        state.presets = action.payload;
      })

      // Optimistic preset saving for fan device
      .addCase(savePresetOptimistic("fan").pending, (state, action) => {
        state.loading = true;
        state.error = null;

        // Extracting relevant data from the action
        const { tempId, name, settings } = action.meta.arg;

        const now = new Date().toISOString();

        // Creating a temporary preset object
        const newPreset = {
          id: tempId,
          name,
          settings,
          isTemp: true,
          createdAt: now,
          type: "fan",   
        };

        // Optimistically adding the new preset
        state.presets = [newPreset, ...state.presets];

        // Applying the temporary preset immediately
        state.isOn = settings.power;
        state.speed = settings.speed;
        state.showActions = state.isOn && state.speed > 0;
        state.activePresetId = tempId;
        state.activeTab = "savedPreset";
      })

      // Handling fulfilled state for optimistic preset saving
      .addCase(savePresetOptimistic("fan").fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Replacing the temporary preset with the one returned from the API
        const { tempId, preset } = action.payload || {};
        if (!preset || !preset.id) return;

        // Finding the index of the temporary preset
        const index = state.presets.findIndex((p) => p.id === tempId);
        if (index !== -1) {
          state.presets[index] = { ...preset, type: preset.type || "fan" };
        }

        // Updating the active preset ID if it was the temporary one
        state.activePresetId = preset.id;
      })

      //  Rollbacking if API fails
      .addCase(savePresetOptimistic("fan").rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Failed to save preset";
        // Removing the temporary preset on failure
        const { tempId } = action.payload || {};
        // Filtering out the temporary preset
        state.presets = state.presets.filter((p) => p.id !== tempId);
        // Resetting activePresetId if it was the temporary preset
        if (state.activePresetId === tempId) state.activePresetId = null;
      });
  },
});

export const {
  togglePower,
  setSpeed,
  clearFan,
  openModal,
  closeModal,
  applyPreset,
  setActiveTab,
} = fanSlice.actions;

export default fanSlice.reducer;

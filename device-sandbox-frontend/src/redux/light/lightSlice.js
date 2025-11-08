import { createSlice } from "@reduxjs/toolkit";
import { createDeviceBase } from "../shared/deviceSliceBase";
import { getPresets, savePresetOptimistic } from "../shared/presetThunks";

const { baseInitialState, baseReducers } = createDeviceBase(
  // Extra initial state for light device
  {
    brightness: 0,
    color: "#FFE5B4",
  },
  {
    togglePower: (state) => {
      state.isOn = !state.isOn;
      if (!state.isOn) {
        state.brightness = 0;
        state.showActions = false;
        state.color = "#FFE5B4";
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
      state.color = "#FFE5B4";
    },

    // Apply preset immediately when user clicks it
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
  // Defining the light slice
  name: "light",
  initialState: baseInitialState,
  reducers: baseReducers,

  // Handling asynchronous actions for presets
  extraReducers: (builder) => {
    builder
      // Fetching presets for light device
      .addCase(getPresets("light").fulfilled, (state, action) => {
        state.presets = action.payload;
      })

      // Optimistic preset saving for light device
      .addCase(savePresetOptimistic("light").pending, (state, action) => {
        state.loading = true;
        state.error = null;
        // Extracting relevant data from the action
        const { tempId, name, settings } = action.meta.arg;

        // Creating a temporary preset object
        const now = new Date().toISOString();
        // Creating temporary preset
        const newPreset = {
          id: tempId,
          name,
          settings,
          isTemp: true,
          createdAt: now,
          type: "light",
        };

        // Optimistically adding the new preset
        state.presets = [newPreset, ...state.presets];

        // Applying the temporary preset immediately
        state.isOn = settings.power;
        state.brightness = settings.brightness;
        state.color = settings.color;
        state.showActions = state.isOn && state.brightness > 0;
        state.activePresetId = tempId;
        state.activeTab = "savedPreset";
      })

      // Handling fulfilled state for optimistic preset saving
      .addCase(savePresetOptimistic("light").fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Replacing the temporary preset with the one returned from the API
        const { tempId, preset } = action.payload || {};
        if (!preset || !preset.id) return;

        // Finding the index of the temporary preset
        const index = state.presets.findIndex((p) => p.id === tempId);
        if (index !== -1) {
          state.presets[index] = { ...preset, type: preset.type || "light" };
        }

        // Keep newly saved preset active
        state.activePresetId = preset.id;
      })

      // Rollbacking failed save
      .addCase(savePresetOptimistic("light").rejected, (state, action) => {
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
  setBrightness,
  setColor,
  clearLight,
  openModal,
  closeModal,
  applyPreset,
  setActiveTab,
} = lightSlice.actions;

export default lightSlice.reducer;

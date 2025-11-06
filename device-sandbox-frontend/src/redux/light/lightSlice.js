import { createSlice } from "@reduxjs/toolkit";
import { createDeviceBase } from "../shared/deviceSliceBase";
import { getPresets, savePresetOptimistic } from "../shared/presetThunks";

const { baseInitialState, baseReducers } = createDeviceBase(
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
  name: "light",
  initialState: baseInitialState,
  reducers: baseReducers,

  extraReducers: (builder) => {
    builder
      // Fetch all presets from backend
      .addCase(getPresets("light").fulfilled, (state, action) => {
        state.presets = action.payload;
      })

      // Optimistic UI: add temp preset at top & activate instantly
      .addCase(savePresetOptimistic("light").pending, (state, action) => {
        state.loading = true;
        state.error = null;
        const { tempId, name, settings } = action.meta.arg;

        const now = new Date().toISOString();
        const newPreset = {
          id: tempId,
          name,
          settings,
          isTemp: true,
          createdAt: now,
        };

        state.presets = [newPreset, ...state.presets];

        // Immediately activate
        state.isOn = settings.power;
        state.brightness = settings.brightness;
        state.color = settings.color;
        state.showActions = state.isOn && state.brightness > 0;
        state.activePresetId = tempId;
        state.activeTab = "savedPreset";
      })

      // Replace temporary with backend preset (keep order)
      .addCase(savePresetOptimistic("light").fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { tempId, preset } = action.payload || {};
        if (!preset || !preset.id) return;

        const index = state.presets.findIndex((p) => p.id === tempId);
        if (index !== -1) {
          state.presets[index] = preset;
        }

        // Keep newly saved preset active
        state.activePresetId = preset.id;
      })

      // Rollbacking failed save
      .addCase(savePresetOptimistic("light").rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Failed to save preset";
        const { tempId } = action.payload || {};
        state.presets = state.presets.filter((p) => p.id !== tempId);
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

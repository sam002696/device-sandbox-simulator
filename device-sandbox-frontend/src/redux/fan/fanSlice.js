import { createSlice } from "@reduxjs/toolkit";
import { createDeviceBase } from "../shared/deviceSliceBase";
import { getPresets, savePresetOptimistic } from "../shared/presetThunks";

const { baseInitialState, baseReducers } = createDeviceBase(
  { speed: 0 },
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

  extraReducers: (builder) => {
    builder
      //  Fetch presets from backend
      .addCase(getPresets("fan").fulfilled, (state, action) => {
        state.presets = action.payload;
      })

      // Optimistic pending: add temp + activate immediately
      .addCase(savePresetOptimistic("fan").pending, (state, action) => {
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
        state.speed = settings.speed;
        state.showActions = state.isOn && state.speed > 0;
        state.activePresetId = tempId;
        state.activeTab = "savedPreset";
      })

      //  Fulfilled: replacing temp with real backend version + keep active
      .addCase(savePresetOptimistic("fan").fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { tempId, preset } = action.payload || {};
        if (!preset || !preset.id) return;

        const index = state.presets.findIndex((p) => p.id === tempId);
        if (index !== -1) {
          state.presets[index] = preset;
        }

        // keep active highlight stable
        state.activePresetId = preset.id;
      })

      //  Rollbacking if API fails
      .addCase(savePresetOptimistic("fan").rejected, (state, action) => {
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
  setSpeed,
  clearFan,
  openModal,
  closeModal,
  applyPreset,
  setActiveTab,
} = fanSlice.actions;

export default fanSlice.reducer;

import { createAsyncThunk } from "@reduxjs/toolkit";
import { createPreset, fetchPresets } from "../api/presetService";

// Fetch presets
export const getPresets = (deviceType) =>
  createAsyncThunk(`${deviceType}/getPresets`, async () => {
    const res = await fetchPresets(deviceType);
    return res.presets || [];
  });

// Save preset
export const savePresetOptimistic = (deviceType) =>
  createAsyncThunk(
    `${deviceType}/savePresetOptimistic`,
    async ({ tempId, name, settings }, { rejectWithValue }) => {
      try {
        const res = await createPreset(deviceType, name, settings);
        return { tempId, preset: res.preset };
      } catch (err) {
        return rejectWithValue({ tempId, error: err.message });
      }
    }
  );

import { createAsyncThunk } from "@reduxjs/toolkit";
import { createPreset, fetchPresets } from "../api/presetService";
import { showToast } from "./toastSlice";
import { closeModal as closeFanModal } from "../../redux/fan/fanSlice";
import { closeModal as closeLightModal } from "../../redux/light/lightSlice";

// Fetch presets (thunk)
export const getPresets = (deviceType) =>
  createAsyncThunk(`${deviceType || "global"}/getPresets`, async () => {
    const res = await fetchPresets(deviceType);
    return res?.presets || [];
  });

// Save preset
export const savePresetOptimistic = (deviceType) =>
  // Thunk for optimistic preset saving
  createAsyncThunk(
    `${deviceType}/savePresetOptimistic`,
    async ({ tempId, name, settings }, { rejectWithValue, dispatch }) => {
      try {
        // Calling the API to create a new preset
        const res = await createPreset(deviceType, name, settings, dispatch);

        // Normalizing the response data
        dispatch(
          showToast({
            message: res?.response?.message,
            type: "success",
            source: deviceType,
          })
        );

        // Closing the modal on successful save
        if (res?.response?.status === "success") {
          if (deviceType === "fan") dispatch(closeFanModal());
          else dispatch(closeLightModal());
        }
        return { tempId, preset: res?.preset };
      } catch (err) {
        // Handling errors and showing toast notification
        dispatch(
          showToast({
            message:
              err?.response?.data?.message ||
              err?.message ||
              "Failed to save preset",
            type: "error",
            source: deviceType,
          })
        );
        // Rejecting with value to handle in extraReducers
        return rejectWithValue({ tempId, error: err.message });
      }
    }
  );

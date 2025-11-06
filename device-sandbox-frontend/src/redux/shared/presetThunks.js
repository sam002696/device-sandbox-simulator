import { createAsyncThunk } from "@reduxjs/toolkit";
import { createPreset, fetchPresets } from "../api/presetService";
import { showToast } from "./toastSlice";
import { closeModal as closeFanModal } from "../../redux/fan/fanSlice";
import { closeModal as closeLightModal } from "../../redux/light/lightSlice";
import { restartDnd } from "../shared/dndSlice";

// Fetch presets
export const getPresets = (deviceType) =>
  createAsyncThunk(`${deviceType || "global"}/getPresets`, async () => {
    const res = await fetchPresets(deviceType);
    return res?.presets || [];
  });

// Save preset
export const savePresetOptimistic = (deviceType) =>
  createAsyncThunk(
    `${deviceType}/savePresetOptimistic`,
    async ({ tempId, name, settings }, { rejectWithValue, dispatch }) => {
      try {
        const res = await createPreset(deviceType, name, settings, dispatch);

        dispatch(
          showToast({
            message: res?.response?.message,
            type: "success",
            source: deviceType,
          })
        );

        if (res?.response?.status === "success") {
          if (deviceType === "fan") dispatch(closeFanModal());
          else dispatch(closeLightModal());
          dispatch(restartDnd());
        }
        return { tempId, preset: res?.preset };
      } catch (err) {
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
        dispatch(restartDnd());
        return rejectWithValue({ tempId, error: err.message });
      }
    }
  );

import axios from "axios";
import { PRESET_SERVICE_API } from "../../services/apiService";

// Fetching presets from the backend
export const fetchPresets = async (type) => {
  const url = type
    ? `${PRESET_SERVICE_API.GET}?type=${type}`
    : PRESET_SERVICE_API.GET;
  const response = await axios.get(url);

  // Normalizing the response data
  const normalized = (response?.data?.data || []).map((p) => ({
    id: p.id,
    name: p.name,
    type: p.device?.type,
    settings: p.device?.settings || {},
    createdAt: p.created_at,
  }));

  return { presets: normalized };
};

export const createPreset = async (type, name, settings) => {
  // Preparing payload for the API request
  const payload = {
    name,
    device: {
      type,
      name: type === "fan" ? "Fan" : "Light",
      settings,
    },
  };

  // Sending POST request to create a new preset
  const response = await axios.post(PRESET_SERVICE_API.CREATE, payload);
  // Normalizing the created preset data
  const preset = response?.data?.data;

  const normalized = {
    id: preset.id,
    name: preset.name,
    type: preset.device?.type,
    settings: preset.device?.settings || {},
    createdAt: preset.created_at,
  };

  return {
    // Returning the normalized preset along with the full response
    preset: normalized,
    response: response?.data,
  };
};

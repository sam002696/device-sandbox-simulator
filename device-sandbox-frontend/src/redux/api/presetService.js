import axios from "axios";
import { PRESET_SERVICE_API } from "../../services/apiService";

export const fetchPresets = async (type) => {
  const response = await axios.get(`${PRESET_SERVICE_API.GET}?type=${type}`);

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
  const payload = {
    name,
    device: {
      type,
      name: type === "fan" ? "Fan" : "Light",
      settings,
    },
  };

  const response = await axios.post(PRESET_SERVICE_API.CREATE, payload);
  const preset = response?.data?.data;

  return {
    preset: {
      id: preset.id,
      name: preset.name,
      type: preset.device?.type,
      settings: preset.device?.settings || {},
      createdAt: preset.created_at,
    },
  };
};

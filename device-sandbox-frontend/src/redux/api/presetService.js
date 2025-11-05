import axios from "axios";
import { PRESET_SERVICE_API } from "../../services/apiService";

export const fetchPresets = async (type) => {
  const response = await axios.get(`${PRESET_SERVICE_API.GET}?type=${type}`);
  return response.data;
};

export const createPreset = async (type, name, settings) => {
  const response = await axios.post(PRESET_SERVICE_API.CREATE, {
    type,
    name,
    settings,
  });
  return response.data;
};

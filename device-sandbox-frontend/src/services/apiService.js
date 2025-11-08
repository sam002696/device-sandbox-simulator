import { UrlBuilder } from "../helpers/UrlBuilder";

// Base URL for the Device Simulator API
export const API_BASE_URL = UrlBuilder.deviceSimulatorApi();

// Preset service API endpoints
export const PRESET_SERVICE_API = {
  GET: `${API_BASE_URL}/presets`,
  CREATE: `${API_BASE_URL}/presets`,
};

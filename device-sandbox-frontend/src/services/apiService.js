import { UrlBuilder } from "../helpers/UrlBuilder";

export const API_BASE_URL = UrlBuilder.deviceSimulatorApi();


export const PRESET_SERVICE_API = {
  GET: `${API_BASE_URL}/presets`,
  CREATE: `${API_BASE_URL}/presets`,
};

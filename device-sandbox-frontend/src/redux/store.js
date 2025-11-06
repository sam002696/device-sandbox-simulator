import { configureStore } from "@reduxjs/toolkit";
import fanReducer from "./fan/fanSlice";
import lightReducer from "./light/lightSlice";
import toastReducer from "./shared/toastSlice";
import globalReducer from "./global/globalSlice";
import dndReducer from "./shared/dndSlice";

const store = configureStore({
  reducer: {
    fan: fanReducer,
    light: lightReducer,
    toast: toastReducer,
    global: globalReducer,
    dnd: dndReducer,
  },
});

export default store;

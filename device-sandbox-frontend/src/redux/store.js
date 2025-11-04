import { configureStore } from "@reduxjs/toolkit";
import fanReducer from "./fan/fanSlice";
import lightReducer from "./light/lightSlice";

const store = configureStore({
  reducer: {
    fan: fanReducer,
    light: lightReducer,
  },
});

export default store;

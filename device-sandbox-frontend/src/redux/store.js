import { configureStore } from "@reduxjs/toolkit";
import fanReducer from "./fan/fanSlice";

const store = configureStore({
  reducer: {
    fan: fanReducer,
  },
});

export default store;

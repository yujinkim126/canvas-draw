import { configureStore } from "@reduxjs/toolkit";
import strokeReducer from "./strokeSlice";
import colorReducer from "./colorSlice";

export const store = configureStore({
  reducer: {
    stroke: strokeReducer,
    color: colorReducer,
  },
});

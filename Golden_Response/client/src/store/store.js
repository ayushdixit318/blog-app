import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import blogReducer from "./blogSlice.js";
import toastReducer from "./toastSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blogs: blogReducer,
    toast: toastReducer
  }
});

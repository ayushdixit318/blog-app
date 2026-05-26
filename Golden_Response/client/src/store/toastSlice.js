import { createSlice, nanoid } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: [],
  reducers: {
    notify: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(message, tone = "success") {
        return { payload: { id: nanoid(), message, tone } };
      }
    },
    dismiss(state, action) {
      return state.filter((toast) => toast.id !== action.payload);
    }
  }
});

export const { dismiss, notify } = toastSlice.actions;
export default toastSlice.reducer;

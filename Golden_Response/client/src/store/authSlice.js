import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http, { getErrorMessage } from "../api/http.js";

export const fetchMe = createAsyncThunk("auth/me", async (_, { rejectWithValue }) => {
  try {
    const { data } = await http.get("/auth/me");
    return data.user;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const login = createAsyncThunk("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await http.post("/auth/login", payload);
    return data.user;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const register = createAsyncThunk("auth/register", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await http.post("/auth/register", payload);
    return data.user;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const googleLogin = createAsyncThunk("auth/google", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await http.post("/auth/google", payload);
    return data.user;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await http.post("/auth/logout");
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    bootstrapped: false,
    error: null
  },
  reducers: {
    clearCredentials(state) {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loading = false;
        state.bootstrapped = true;
        state.user = action.payload;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.loading = false;
        state.bootstrapped = true;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addMatcher(
        (action) =>
          [login.pending.type, register.pending.type, googleLogin.pending.type, logout.pending.type].includes(
            action.type
          ),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => [login.fulfilled.type, register.fulfilled.type, googleLogin.fulfilled.type].includes(action.type),
        (state, action) => {
          state.loading = false;
          state.user = action.payload;
        }
      )
      .addMatcher(
        (action) =>
          [login.rejected.type, register.rejected.type, googleLogin.rejected.type, logout.rejected.type].includes(
            action.type
          ),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  }
});

export const { clearCredentials } = authSlice.actions;
export default authSlice.reducer;

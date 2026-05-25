import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http, { getErrorMessage } from "../api/http.js";

export const fetchBlogs = createAsyncThunk("blogs/list", async (params = {}, { rejectWithValue }) => {
  try {
    const { data } = await http.get("/blogs", { params });
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchMine = createAsyncThunk("blogs/mine", async (_, { rejectWithValue }) => {
  try {
    const { data } = await http.get("/blogs/mine");
    return data.items;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    items: [],
    mine: [],
    total: 0,
    page: 1,
    pages: 1,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(fetchMine.fulfilled, (state, action) => {
        state.loading = false;
        state.mine = action.payload;
      })
      .addMatcher(
        (action) => [fetchBlogs.pending.type, fetchMine.pending.type].includes(action.type),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => [fetchBlogs.rejected.type, fetchMine.rejected.type].includes(action.type),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  }
});

export default blogSlice.reducer;

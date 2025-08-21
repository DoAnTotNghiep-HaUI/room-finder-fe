import { BlogParams } from "@/types/blog";
import { IRoom, RoomDetailParams } from "@/types/room";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getListBlog } from "./action";

const initialState: BlogParams = {
  isLoading: false,
  errorMessage: "",
  blogList: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getListBlog.fulfilled, (state, action) => {
        state.blogList = action.payload;

        state.isLoading = false;
      })
      .addCase(getListBlog.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export const {} = blogSlice.actions;

export default blogSlice.reducer;

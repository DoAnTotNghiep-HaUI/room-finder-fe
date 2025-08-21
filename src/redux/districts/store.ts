import { IRoom, RoomDetailParams } from "@/types/room";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getListDistrict } from "./action";

const initialState = {
  isLoading: false,
  errorMessage: "",
  districtList: null,
};

const districtsSlice = createSlice({
  name: "districts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListDistrict.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getListDistrict.fulfilled, (state, action) => {
        state.districtList = action.payload;

        state.isLoading = false;
      })
      .addCase(getListDistrict.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export const {} = districtsSlice.actions;

export default districtsSlice.reducer;

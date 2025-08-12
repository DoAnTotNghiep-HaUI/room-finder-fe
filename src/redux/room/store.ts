import {  RoomParams } from "@/types/room";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getListRoom } from "./action";

const initialState: RoomParams = {
  isLoading: false,
  errorMessage: "",
  roomList: null,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoomList: (state, action: PayloadAction<any>) => {
      state.roomList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getListRoom.fulfilled, (state, action) => {
        state.roomList = action.payload;

        state.isLoading = false;
      })
      .addCase(getListRoom.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export const { setRoomList } = roomSlice.actions;

export default roomSlice.reducer;

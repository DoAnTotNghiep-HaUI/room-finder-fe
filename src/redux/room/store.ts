import { RoomParams } from "@/types/room";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getListRoom, getRoomCheapPrice, getRoomNewPost } from "./action";

const initialState: RoomParams = {
  isLoading: false,
  errorMessage: "",
  roomList: null,
  roomNewPost: null,
  roomCheapPrice: null,
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
      })
      .addCase(getRoomNewPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRoomNewPost.fulfilled, (state, action) => {
        state.roomNewPost = action.payload;

        state.isLoading = false;
      })
      .addCase(getRoomNewPost.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getRoomCheapPrice.fulfilled, (state, action) => {
        state.roomCheapPrice = action.payload;
        state.isLoading = false;
      });
  },
});
export const { setRoomList } = roomSlice.actions;

export default roomSlice.reducer;

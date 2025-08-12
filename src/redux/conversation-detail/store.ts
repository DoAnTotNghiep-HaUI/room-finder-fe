import { RoomParams } from "@/types/room";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { ConversationDetailParam } from "@/types/chat";

import { getConversationById } from "./action";

const initialState: ConversationDetailParam = {
  isLoading: false,
  error: "",
  conversation: null,
};
const conversationDetailSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getConversationById.fulfilled, (state, action) => {
      state.conversation = action.payload;
      state.isLoading = false;
    });
  },
});

export default conversationDetailSlice.reducer;

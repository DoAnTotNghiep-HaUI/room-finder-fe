import { RoomParams } from "@/types/room";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import {
  ChatState,
  ConversationDetailParam,
  ConversationParam,
} from "@/types/chat";
import { createConversation } from "@/services/chatService";
import { getMessagesByConversationId } from "../message/action";
import { getConversationById } from "./action";

// const initialState: ChatState = {
//   isLoading: false,
//   error: "",
//   activeConversations: [],
//   conversations: [],
//   messages: {},
//   users: null,
//   currentUser: null,
// };
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
// export const {
//   addConversationId,
//   clearConversationList,
//   removeConversationId,
// } = conversationSlice.actions;
export default conversationDetailSlice.reducer;

import { RoomParams } from "@/types/room";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { checkConversationExists, getListConversationByUserId } from "./action";
import { ChatState, ConversationParam } from "@/types/chat";
import { createConversation } from "@/services/chatService";
import { getMessagesByConversationId } from "../message/action";

// const initialState: ChatState = {
//   isLoading: false,
//   error: "",
//   activeConversations: [],
//   conversations: [],
//   messages: {},
//   users: null,
//   currentUser: null,
// };
const initialState: ConversationParam = {
  isLoading: false,
  error: "",
  conversations: [],
  currentConversationId: null,
};
const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setConversationId(state, action: PayloadAction<string>) {
      // if (!state.conversationListId?.includes(action.payload)) {
      //   state.conversationListId?.push(action.payload);
      // }
      state.currentConversationId = action.payload;
    },
    // removeConversationId(state, action: PayloadAction<string>) {
    //   state.conversationListId = state.conversationListId.filter(
    //     (id) => id !== action.payload
    //   );
    // },
    clearConversationList(state) {
      state.currentConversationId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkConversationExists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkConversationExists.fulfilled, (state, action) => {
        state.conversations = action.payload;

        state.isLoading = false;
      })
      .addCase(checkConversationExists.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getListConversationByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getListConversationByUserId.fulfilled, (state, action) => {
        state.conversations = action.payload;

        state.isLoading = false;
      });
  },
});
export const {
  setConversationId,
  clearConversationList,
  // removeConversationId,
} = conversationSlice.actions;
export default conversationSlice.reducer;

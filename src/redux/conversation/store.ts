import { RoomParams } from "@/types/room";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import {
  checkConversationExists,
  createConversation,
  getListConversationByUserId,
  openChatWithUser,
} from "./action";
import { ChatState, ConversationParam, IConversation } from "@/types/chat";
import { getMessagesByConversationId } from "../message/action";
import { IMessage } from "@/types/messages";

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
  tempConversation: {
    partnerId: null,
    isOpen: false,
  },
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
    setConversationList(state, action: PayloadAction<IConversation[]>) {
      state.conversations = action.payload;
    },
    // removeConversationId(state, action: PayloadAction<string>) {
    //   state.conversationListId = state.conversationListId.filter(
    //     (id) => id !== action.payload
    //   );
    // },
    clearConversationList(state) {
      state.currentConversationId = null;
    },
    openTempConversation: (state, action: PayloadAction<string>) => {
      state.tempConversation = {
        partnerId: action.payload,
        isOpen: true,
      };
      state.currentConversationId = null;
    },

    // Hàm đóng conversation tạm
    closeTempConversation: (state) => {
      state.tempConversation = {
        partnerId: null,
        isOpen: false,
      };
    },

    // Khi conversation thật được tạo (sau khi gửi tin nhắn đầu tiên)
    confirmTempConversation: (state, action: PayloadAction<string>) => {
      state.currentConversationId = action.payload;
      state.tempConversation = {
        partnerId: null,
        isOpen: false,
      };
    },
    // Thêm reducer xử lý tin nhắn từ socket
    //Thử trước sau này sửa lại type cho payloadAction
    addSocketMessage: (state, action: PayloadAction<any>) => {
      const { conversationId } = action.payload;

      if (!state.conversations.some((c) => c.id === conversationId)) {
        // Nếu là tin nhắn đầu tiên của conversation mới
        state.conversations.push({
          id: conversationId,
          participants: [], // Sẽ được cập nhật sau
          last_message: action.payload,
          unread_count: 1,
          isTyping: false,
        });
      }
    },
    setConversationUpdated: (state, action: PayloadAction<IConversation>) => {
      const idx = state.conversations.findIndex(
        (c) => c.id === action.payload.id
      );
      if (idx !== -1) {
        state.conversations[idx] = action.payload;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(openChatWithUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(openChatWithUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // Không cần làm gì thêm vì đã dispatch các action tương ứng trong thunk
      })
      .addCase(openChatWithUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(checkConversationExists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkConversationExists.fulfilled, (state, action) => {
        state.conversations = action.payload.map(
          (conversation: IConversation) => ({
            ...conversation,
          })
        );

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
      })
      .addCase(createConversation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createConversation.fulfilled, (state, action) => {
        state.isLoading = false;
      });
  },
});
export const {
  setConversationId,
  clearConversationList,
  // removeConversationId,
  openTempConversation,
  closeTempConversation,
  confirmTempConversation,
  setConversationUpdated,
} = conversationSlice.actions;
export default conversationSlice.reducer;

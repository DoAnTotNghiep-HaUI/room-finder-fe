import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "@/types/chat";

interface ChatSocketState {
  typingUsers: Record<string, string[]>; // { [conversationId]: userId[] }
}

const initialState: ChatSocketState = {
  typingUsers: {},
};

const chatSocketSlice = createSlice({
  name: "chatSocket",
  initialState,
  reducers: {
    receiveMessage: (state, action: PayloadAction<Message>) => {
      // Xử lý này sẽ được thực hiện trong conversation slice
    },
    setTyping: (
      state,
      action: PayloadAction<{
        conversationId: string;
        userId: string;
        isTyping: boolean;
      }>
    ) => {
      const { conversationId, userId, isTyping } = action.payload;

      if (isTyping) {
        state.typingUsers[conversationId] = [
          ...(state.typingUsers[conversationId] || []).filter(
            (id) => id !== userId
          ),
          userId,
        ];
      } else {
        state.typingUsers[conversationId] = (
          state.typingUsers[conversationId] || []
        ).filter((id) => id !== userId);
      }
    },
  },
  extraReducers: (builder) => {
    // Có thể thêm các extra reducers nếu cần
  },
});

export const { receiveMessage, setTyping } = chatSocketSlice.actions;
export default chatSocketSlice.reducer;

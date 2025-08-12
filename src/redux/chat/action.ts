import { IMessage } from "@/types/messages";
import { getSocket } from "@/utils/socket";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const socketSendMessage = createAsyncThunk(
  "chatSocket/sendMessage",
  async (message: Partial<IMessage>, { getState }) => {
    const socket = getSocket();
    socket.emit("sendMessage", message);
    return message; // Optimistic update
  }
);

export const socketTyping = createAsyncThunk(
  "chatSocket/typing",
  async (data: { conversationId: string; userId: string }, { getState }) => {
    const socket = getSocket();
    socket.emit("typing", data);
    return data;
  }
);
export const socketStopTyping = createAsyncThunk(
  "chatSocket/stopTyping",
  async (data: { conversationId: string; userId: string }, { getState }) => {
    const socket = getSocket();
    socket.emit("stopTyping", data);
    return { ...data, isTyping: false };
  }
);
export const receiveSocketMessage = (message: IMessage) => ({
  type: "chatSocket/receiveMessage",
  payload: message,
});

export const setUserTyping = (data: {
  conversationId: string;
  userId: string;
  isTyping: boolean;
}) => ({
  type: "chatSocket/setTyping",
  payload: data,
});
export const initializeSocketConnection = createAsyncThunk(
  "chatSocket/initialize",
  async (userId: string, { dispatch }) => {
    const socket = getSocket();

    return new Promise<void>((resolve) => {
      socket.on("newMessage", (message: IMessage) => {
        dispatch(receiveSocketMessage(message));
      });

      //   socket.on(
      //     "userTyping",
      //     (data: { conversationId: string; userId: string }) => {
      //       dispatch(setUserTyping({ ...data, isTyping: true }));
      //     }
      //   );

      //   socket.on(
      //     "userStopTyping",
      //     (data: { conversationId: string; userId: string }) => {
      //       dispatch(setUserTyping({ ...data, isTyping: false }));
      //     }
      //   );

      resolve();
    });
  }
);

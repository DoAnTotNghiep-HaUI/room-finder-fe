"use client";

import type React from "react";
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  useCallback,
} from "react";
import type {
  ChatState,
  ChatWindowState,
  IConversation,
  Message,
} from "../types/chat";
import { initialChatState } from "../utils/mock-data";
import { IUser } from "@/types/user";
import { useSelector } from "react-redux";
import { AppState } from "@/redux";

type ChatAction =
  | { type: "SET_ACTIVE_CONVERSATION"; conversationId: string }
  | { type: "CLOSE_CONVERSATION"; conversationId: string }
  | { type: "SEND_MESSAGE"; message: Message }
  | { type: "MARK_AS_READ"; conversationId: string }
  | { type: "SET_TYPING"; conversationId: string; isTyping: boolean };

interface ChatContextType {
  state: ChatState;
  dispatch: React.Dispatch<ChatAction>;
  getConversationPartner: (conversation: IConversation) => any;
  getUnreadCount: () => number;
  openChatWindow: (conversationId: number, ownerId: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { messageList } = useSelector((state: AppState) => state.message);
  const { userInfo } = useSelector((state: AppState) => state.auth);
  const [chatWindows, setChatWindows] = useState<ChatWindowState[]>([]);

  const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
    switch (action.type) {
      case "SET_ACTIVE_CONVERSATION": {
        // If conversation is already active, do nothing
        if (state.activeConversations.includes(action.conversationId)) {
          return state;
        }

        // Add conversation to active conversations (max 3)
        const activeConversations = [
          ...state.activeConversations,
          action.conversationId,
        ];
        if (activeConversations.length > 3) {
          activeConversations.shift(); // Remove oldest conversation
        }

        return {
          ...state,
          activeConversations,
        };
      }

      case "CLOSE_CONVERSATION": {
        return {
          ...state,
          activeConversations: state.activeConversations.filter(
            (id) => id !== action.conversationId
          ),
        };
      }

      case "SEND_MESSAGE": {
        const { message } = action;
        const conversationId =
          state.conversations.find(
            (c) =>
              c.participants.some(
                (participant) => participant.id === message.senderId
              ) &&
              c.participants.some(
                (participant) => participant.id === message.receiverId
              )
          )?.id || "";

        if (!conversationId) return state;

        const updatedMessages = {
          ...state.messages,
          [conversationId]: [
            ...(state.messages[conversationId] || []),
            message,
          ],
        };

        const updatedConversations = state.conversations.map((conv) => {
          if (conv.id === conversationId) {
            return {
              ...conv,
              lastMessage: message,
              unreadCount:
                message.senderId === state.currentUser.id
                  ? 0
                  : conv.unread_count + 1,
            };
          }
          return conv;
        });

        return {
          ...state,
          messages: updatedMessages,
          conversations: updatedConversations,
        };
      }

      case "MARK_AS_READ": {
        const updatedConversations = state.conversations.map((conv) => {
          if (conv.id === action.conversationId) {
            return {
              ...conv,
              unreadCount: 0,
            };
          }
          return conv;
        });

        const updatedMessages = {
          ...state.messages,
          [action.conversationId]: (
            state.messages[action.conversationId] || []
          ).map((msg) => ({
            ...msg,
            isRead: true,
          })),
        };

        return {
          ...state,
          conversations: updatedConversations,
          messages: updatedMessages,
        };
      }

      case "SET_TYPING": {
        const updatedConversations = state.conversations.map((conv) => {
          if (conv.id === action.conversationId) {
            return {
              ...conv,
              isTyping: action.isTyping,
            };
          }
          return conv;
        });

        return {
          ...state,
          conversations: updatedConversations,
        };
      }

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, initialChatState);

  // Helper function to get the other participant in a conversation
  const getConversationPartner = (conversation: IConversation) => {
    return conversation.participants.find(
      (participant) => participant.id !== userInfo?.id
    ) as any;
  };

  // Helper function to get total unread count
  const getUnreadCount = (): number => {
    return state.conversations.reduce(
      (count, conv) => count + conv.unread_count,
      0
    );
  };
  const openChatWindow = useCallback(
    async (conversationId: number, ownerId: string) => {
      // Check if chat window is already open
      const existingWindow = chatWindows.find(
        (window) => window.conversationId === conversationId
      );
      if (existingWindow) {
        setChatWindows((prev) =>
          prev.map((window) =>
            window.conversationId === conversationId
              ? { ...window, isMinimized: false }
              : window
          )
        );
        return;
      }

      // Create new chat window
      const newWindow: ChatWindowState = {
        conversationId,
        isOpen: true,
        isMinimized: false,
        messages: [],
        isLoading: true,
      };

      setChatWindows((prev) => [...prev, newWindow]);

      // Load messages
      try {
        setChatWindows((prev) =>
          prev.map((window) =>
            window.conversationId === conversationId
              ? { ...window, messageList, isLoading: false }
              : window
          )
        );
      } catch (error) {
        console.error("Failed to load messages:", error);
        setChatWindows((prev) =>
          prev.map((window) =>
            window.conversationId === conversationId
              ? { ...window, isLoading: false }
              : window
          )
        );
      }
    },
    [chatWindows]
  );
  // Simulate receiving a message after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        senderId: "user-2",
        receiverId: "user-1",
        content: "Are you still interested in viewing the apartment?",
        timestamp: new Date(),
        isRead: false,
      };

      dispatch({ type: "SEND_MESSAGE", message: newMessage });
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        state,
        dispatch,
        getConversationPartner,
        getUnreadCount,
        openChatWindow,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

import { Message, ChatUser } from "@/types/messages";

const conversations: { [key: string]: Message[] } = {};

export const checkConversationExists = (
  userId: string,
  landlordId: string
): boolean => {
  const conversationKey = `${userId}-${landlordId}`;
  return conversations.hasOwnProperty(conversationKey);
};

export const createConversation = (
  userId: string,
  landlordId: string
): string => {
  const conversationKey = `${userId}-${landlordId}`;
  conversations[conversationKey] = [];
  return conversationKey;
};

export const sendMessage = (
  userId: string,
  landlordId: string,
  content: string
): void => {
  const conversationKey = `${userId}-${landlordId}`;
  if (!checkConversationExists(userId, landlordId)) {
    createConversation(userId, landlordId);
  }
  const message: Message = {
    id: Date.now().toString(),
    senderId: userId,
    content,
    timestamp: new Date().toISOString(),
    type: "text",
    reactions: [],
  };
  conversations[conversationKey].push(message);
};

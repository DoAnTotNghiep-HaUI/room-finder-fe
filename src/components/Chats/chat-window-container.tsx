import { ChatUser, Message } from "@/types/messages";
import React from "react";
import { ChatWindow } from "./chat-window";

interface ChatWindowContainerProps {
  activeChats: {
    user: ChatUser;
    messages: Message[];
    isTyping?: boolean;
  }[];
  onClose: (userId: string) => void;
  onMinimize: (userId: string) => void;
  onSendMessage: (
    userId: string,
    content: string,
    type: "text" | "image" | "link"
  ) => void;
}
export const ChatWindowContainer: React.FC<ChatWindowContainerProps> = ({
  activeChats,
  onClose,
  onMinimize,
  onSendMessage,
}) => {
  return (
    <div className="fixed bottom-0 right-0 z-40 flex items-end space-x-4 px-4">
      {activeChats.map((chat, index) => (
        <ChatWindow
          key={chat.user.id}
          user={chat.user}
          messages={chat.messages}
          isTyping={chat.isTyping}
          onClose={() => onClose(chat.user.id)}
          onMinimize={() => onMinimize(chat.user.id)}
          onSendMessage={(content, type) =>
            onSendMessage(chat.user.id, content, type)
          }
          style={{
            zIndex: activeChats.length - index,
          }}
        />
      ))}
    </div>
  );
};

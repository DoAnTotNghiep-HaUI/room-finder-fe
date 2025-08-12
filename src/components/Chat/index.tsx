import { ChatProvider } from "@/context/chat-context";
import type React from "react";
import ChatIcon from "./chat-icon";
import ChatContainer from "./chat-container";

const ChatWindowContainer: React.FC = () => {
  return (
    <ChatProvider>
      <ChatContainer />
      <ChatIcon />
    </ChatProvider>
  );
};

export default ChatWindowContainer;

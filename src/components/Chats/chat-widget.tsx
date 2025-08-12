import { ChatUser, Message } from "@/types/messages";
import React, { useEffect, useState, useRef } from "react";
import { LuMaximize2, LuMessageCircle, LuMinimize2 } from "react-icons/lu";
import { ChatOptions } from "./chat-option";
import { FaFacebookMessenger, FaSmile } from "react-icons/fa";
import { BiImage, BiPaperclip, BiSend, BiX } from "react-icons/bi";
import { HiExternalLink } from "react-icons/hi";
import { MessageBubble } from "./message-bubble";
interface ChatWidgetProps {
  isOpen: boolean;
  toggleChat: () => void;
  messages: Message[];
  selectedUser: ChatUser | null;
  onSendMessage: (content: string, type: "text" | "image" | "link") => void;
}
export const ChatWidget: React.FC<ChatWidgetProps> = ({
  isOpen,
  toggleChat,
  messages,
  selectedUser,
  onSendMessage,
}) => {
  const [message, setMessage] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [showChatOptions, setShowChatOptions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messagesEndRef.current && isOpen && !isMinimized) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages, isOpen, isMinimized]);
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message, "text");
      setMessage("");
    }
  };
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };
  const handleOpenChatOptions = () => {
    setShowChatOptions(true);
  };
  const handleChatOptionSelected = (option: "direct" | "zalo") => {
    setShowChatOptions(false);
    if (option === "zalo") {
      window.open("https://zalo.me/12345678", "_blank");
    }
  };
  if (!isOpen) {
    return (
      <button
        className="fixed bottom-6 right-6 z-50 rounded-full bg-blue-600 p-4 text-white shadow-lg transition-all duration-200 hover:bg-blue-700"
        onClick={toggleChat}
      >
        <LuMessageCircle className="h-6 w-6" />
      </button>
    );
  }
  if (showChatOptions) {
    return (
      <ChatOptions
        onSelect={handleChatOptionSelected}
        onClose={() => setShowChatOptions(false)}
      />
    );
  }
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 rounded-lg bg-white shadow-xl transition-all duration-300 ${isMinimized ? "w-72" : "w-80 sm:w-96"} ${isMinimized ? "h-14" : "h-[30rem] max-h-[calc(100vh-6rem)]"}`}
    >
      {/* Chat Header */}
      <div className="flex items-center justify-between rounded-t-lg bg-blue-600 px-4 py-3 text-white">
        <div className="flex items-center">
          {selectedUser ? (
            <>
              <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-400 font-medium text-white">
                {selectedUser.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-medium">{selectedUser.name}</h3>
                <span className="text-xs text-blue-200">Online</span>
              </div>
            </>
          ) : (
            <h3 className="font-medium">Chat</h3>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {!isMinimized && (
            <button
              className="text-white hover:text-blue-200 focus:outline-none"
              onClick={toggleMinimize}
            >
              <LuMinimize2 className="h-4 w-4" />
            </button>
          )}
          {isMinimized && (
            <button
              className="text-white hover:text-blue-200 focus:outline-none"
              onClick={toggleMinimize}
            >
              <LuMaximize2 className="h-4 w-4" />
            </button>
          )}
          <button
            className="text-white hover:text-blue-200 focus:outline-none"
            onClick={toggleChat}
          >
            <BiX className="h-4 w-4" />
          </button>
        </div>
      </div>
      {!isMinimized && (
        <>
          {/* Chat Messages */}
          <div className="h-[calc(30rem-8rem)] overflow-y-auto p-4">
            {selectedUser ? (
              messages.length > 0 ? (
                messages.map((msg) => (
                  <MessageBubble
                    key={msg.id}
                    message={msg}
                    isOwnMessage={msg.senderId === "user1"}
                  />
                ))
              ) : (
                <div className="flex h-full flex-col items-center justify-center text-gray-500">
                  <FaFacebookMessenger className="mb-2 h-12 w-12" />
                  <p>Start a conversation with {selectedUser.name}</p>
                  <button
                    className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    onClick={handleOpenChatOptions}
                  >
                    Choose Chat Option
                  </button>
                </div>
              )
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-gray-500">
                <FaFacebookMessenger className="mb-2 h-12 w-12" />
                <p>Select a landlord to start chatting</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          {/* Chat Input */}
          {selectedUser && (
            <div className="border-t p-3">
              <form
                onSubmit={handleSendMessage}
                className="flex items-center"
              >
                <button
                  type="button"
                  className="p-2 text-gray-500 hover:text-blue-600 focus:outline-none"
                >
                  <FaSmile className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="p-2 text-gray-500 hover:text-blue-600 focus:outline-none"
                >
                  <BiImage className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="p-2 text-gray-500 hover:text-blue-600 focus:outline-none"
                >
                  <HiExternalLink className="h-5 w-5" />
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mx-2 flex-1 rounded-full border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type a message..."
                />
                <button
                  type="submit"
                  className="rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700 focus:outline-none"
                  disabled={!message.trim()}
                >
                  <BiSend className="h-5 w-5" />
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

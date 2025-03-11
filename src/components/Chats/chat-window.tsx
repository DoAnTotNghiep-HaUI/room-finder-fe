import { ChatUser, Message } from "@/types/messages";
import React, { useEffect, useState, useRef } from "react";
import { BiImage, BiSend, BiSmile, BiX } from "react-icons/bi";
import { BsPaperclip } from "react-icons/bs";
import { FaSmile } from "react-icons/fa";
import { FaImage, FaThumbsUp } from "react-icons/fa6";
import { HiPaperClip } from "react-icons/hi";
import { IoMdSend } from "react-icons/io";
import { LuMinimize2 } from "react-icons/lu";
import Input from "../Input/input";
import { IoAddCircle } from "react-icons/io5";
import { cn } from "@/utils/utils";

interface ChatWindowProps {
  user: ChatUser;
  messages: Message[];
  isTyping?: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onSendMessage: (content: string, type: "text" | "image" | "link") => void;
  onReaction: (messageId: string, reaction: string) => void;
  style?: React.CSSProperties;
}
export const ChatWindow: React.FC<ChatWindowProps> = ({
  user,
  messages,
  isTyping,
  onClose,
  onMinimize,
  onSendMessage,
  onReaction,
  style,
}) => {
  const [message, setMessage] = useState("");
  console.log("message", message);

  const [showReactions, setShowReactions] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message, "text");
      setMessage("");
    }
  };
  const reactions = ["❤️", "👍", "😂", "😮", "😢", "😡"];
  return (
    <div
      className="flex w-80 flex-col rounded-t-lg bg-white shadow-xl"
      style={style}
    >
      {/* Chat Header */}
      <div className="flex items-center justify-between rounded-t-lg bg-gray-100 px-4 py-2">
        <div className="flex items-center">
          <div className="relative">
            <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-300">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-sm font-medium">
                  {user.name.charAt(0)}
                </span>
              )}
            </div>
            <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full border border-white bg-green-500" />
          </div>
          <span className="ml-2 text-sm font-medium">{user.name}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onMinimize}
          >
            <LuMinimize2 className="h-4 w-4" />
          </button>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <BiX className="h-4 w-4" />
          </button>
        </div>
      </div>
      {/* Messages */}
      <div className="max-h-96 flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`group relative ${msg.senderId === "user1" ? "text-right" : "text-left"}`}
          >
            <div
              className={`relative inline-block max-w-[70%] rounded-3xl ${msg.senderId === "user1" ? "bg-blue-600 text-left text-white" : "bg-gray-100 text-right text-gray-900"} px-3 py-2 text-sm`}
              onMouseEnter={() => setShowReactions(msg.id)}
              onMouseLeave={() => setShowReactions(null)}
            >
              {msg.content}
              {showReactions === msg.id && (
                <div className="absolute -top-10 left-0 flex space-x-1 rounded-full bg-white px-2 py-1 shadow-lg">
                  {reactions.map((reaction) => (
                    <button
                      key={reaction}
                      className="transition-transform hover:scale-125"
                      onClick={() => onReaction(msg.id, reaction)}
                    >
                      {reaction}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {msg.reactions?.length > 0 && (
              <div className="mt-1 flex space-x-1 text-xs">
                {msg.reactions.map((reaction, index) => (
                  <span key={index}>{reaction}</span>
                ))}
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
            <span>Typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* Input */}
      <form
        onSubmit={handleSendMessage}
        className={`flex items-center border-t p-3 ${message.trim() ? "justify-between" : "space-x-2"}`}
      >
        {!message.trim() ? (
          <>
            <button
              type="button"
              className="text-blue-600 hover:text-blue-700"
            >
              <BsPaperclip className="h-5 w-5" />
            </button>

            <button
              type="button"
              className="text-blue-600 hover:text-blue-700"
            >
              <FaImage className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="text-blue-600 hover:text-blue-700"
            >
              <FaSmile className="h-5 w-5" />
            </button>
          </>
        ) : (
          <button
            type="button"
            className="text-blue-600 hover:text-blue-700"
          >
            <IoAddCircle className="h-6 w-6" />
          </button>
        )}
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Aa"
          className={cn(
            "rounded-full bg-gray-100 py-2 text-sm focus:outline-none",
            message.trim() ? "w-56" : ""
          )}
        />
        {message.trim() ? (
          <button
            type="submit"
            className={"text-blue-600 hover:text-blue-700"}
          >
            <IoMdSend className="h-5 w-5" />
          </button>
        ) : (
          <button
            type="submit"
            className={"text-blue-600 hover:text-blue-700"}
          >
            <FaThumbsUp className="h-5 w-5" />
          </button>
        )}
      </form>
    </div>
  );
};

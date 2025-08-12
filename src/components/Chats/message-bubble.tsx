import { Message } from "@/types/messages";
import React from "react";
import { LuCheckCheck } from "react-icons/lu";

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
}
export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isOwnMessage,
}) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <div className={`mb-4 max-w-[80%] ${isOwnMessage ? "ml-auto" : "mr-auto"}`}>
      <div
        className={`inline-block rounded-lg px-4 py-2 ${isOwnMessage ? "rounded-br-none bg-blue-600 text-white" : "rounded-bl-none bg-gray-200 text-gray-800"}`}
      >
        {message.type === "text" && <p>{message.content}</p>}
        {message.type === "image" && (
          <div className="h-48 w-48 overflow-hidden rounded">
            <img
              src={message.content}
              alt="Shared image"
              className="h-full w-full object-cover"
            />
          </div>
        )}
        {message.type === "link" && (
          <a
            href={message.content}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-200 underline"
          >
            {message.content}
          </a>
        )}
      </div>
      <div
        className={`mt-1 flex items-center text-xs text-gray-500 ${isOwnMessage ? "justify-end" : "justify-start"}`}
      >
        <span>{formatTime(new Date(message.timestamp))}</span>
        {isOwnMessage && (
          <div className="ml-1 flex items-center">
            <LuCheckCheck
              className={`h-3 w-3 ${message.read ? "text-blue-600" : "text-gray-400"}`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

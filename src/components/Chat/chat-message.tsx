import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import type { User, Message as MessageType } from "../../types/chat";
import { IMessage } from "@/types/messages";
import { URL_IMAGE } from "@/constants";

interface ChatMessageProps {
  message: IMessage;
  isCurrentUser: boolean;
  user: User;
  showTime: boolean;
}
const ChatMessage = React.memo(
  ({ message, isCurrentUser, user, showTime }: ChatMessageProps) => {
    const [showReactions, setShowReactions] = useState(false);
    const getGridClass = (count: number) => {
      if (count === 1) return "grid-cols-1";
      if (count === 2) return "grid-cols-2";
      if (count === 3) return "grid-cols-2";
      return "grid-cols-2";
    };
    // const formattedTime = formatDistanceToNow(new Date(message.date_created), {
    //   addSuffix: true,
    //   includeSeconds: true,
    // });
    const formattedTime = message.date_created
      ? new Date(message.date_created).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "Just now";

    const toggleReactions = () => {
      setShowReactions(!showReactions);
    };

    return (
      <>
        <div
          className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} `}
        >
          {!isCurrentUser && (
            <img
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
              className="mr-2 h-8 w-8 self-end rounded-full"
            />
          )}

          <div className="group relative max-w-[70%]">
            <div
              className={` ${
                isCurrentUser
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white"
              } break-words rounded-2xl px-3 py-2`}
              onClick={toggleReactions}
            >
              {message.content}

              {showReactions && (
                <div className="absolute -top-10 left-0 flex space-x-1 rounded-full bg-white p-1 shadow-lg dark:bg-gray-800">
                  {["👍", "❤️", "😂", "😮", "😢", "😡"].map((reaction) => (
                    <button
                      key={reaction}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {reaction}
                    </button>
                  ))}
                </div>
              )}

              {/* {message.reactions && message.reactions.length > 0 && (
            <div className="absolute -bottom-2 right-2 flex items-center rounded-full bg-white px-1 text-xs shadow-sm dark:bg-gray-800">
              {message.reactions[0]}
              {message.reactions.length > 1 && (
                <span className="ml-1">{message.reactions.length}</span>
              )}
            </div>
          )} */}
            </div>
            {/* 
        <div
          className={`mt-1 text-xs text-gray-500 dark:text-gray-400 ${isCurrentUser ? "text-right" : "text-left"}`}
        >
          {formattedTime}
          {/* {isCurrentUser && message && (
            <span className="ml-1 text-blue-500">✓</span>
          )} 
        </div> */}
            {/* {showTime && ( */}
            <div
              className={` ${isCurrentUser ? "text-right" : "text-left"} duration-900 mb-2 mt-1 hidden text-xs text-gray-500 transition-opacity group-hover:block group-hover:opacity-100`}
            >
              {new Date(message.date_created).toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            {message.attachments && message.attachments.length > 0 && (
              <div
                className={`grid ${getGridClass(message?.attachments.length)} gap-1`}
              >
                {message.attachments.map((file: any, index) => (
                  <div
                    key={file.id}
                    className={`relative ${
                      message.attachments.length === 3 && index === 0
                        ? "row-span-2"
                        : ""
                    }`}
                  >
                    <img
                      src={`${URL_IMAGE}/${file?.id}/${file?.filename_download}`}
                      alt={`Attachment ${index + 1}`}
                      className="h-full w-full rounded object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            )}
            {/* )} */}
          </div>
        </div>
      </>
    );
  }
);

export default ChatMessage;

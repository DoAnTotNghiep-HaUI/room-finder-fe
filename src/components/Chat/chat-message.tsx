import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import type { User, Message as MessageType } from "../../types/chat";
import { IMessage } from "@/types/messages";
import { URL_IMAGE } from "@/constants";
import { cn } from "@/utils/utils";

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

          <div className="group relative flex max-w-[70%] flex-col gap-1">
            {message?.content && (
              <div
                className={cn(
                  "relative inline-block max-w-xs break-words rounded-2xl px-3 py-2",
                  isCurrentUser
                    ? "self-end rounded-full bg-blue-500 text-right text-white"
                    : "self-start rounded-full bg-gray-200 text-left text-black"
                )}
              >
                {message?.content}
                <span
                  className={cn(
                    "absolute whitespace-nowrap text-xs text-gray-500 opacity-0 transition group-hover:opacity-100",
                    isCurrentUser
                      ? "-left-[50px] bottom-[10px]"
                      : "-right-[50px] bottom-[10px]"
                  )}
                >
                  {formattedTime}
                </span>
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
            {/* </div> */}
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
            {/* <div
              className={` ${isCurrentUser ? "text-right" : "text-left"} duration-900 mb-2 mt-1 hidden text-xs text-gray-500 transition-opacity group-hover:block group-hover:opacity-100`}
            >
              {new Date(message.date_created).toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div> */}
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

import { ChatUser } from "@/types/messages";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

interface ChatPanelProps {
  onlineUsers: ChatUser[];
  recentChats: {
    user: ChatUser;
    lastMessage: string;
    timestamp: Date;
    unread: boolean;
  }[];
  onChatSelect: (user: ChatUser) => void;
}
export const ChatPanel: React.FC<ChatPanelProps> = ({
  onlineUsers,
  recentChats,
  onChatSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredChats = recentChats.filter((chat) =>
    chat.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-lg bg-white shadow-xl">
      <div className="border-b p-4">
        <h3 className="mb-2 text-xl font-semibold">Chats</h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Search Messenger"
            className="w-full rounded-full bg-gray-100 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <BiSearch className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
        </div>
      </div>
      <div className="max-h-[400px] overflow-y-auto">
        {filteredChats.map((chat) => (
          <button
            key={chat.user.id}
            className="relative flex w-full items-center space-x-3 px-4 py-3 transition-colors hover:bg-gray-50"
            onClick={() => onChatSelect(chat.user)}
          >
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                {chat.user.avatar ? (
                  <img
                    src={chat.user.avatar}
                    alt={chat.user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-lg font-medium text-gray-600">
                    {chat.user.name.charAt(0)}
                  </span>
                )}
              </div>
              {onlineUsers.some((user) => user.id === chat.user.id) && (
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between">
                <p className="truncate font-medium text-gray-900">
                  {chat.user.name}
                </p>
                <span className="text-xs text-gray-500">
                  {new Date(chat.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="truncate text-sm text-gray-500">
                {chat.lastMessage}
              </p>
            </div>
            {chat.unread && (
              <div className="absolute right-4 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-blue-500" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

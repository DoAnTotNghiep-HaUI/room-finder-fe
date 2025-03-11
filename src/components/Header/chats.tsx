import React, { useState } from "react";
import { FaFacebookMessenger } from "react-icons/fa";

interface ChatProps {
  unreadCount: number;
  chats: any[];
  onChatClick: (id: string) => void;
}
export const Chat: React.FC<ChatProps> = ({
  unreadCount,
  chats,
  onChatClick,
}) => {
  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => {
    setShowChat(!showChat);
  };
  const handleChatClick = (chatId: string) => {
    onChatClick(chatId);
    setShowChat(false);
  };
  return (
    <div className="relative ml-3">
      <button
        className="relative rounded-full bg-[#e1e4e8] bg-gray-300 p-2 text-[#080809] text-gray-600 hover:text-gray-900 focus:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-[#3b3d3e] dark:text-[#e2e5e9]"
        onClick={toggleChat}
      >
        <FaFacebookMessenger className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute right-0 top-0 block flex h-5 w-5 -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
            {unreadCount}
          </span>
        )}
      </button>
      {toggleChat && (
        <div className="absolute right-0 mt-2 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="divide-y divide-gray-100 py-1">
            <div className="flex items-center justify-between bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">
              <span className="text-xl font-semibold">Chats</span>
            </div>
            {chats.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500">No Message</div>
            ) : (
              chats.slice(0, 5).map((chat) => (
                <div
                  key={chat?.id}
                  className={`cursor-pointer px-4 py-3 hover:bg-gray-50 ${!chat?.read ? "bg-blue-50" : ""}`}
                  onClick={() => handleChatClick(chat?.id)}
                >
                  <p className="text-sm font-medium text-gray-900">
                    {chat?.message}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {new Date(chat?.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    · {new Date(chat?.timestamp).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

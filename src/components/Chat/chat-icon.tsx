// import { useChat } from "@/context/chat-context";
import type React from "react";
import { useState, useRef, useEffect } from "react";
import { FiMessageCircle } from "react-icons/fi";
import ChatList from "./chat-list";
import { FaFacebookMessenger } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/redux";
import { getListConversationByUserId } from "@/redux/conversation/action";
import { useChat } from "@/hooks/useChat";

const ChatIcon: React.FC = () => {
  const { fetchConversations } = useChat();
  const { conversations } = useSelector(
    (state: AppState) => state.conversation
  );
  const { userInfo } = useSelector((state: AppState) => state.auth);
  const dispatchAction = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // const unreadCount = getUnreadCount();
  useEffect(() => {
    // dispatchAction(getListConversationByUserId(userInfo?.id));
    fetchConversations();
  }, [userInfo?.id]);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const unreadCount = conversations?.filter(
    (conversation) => conversation.unread_count
  ).length;
  return (
    <div
      className="relative"
      ref={dropdownRef}
    >
      <button
        className="relative rounded-full bg-[#e2e5e9] p-3 text-black transition-colors hover:bg-gray-300 focus:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-[#3b3d3e] dark:text-[#e2e5e9]"
        onClick={toggleDropdown}
        aria-label="Chat"
      >
        <FaFacebookMessenger className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
          <ChatList onSelectConversation={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default ChatIcon;

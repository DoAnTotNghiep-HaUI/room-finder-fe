import React, { useEffect, useState } from "react";
import { Logo } from "./logo";
import { Navigation } from "./navigation";
import { UserProfile } from "./user-profile";
import { BiMenu, BiMessageSquare, BiX } from "react-icons/bi";
import { Notification } from "./notification";
import { Chat } from "./chats";
import { ChatUser, IMessage } from "@/types/messages";
import { ChatPanel } from "../Chats/chat-panel";
import { FaFacebookMessenger } from "react-icons/fa";
import ModalAuth from "../Auth/modal-auth";
import { useSelector } from "react-redux";
import { AppState } from "@/redux";
import ChatWindowContainer from "../Chat";
const mockNotifications = [
  {
    id: "notif1",
    message: "New message from John (Landlord)",
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    read: false,
    messageId: "msg4",
  },
  {
    id: "notif2",
    message: "Sarah (Landlord) has approved your request",
    timestamp: new Date(Date.now() - 7200000),
    read: false,
    messageId: "other1",
  },
  {
    id: "notif3",
    message: "New property matches your search criteria",
    timestamp: new Date(Date.now() - 86400000),
    read: true,
    messageId: "other2",
  },
];

export const Header = () => {
  const { userInfo } = useSelector((state: AppState) => state.auth);
  console.log("userInfo", userInfo);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [chats, setChats] = useState(mockNotifications);
  const [showChatPanel, setShowChatPanel] = useState(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  console.log("userInfo", userInfo);

  useEffect(() => {
    const count = notifications.filter(
      (notification) => !notification.read
    ).length;
    setUnreadCount(count);
  }, [notifications]);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 0) {
  //       setIsScrolled(true);
  //     } else {
  //       setIsScrolled(false);
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);
  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === notificationId
          ? {
              ...notification,
              read: true,
            }
          : notification
      )
    );
  };
  const toggleChatPanel = () => {
    setShowChatPanel(!showChatPanel);
  };
  return (
    <>
      <div className="h-20"></div>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 shadow-md backdrop-blur-sm dark:bg-gray-900/95" : "bg-white dark:bg-gray-900"} ${isDarkMode ? "dark border-gray-700" : "border-gray-200"}`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center">
              <Logo />
            </div>
            <div className="hidden flex-1 items-center justify-center px-8 md:flex">
              <Navigation />
            </div>
            {/* <Chat
                unreadCount={unreadCount}
                chats={chats}
                onChatClick={markNotificationAsRead}
              /> */}
            <div className="flex items-center space-x-4">
              {userInfo ? (
                <>
                  <div className="relative ml-3">
                    {/* <button
                      className="relative rounded-full bg-[#e2e5e9] p-3 text-black hover:bg-gray-300 focus:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-[#3b3d3e] dark:text-[#e2e5e9]"
                      onClick={toggleChatPanel}
                    >
                      <FaFacebookMessenger className="h-5 w-5" />
                      {unreadMessages > 0 && (
                        <span className="absolute right-1 top-1 block flex h-5 w-5 -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                          {unreadMessages}
                        </span>
                      )}
                    </button> */}
                    <ChatWindowContainer />
                    {/* {showChatPanel && (
                      <ChatPanel
                        onlineUsers={onlineUsers}
                        recentChats={recentChats}
                        onChatSelect={(user) => {
                          onChatSelect(user);
                          setShowChatPanel(false);
                        }}
                      />
                     
                    )} */}
                  </div>
                  <Notification
                    unreadCount={unreadCount}
                    notifications={notifications}
                    onNotificationClick={markNotificationAsRead}
                  />
                  <UserProfile user={userInfo} />
                </>
              ) : (
                <ModalAuth />
              )}
              {/* <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
                onClick={toggleMobileMenu}
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <BiX
                    className="block h-6 w-6"
                    aria-hidden="true"
                  />
                ) : (
                  <BiMenu
                    className="block h-6 w-6"
                    aria-hidden="true"
                  />
                )}
              </button> */}
            </div>
          </div>
        </div>
        <div
          className={`transition-all duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? "visible max-h-screen opacity-100" : "invisible max-h-0 opacity-0"}`}
        >
          <div className="space-y-1 border-t bg-white px-2 pb-3 pt-2 dark:border-gray-700 dark:bg-gray-900 sm:px-3">
            <Navigation mobile />
          </div>
        </div>
      </header>
    </>
  );
};

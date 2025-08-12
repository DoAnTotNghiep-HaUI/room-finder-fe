import { ChatWindowContainer } from "@/components/Chats/chat-window-container";
import Footer from "@/components/Footer/footer";
import { Header } from "@/components/Header/header";
import { Navbar } from "@/components/Navbar";
import store, { AppDispatch, AppState, RootState } from "@/redux";
import { refreshToken } from "@/redux/auth/action";
// import { setRefreshToken, setToken, setUserInfo } from "@/redux/auth/store";
import { ChatUser, IMessage, Notification } from "@/types/messages";
import directus from "@/utils/directus";
import { isTokenExpired } from "@/utils/request";
import { cn } from "@/utils/utils";
import { readMe, staticToken } from "@directus/sdk";
import React, { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
// export const mockMessages: IMessage[] = [
//   {
//     id: "msg1",
//     senderId: "user1",
//     receiverId: "landlord1",
//     content: "Hi, is this room still available?",
//     type: "text",
//     timestamp: new Date(Date.now() - 86400000),
//     read: true,
//   },
//   {
//     id: "msg2",
//     senderId: "landlord1",
//     receiverId: "user1",
//     content: "Yes, it is! Would you like to schedule a viewing?",
//     type: "text",
//     timestamp: new Date(Date.now() - 82800000), // 23 hours ago
//     read: true,
//   },
//   {
//     id: "msg3",
//     senderId: "user1",
//     receiverId: "landlord1",
//     content: "That would be great. Is tomorrow afternoon possible?",
//     type: "text",
//     timestamp: new Date(Date.now() - 79200000), // 22 hours ago
//     read: true,
//   },
//   {
//     id: "msg4",
//     senderId: "landlord1",
//     receiverId: "user1",
//     content: "Sure, how about 3 PM?",
//     type: "text",
//     timestamp: new Date(Date.now() - 3600000), // 1 hour ago
//     read: false,
//   },
// ];
export const mockUsers: ChatUser[] = [
  {
    id: "user1",
    name: "You",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "landlord1",
    name: "John (Landlord)",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "landlord2",
    name: "Sarah (Landlord)",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
  },
];

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  // const [scrolled, setScrolled] = useState(false);
  // const { pathname } = useLocation();
  // const { propertyId } = useParams();
  // console.log("pathname", pathname);

  // const isFindRental = () => {
  //   if (
  //     pathname === "/find-rental" ||
  //     pathname === `/propertyId/${propertyId}`
  //   ) {
  //     return true;
  //   }
  //   return false;
  // };
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 1) {
  //       setScrolled(true);
  //     } else {
  //       setScrolled(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  const dispatch = useDispatch<AppDispatch>();
  const { expiresAt, accessToken } = useSelector(
    (state: AppState) => state.auth
  );
  // const [messages, setMessages] = useState<Message[]>(mockMessages);

  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [selectedChat, setSelectedChat] = useState<ChatUser | null>(null);
  // const [activeChats, setActiveChats] = useState<
  //   {
  //     user: ChatUser;
  //     messages: Message[];
  //     isTyping?: boolean;
  //   }[]
  // >([]);
  const [minimizedChats, setMinimizedChats] = useState<string[]>([]);
  const onlineUsers = mockUsers.filter((user) => user.id !== "user1");
  const recentChats = mockUsers
    .filter((user) => user.id !== "user1")
    .map((user) => ({
      user,
      lastMessage: "Hey, is the room still available?",
      timestamp: new Date(),
      unread: Math.random() > 0.5,
    }));

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  // const handleSendMessage = (
  //   content: string,
  //   type: "text" | "image" | "link" = "text"
  // ) => {
  //   const newMessage: Message = {
  //     id: `msg_${Date.now()}`,
  //     senderId: "user1",
  //     receiverId: selectedChat?.id || "landlord1",
  //     content,
  //     type,
  //     timestamp: new Date(),
  //     read: false,
  //   };
  //   setMessages([...messages, newMessage]);
  //   setTimeout(() => {
  //     const replyMessage: Message = {
  //       id: `msg_${Date.now() + 1}`,
  //       senderId: selectedChat?.id || "landlord1",
  //       receiverId: "user1",
  //       content: "Thanks for your message! I'll get back to you shortly.",
  //       type: "text",
  //       timestamp: new Date(),
  //       read: false,
  //     };
  //     const newNotification: Notification = {
  //       id: `notif_${Date.now()}`,
  //       message: `New message from ${selectedChat?.name || "Landlord"}`,
  //       timestamp: new Date(),
  //       read: false,
  //       messageId: replyMessage.id,
  //     };
  //     setMessages((prev) => [...prev, replyMessage]);
  //   }, 2000);
  // };

  // const selectChat = (user: ChatUser) => {
  //   setSelectedChat(user);
  //   setIsChatOpen(true);
  // };
  // const handleChatSelect = (user: ChatUser) => {
  //   if (!activeChats.find((chat) => chat.user.id === user.id)) {
  //     setActiveChats((prev) => [
  //       ...prev,
  //       {
  //         user,
  //         messages: messages.filter(
  //           (msg) =>
  //             (msg.senderId === "user1" && msg.receiverId === user.id) ||
  //             (msg.senderId === user.id && msg.receiverId === "user1")
  //         ),
  //       },
  //     ]);
  //   }
  // };
  // const handleCloseChat = (userId: string) => {
  //   setActiveChats((prev) => prev.filter((chat) => chat.user.id !== userId));
  //   setMinimizedChats((prev) => prev.filter((id) => id !== userId));
  // };
  // const handleMinimizeChat = (userId: string) => {
  //   setMinimizedChats((prev) =>
  //     prev.includes(userId)
  //       ? prev.filter((id) => id !== userId)
  //       : [...prev, userId]
  //   );
  // };
  // const handleReaction = (messageId: string, reaction: string) => {
  //   setMessages((prev) =>
  //     prev.map((msg) =>
  //       msg.id === messageId
  //         ? {
  //             ...msg,
  //             reactions: [...(msg?.reactions || []), reaction],
  //           }
  //         : msg
  //     )
  //   );
  // };
  useEffect(() => {
    if (isTokenExpired(expiresAt)) {
      dispatch(refreshToken());
    }
  }, [accessToken]);

  return (
    <div>
      {/* <Navbar
          className={cn(
            "sm:collapse lg:visible",
            scrolled
              ? "rounded-0 top-0 max-w-full shadow-xl duration-300 ease-out"
              : "duration-300 ease-out",
            isFindRental() ? "static top-0 max-w-full shadow-xl" : ""
          )}
        /> */}
      <Header
      // onChatSelect={handleChatSelect}
      // unreadMessages={messages?.filter((m) => !m?.read).length}
      // onlineUsers={onlineUsers}
      // recentChats={recentChats}
      />

      <main>{children}</main>
      {/* <ChatWindowContainer
        activeChats={activeChats.filter(
          (chat) => !minimizedChats?.includes(chat?.user?.id)
        )}
        onClose={handleCloseChat}
        onMinimize={handleMinimizeChat}
        onSendMessage={handleSendMessage}
      /> */}
      <footer className="bg-gray-900 text-gray-300">
        <Footer />
      </footer>
    </div>
  );
};
export default Layout;

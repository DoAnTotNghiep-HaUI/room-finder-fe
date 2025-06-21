import { useChat } from "@/context/chat-context";
import type React from "react";
import { useState, useRef, useEffect, useMemo } from "react";
import { CiMinimize2 } from "react-icons/ci";
import { FiMaximize2 } from "react-icons/fi";
import ChatMessage from "./chat-message";
import { BiImage, BiX } from "react-icons/bi";
import { HiPaperClip } from "react-icons/hi";
import { FaSmile } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/redux";
import { getMessagesByConversationId } from "@/redux/message/action";
// import { removeConversationId } from "@/redux/conversation/store";
import { URL_IMAGE } from "@/constants";
import avatar from "../../assets/images/Profile_avatar_placeholder_large.png";
import { getConversationById } from "@/redux/conversation-detail/action";
import { clearConversationList } from "@/redux/conversation/store";
interface ChatWindowProps {
  conversationId: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ conversationId }) => {
  const { state, dispatch, getConversationPartner } = useChat();
  const dispatchAction = useDispatch<AppDispatch>();
  const [message, setMessage] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTypingTimeoutSet, setIsTypingTimeoutSet] = useState(false);
  const { userInfo } = useSelector((state: AppState) => state.auth);
  const { currentConversationId, conversations } = useSelector(
    (state: AppState) => state.conversation
  );
  const { conversation } = useSelector(
    (state: AppState) => state.conversationDetail
  );
  // const currentConversationId = conversationListId.find(
  //   (c) => c === conversationId
  // );
  console.log("conversation", conversation);
  console.log("currentConversationId", currentConversationId);
  if (!conversations) return null;
  // const currentConversation = conversations.find((c) => c.id === conversation);

  // const partnerId = currentConversation
  //   ? getConversationPartner(currentConversation)
  //   : null;
  // const partnerId = getConversationPartner(conversations[0]);
  // const partner = getConversationPartner(conversations[0]);
  // const messages = state.messages[conversationId] || [];
  const { messageList } = useSelector((state: AppState) => state.message);
  console.log("messageList", messageList);

  // const handleSendMessage = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!message.trim()) return;

  //   const newMessage = {
  //     id: `msg-${Date.now()}`,
  //     senderId: userInfo?.id,
  //     receiver: userInfo?.id,
  //     content: message,
  //     timestamp: new Date(),
  //     isRead: false,
  //   };

  // dispatch({ type: "SEND_MESSAGE", message: newMessage });
  // setMessage("");

  // Simulate typing indicator from partner
  //   dispatch({ type: "SET_TYPING", conversationId, isTyping: true });

  //   setTimeout(() => {
  //     dispatch({ type: "SET_TYPING", conversationId, isTyping: false });
  //   }, 3000);
  // };

  // const handleClose = () => {
  //   dispatchAction(removeConversationId(conversationId));
  // };
  const handleClose = () => {
    dispatchAction(clearConversationList());
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  // Mark messages as read when chat window is opened
  // useEffect(() => {
  //   dispatch({ type: "MARK_AS_READ", conversationId });
  // }, [conversationId, dispatch]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  // Simulate typing when user is typing
  useEffect(() => {
    let timeout: any | null = null;

    if (message) {
      if (!isTypingTimeoutSet) {
        timeout = setTimeout(() => {
          // In a real app, you would emit a socket event here
        }, 500);
        setIsTypingTimeoutSet(true);
      }
    } else {
      setIsTypingTimeoutSet(false);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [message, isTypingTimeoutSet]);
  useEffect(() => {
    if (conversation) {
      dispatchAction(getMessagesByConversationId(currentConversationId));
    }
  }, [conversation]);
  useEffect(() => {
    dispatchAction(getConversationById(currentConversationId));
  }, [conversationId]);
  // const partner = conversations[0]?.participants?.find(
  //   (participant) => participant.id !== userInfo?.id
  // );
  // const currentConversation = useMemo(() => {
  //   return conversations.find((c) => c.id === conversationId);
  // }, [conversations, conversationId]);

  const partner = useMemo(() => {
    return conversation?.participants?.find(
      (participant) => participant?.directus_users_id?.id !== userInfo?.id
    );
  }, [conversation]);
  console.log("partner", partner);

  return (
    <div
      className={`flex w-80 flex-col rounded-t-lg bg-white shadow-lg dark:bg-gray-800 ${isMinimized ? "h-12" : "h-96"}`}
    >
      {/* Chat header */}
      <div
        className="flex cursor-pointer items-center justify-between border-b bg-white p-2 dark:border-gray-700 dark:bg-gray-800"
        onClick={toggleMinimize}
      >
        <div className="flex items-center">
          <div className="relative">
            <img
              src={
                partner?.directus_users_id?.avatar
                  ? `${URL_IMAGE}/${partner?.directus_users_id?.avatar?.id}/${
                      partner?.directus_users_id?.avatar?.filename_download
                    }`
                  : avatar
              }
              alt={partner?.directus_users_id?.first_name}
              className="h-12 w-12 rounded-full object-cover"
            />
            {/* {partner.isOnline && (
              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full border border-white bg-green-500 dark:border-gray-800"></span>
            )} */}
          </div>
          <div className="ml-2">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {partner?.directus_users_id?.first_name}{" "}
              {partner?.directus_users_id?.last_name}
            </p>
            {/* {partner.isOnline && (
              <p className="text-xs text-green-500">Active now</p>
            )} */}
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {isMinimized ? (
            <FiMaximize2
              size={16}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            />
          ) : (
            <CiMinimize2
              size={16}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            />
          )}
          <BiX
            size={16}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            onClick={handleClose}
          />
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages area */}
          <div className="flex-1 overflow-y-auto bg-white p-3 dark:bg-gray-800">
            <div className="space-y-3">
              {messageList.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  message={msg}
                  isCurrentUser={msg.sender === userInfo?.id}
                  user={userInfo?.id}
                />
              ))}
              {/* {conversations.isTyping && (
                <div className="flex items-center space-x-2">
                  <img
                    src={partner.avatar || "/placeholder.svg"}
                    alt={partner.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <div className="rounded-full bg-gray-200 px-3 py-2 dark:bg-gray-700">
                    <div className="flex space-x-1">
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-gray-500 dark:bg-gray-400"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-gray-500 dark:bg-gray-400"
                        style={{ animationDelay: "200ms" }}
                      ></div>
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-gray-500 dark:bg-gray-400"
                        style={{ animationDelay: "400ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )} */}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message input */}
          <form
            // onSubmit={handleSendMessage}
            className="flex items-center border-t p-3 dark:border-gray-700"
          >
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <HiPaperClip size={20} />
            </button>
            <button
              type="button"
              className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <BiImage size={20} />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Aa"
              className="mx-2 flex-1 rounded-full bg-gray-100 px-3 py-1 focus:outline-none dark:bg-gray-700 dark:text-white"
            />
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <FaSmile size={20} />
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default ChatWindow;

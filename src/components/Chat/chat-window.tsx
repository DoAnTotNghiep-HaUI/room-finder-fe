import type React from "react";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { CiMinimize2 } from "react-icons/ci";
import { FiMaximize2 } from "react-icons/fi";
import ChatMessage from "./chat-message";
import { BiImage, BiX } from "react-icons/bi";
import { HiPaperClip } from "react-icons/hi";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/redux";
import { getMessagesByConversationId } from "@/redux/message/action";
// import { removeConversationId } from "@/redux/conversation/store";
import { URL_IMAGE } from "@/constants";
import avatar from "../../assets/images/Profile_avatar_placeholder_large.png";
import { getConversationById } from "@/redux/conversation-detail/action";
import { clearConversationList } from "@/redux/conversation/store";
import { socketSendMessage } from "@/redux/chat/action";
import { useForm } from "react-hook-form";
import { useChat } from "@/hooks/useChat";
import { disconnectSocket } from "@/utils/socket";
import Input from "../Input/input";
import FileUploadDropzone from "../Input/input-fileupload";
import { IFile } from "@/types/file";
import { updateConversation } from "@/redux/conversation/action";
interface ChatWindowProps {
  conversationId?: string;
  partnerId?: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  conversationId,
  partnerId,
}) => {
  const dispatchAction = useDispatch<AppDispatch>();
  const [files, setFiles] = useState<File[]>([]);
  const [previewFiles, setPreviewFiles] = useState<
    { url: string; file: IFile }[]
  >([]);

  const fileUploadRef = useRef<{ getFiles: () => IFile[] | null }>(null);

  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState<{
    height: number;
    messageId: string;
  } | null>(null);
  const [isTypingTimeoutSet, setIsTypingTimeoutSet] = useState(false);
  const { userInfo } = useSelector((state: AppState) => state.auth);
  const { currentConversationId, conversations } = useSelector(
    (state: AppState) => state.conversation
  );
  const {
    // activeConversation,
    messages,
    hasMoreMessages,
    loadingMore,
    setMessages,
    loadMoreMessages,
    fetchConversations,
    fetchMessages,
    groupMessagesByDate,
    shouldShowTime,
    joinConversation,
    sendMessage,
    sendMediaMessage,
    // setActiveConversation,
  } = useChat();
  const { conversation } = useSelector(
    (state: AppState) => state.conversationDetail
  );
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [isFetching, setIsFetching] = useState(false);
  console.log("conversation", conversation);
  console.log("currentConversationId", currentConversationId);
  if (!conversations) return null;

  const { messageList } = useSelector((state: AppState) => state.message);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const groupedMessages = useMemo(
    () => groupMessagesByDate(messages),
    [messages]
  );
  const { register, handleSubmit, reset } = useForm();

  const handleSendMessage = async ({ message }: { message: string }) => {
    if (!message.trim() && files.length === 0) return;
    try {
      if (files.length > 0) {
        await sendMediaMessage(
          currentConversationId,
          partner?.directus_users_id?.id,
          files,
          message.trim()
        );
      } else {
        await sendMessage(
          currentConversationId,
          message.trim(),
          partner?.directus_users_id.id
        );
      }

      // Reset form only if successful
      reset({ message: "" });
      setFiles([]);
      setPreviewFiles([]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Optionally show error to user
    }
  };
  const handleFilesChange = (newFiles: File[] | null) => {
    if (newFiles) {
      setFiles(newFiles);
    } else {
      setFiles([]);
    }
  };
  const handleClose = () => {
    dispatchAction(clearConversationList());
    disconnectSocket();
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);
  // Simulate typing when user is typing
  // useEffect(() => {
  //   let timeout: any | null = null;

  //   if (message) {
  //     if (!isTypingTimeoutSet) {
  //       timeout = setTimeout(() => {
  //         // In a real app, you would emit a socket event here
  //       }, 500);
  //       setIsTypingTimeoutSet(true);
  //     }
  //   } else {
  //     setIsTypingTimeoutSet(false);
  //   }

  //   return () => {
  //     if (timeout) {
  //       clearTimeout(timeout);
  //     }
  //   };
  // }, [message, isTypingTimeoutSet]);
  useEffect(() => {
    if (currentConversationId) {
      // fetchMessages(currentConversationId);
      joinConversation(currentConversationId);
    }
  }, [currentConversationId, joinConversation]);
  console.log("messages", messages);

  useEffect(() => {
    if (conversation) {
      dispatchAction(getMessagesByConversationId(currentConversationId));
    }
  }, [conversation]);
  useEffect(() => {
    dispatchAction(getConversationById(currentConversationId));
  }, [conversationId]);
  const partner = useMemo(() => {
    return conversation?.participants?.find(
      (participant) => participant?.directus_users_id?.id !== userInfo?.id
    );
  }, [conversation]);
  console.log("partner", partner);
  const handleScroll = useCallback(async () => {
    const container = messagesContainerRef.current;
    if (!container || loadingMore || !hasMoreMessages) return;

    // Lưu vị trí scroll và chiều cao của tin nhắn đầu tiên
    if (container.scrollTop < 100 && messages.length > 0) {
      const firstMessageElement = container.querySelector("[data-message-id]");
      if (firstMessageElement) {
        setScrollPosition({
          height: firstMessageElement.clientHeight,
          messageId: firstMessageElement.getAttribute("data-message-id") || "",
        });
      }

      const result = await loadMoreMessages(conversationId, messages);
      if (result) {
        // Sử dụng setTimeout để đảm bảo DOM đã cập nhật
        setTimeout(() => {
          const container = messagesContainerRef.current;
          if (!container) return;

          // Tìm lại vị trí tin nhắn cũ
          if (scrollPosition) {
            const messageElement = container.querySelector(
              `[data-message-id="${scrollPosition.messageId}"]`
            );
            if (messageElement) {
              // Tính toán vị trí scroll mới
              const newScrollTop =
                messageElement.getBoundingClientRect().top -
                container.getBoundingClientRect().top +
                container.scrollTop -
                scrollPosition.height * 2; // Giữ khoảng cách 2 tin nhắn

              container.scrollTop = newScrollTop;
            }
          }
          setScrollPosition(null);
        }, 0);
      }
    }
  }, [
    conversationId,
    loadMoreMessages,
    loadingMore,
    hasMoreMessages,
    messages,
    scrollPosition,
  ]);

  // Load thêm tin nhắn

  // Thêm event listener scroll
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
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
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto bg-white p-3 dark:bg-gray-800"
          >
            {(isFetching || loadingMore) && (
              <div className="flex justify-center py-2">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
              </div>
            )}
            <div className="space-y-3">
              {/* {messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  message={msg}
                  isCurrentUser={msg.sender === userInfo?.id}
                  user={userInfo?.id}
                />
              ))} */}
              {Object.entries(groupedMessages).map(([date, messages]) => (
                <div
                  key={date}
                  className="message-group"
                >
                  {/* Header ngày */}
                  <div className="relative my-4 text-center">
                    <span className="rounded-xl bg-gray-200 px-2 py-1">
                      {date}
                    </span>
                  </div>

                  {/* Danh sách tin nhắn */}
                  {messages.map((message, index) => (
                    <ChatMessage
                      key={message.id}
                      message={message}
                      showTime={shouldShowTime(messages, index)}
                      isCurrentUser={message.sender === userInfo?.id}
                      user={userInfo?.id}
                    />
                  ))}
                </div>
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
            onSubmit={handleSubmit(handleSendMessage)}
            className="flex items-center border-t p-3 dark:border-gray-700"
            autoComplete="off"
          >
            {/* <input
              {...register("message", { required: true })}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Aa"
              className="mx-2 flex-1 rounded-full bg-gray-100 px-3 py-1 focus:outline-none dark:bg-gray-700 dark:text-white"
            /> */}
            {/* <Input
              {...register("message", { required: true })}
              type="text"
              // value={message}
              // onChange={(e) => setMessage(e.target.value)}
              placeholder="Aa"
              className="flex-1 rounded-full bg-gray-100 px-3 py-1 focus:outline-none dark:bg-gray-700 dark:text-white"
            /> */}
            <FileUploadDropzone
              onFilesChange={handleFilesChange}
              files={files}
            >
              <Input
                {...register("message")}
                type="text"
                // value={message}
                // onChange={(e) => setMessage(e.target.value)}
                placeholder="Aa"
                className="flex-1 rounded-full bg-gray-100 px-3 py-1 focus:outline-none dark:bg-gray-700 dark:text-white"
              />
            </FileUploadDropzone>
            <button
              type="submit"
              className="text-blue-500 hover:text-blue-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <IoSend size={20} />
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default ChatWindow;

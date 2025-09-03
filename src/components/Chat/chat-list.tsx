"use client";

import type React from "react";

import { formatDistanceToNow } from "date-fns";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/redux";
import { useEffect } from "react";
import { getListConversationByUserId } from "@/redux/conversation/action";
import { URL_IMAGE } from "@/constants";
import avatar from "../../assets/images/Profile_avatar_placeholder_large.png";
import { setConversationId } from "@/redux/conversation/store";
import { useChat } from "@/hooks/useChat";
import { cn } from "@/utils/utils";
interface ChatListProps {
  onSelectConversation: () => void;
}

const ChatList: React.FC<ChatListProps> = ({ onSelectConversation }) => {
  const {
    getConversationPartner,
    // conversations,
    getUnreadCount,
    markConversationAsRead,
    joinConversation,
  } = useChat();
  const { conversations } = useSelector(
    (state: AppState) => state.conversation
  );
  const dispatchAction = useDispatch<AppDispatch>();
  const { userInfo } = useSelector((state: AppState) => state.auth);
  const { currentConversationId } = useSelector(
    (state: AppState) => state.conversation
  );
  const handleSelectConversation = async (conversationId: string) => {
    // console.log("conversationId", conversationId);

    // dispatch({ type: "SET_ACTIVE_CONVERSATION", conversationId });
    // dispatch({ type: "MARK_AS_READ", conversationId });
    if (conversationId === currentConversationId) return;
    await joinConversation(conversationId);
    markConversationAsRead(conversationId);
    dispatchAction(setConversationId(conversationId));
    onSelectConversation();
  };
  console.log("conversations", conversations);
  console.log("conversationListId", currentConversationId);

  const formatLastMessageTime = (dateStr?: string) => {
    if (!dateStr) return "Không rõ thời gian";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "Không rõ thời gian";
    return formatDistanceToNow(date, { addSuffix: false });
  };
  return (
    <div className="flex h-full max-h-[400px] flex-col">
      <div className="border-b border-gray-200 p-3 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Chats
        </h2>
      </div>

      <div className="border-b border-gray-200 p-2 dark:border-gray-700">
        <div className="relative">
          <BiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search Messenger"
            className="w-full rounded-full border-0 bg-gray-100 py-2 pl-10 text-sm focus:outline-none dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations?.map((conversation) => {
          // const partnerId = getConversationPartner(conversation);
          // const partner = users[partnerId];
          // const lastMessage =
          //   conversation.lastMessage ||
          //   state.messages[conversation.id]?.[
          //     state.messages[conversation.id].length - 1
          //   ];
          const lastMessage = conversation?.last_message;
          const partner = getConversationPartner(conversation);
          console.log("partner", partner);
          console.log(
            "formatDateTime",
            formatLastMessageTime(String(conversation.date_created))
          );
          console.log("lastmessagetime", conversation.date_created);
          if (!lastMessage) return null;
          return (
            <div
              key={conversation?.id}
              className="flex cursor-pointer items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => handleSelectConversation(conversation?.id)}
            >
              <div className="relative">
                <img
                  src={
                    partner?.directus_users_id?.avatar
                      ? `${URL_IMAGE}/${
                          partner?.directus_users_id?.avatar?.id
                        }/${
                          partner?.directus_users_id?.avatar?.filename_download
                        }`
                      : avatar
                  }
                  alt={partner?.directus_users_id?.first_name}
                  className="h-12 w-12 rounded-full object-cover"
                />

                {/* {partner.isOnline && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-gray-800"></span>
                )} */}
              </div>

              <div className="ml-3 min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="truncate font-medium text-gray-900 dark:text-white">
                    {partner?.directus_users_id?.first_name}{" "}
                    {partner?.directus_users_id?.last_name}
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatLastMessageTime(
                      String(conversation?.last_message_time)
                    )}
                  </span>
                </div>
                <div className="flex items-center">
                  <p
                    className={cn(
                      "flex-1 truncate text-sm dark:text-gray-400",
                      conversation.unread_count
                        ? "font-semibold text-black"
                        : "text-gray-500"
                    )}
                  >
                    {lastMessage?.sender === userInfo?.id ? "Bạn: " : ""}

                    {String(lastMessage?.content)}
                  </p>
                  {conversation.unread_count > 0 && (
                    <span className="ml-2 h-3 w-3 rounded-full bg-blue-500"></span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatList;

import { useChat } from "@/context/chat-context";
import type React from "react";
import ChatWindow from "./chat-window";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/redux";
import { useEffect } from "react";
import { checkConversationExists } from "@/redux/conversation/action";
import { useParams } from "react-router-dom";
import TempChatWindow from "./temp-chat-window";
import {
  closeTempConversation,
  confirmTempConversation,
} from "@/redux/conversation/store";

const ChatContainer: React.FC = () => {
  const { conversations, currentConversationId, tempConversation } =
    useSelector((state: AppState) => state.conversation);
  const { userInfo } = useSelector((state: AppState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const { userId2 } = useParams();
  const { state } = useChat();
  // const { activeConversations } = state;

  useEffect(() => {
    dispatch(
      checkConversationExists({
        userId1: userInfo?.id,
        userId2: userId2,
      })
    );
  }, []);
  console.log("conversation", conversations);

  // if (conversationListId.length === 0) return null;

  return (
    <div className="fixed bottom-0 right-4 z-40 flex space-x-4">
      {/* {conversationListId.map((conversationId) => ( */}
      {currentConversationId && (
        <ChatWindow
          // key={conversationId}
          conversationId={currentConversationId}
        />
      )}
      {tempConversation.isOpen && (
        <TempChatWindow
          partnerId={tempConversation.partnerId!}
          onClose={() => dispatch(closeTempConversation())}
          onConfirm={(conversationId) =>
            dispatch(confirmTempConversation(conversationId))
          }
        />
      )}
      {/* ))} */}
    </div>
  );
};

export default ChatContainer;

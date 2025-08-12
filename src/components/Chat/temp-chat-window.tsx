import { URL_IMAGE } from "@/constants";
import { AppDispatch, AppState } from "@/redux";
import React, { useEffect, useState } from "react";
import { BiImage, BiLock, BiX } from "react-icons/bi";
import { FiMaximize2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../../assets/images/Profile_avatar_placeholder_large.png";
import { HiPaperClip } from "react-icons/hi";
import { FaSmile } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import {
  checkConversationExists,
  createConversation,
} from "@/redux/conversation/action";
import { useChat } from "@/hooks/useChat";
import { setConversationId } from "@/redux/conversation/store";
import { useForm } from "react-hook-form";
import FileUploadDropzone from "../Input/input-fileupload";
import Input from "../Input/input";
import { getSocket, initializeSocket } from "@/utils/socket";
import { IConversation } from "@/types/chat";

interface TempChatWindowProps {
  partnerId: string;
  onClose: () => void;
  onConfirm: (conversationId: string) => void;
}

const TempChatWindow: React.FC<TempChatWindowProps> = ({
  partnerId,
  onClose,
  onConfirm,
}) => {
  const [message, setMessage] = useState("");
  const { userInfo } = useSelector((state: AppState) => state.auth);
  const roomDetail = useSelector((state: AppState) => state.roomDetail);
  const dispatch = useDispatch<AppDispatch>();
  const { conversations, currentConversationId } = useSelector(
    (state: AppState) => state.conversation
  );
  const [files, setFiles] = useState<File[]>([]);
  const [socket, setSocket] = useState<ReturnType<typeof getSocket>>();

  // Lấy thông tin partner từ Redux store hoặc API
  //   const partner = useSelector((state: AppState) =>
  //     state.users.find((u) => u.id === partnerId)
  //   );
  const { register, handleSubmit, reset } = useForm();

  const partner = roomDetail.roomDetail;
  const {
    activeConversation,
    messages,
    fetchConversations,
    fetchMessages,
    groupMessagesByDate,
    shouldShowTime,
    joinConversation,
    sendMessage,
    sendMediaMessage,
    setActiveConversation,
  } = useChat();
  useEffect(() => {
    const socketInstance = initializeSocket(userInfo?.id);
    setSocket(socketInstance);

    // Xác thực với server
    socketInstance.emit("authenticate", userInfo?.id);

    return () => {
      socketInstance.disconnect();
    };
  }, [userInfo?.id]);
  useEffect(() => {
    // Kiểm tra lại trong trường hợp conversation được tạo từ nơi khác
    const existingConv = conversations.find((conv) =>
      conv.participants.some((p) => p.directus_users_id?.id === partnerId)
    );

    if (existingConv) {
      onConfirm(existingConv.id);
    }
  }, [conversations, partnerId, onConfirm]);
  const handleSendFirstMessage = async ({ message }: { message: string }) => {
    if (!message.trim()) return;

    try {
      // 1. Kiểm tra conversation đã tồn tại chưa
      const existingConvs = await dispatch(
        checkConversationExists({
          userId1: userInfo.id,
          userId2: partnerId,
        })
      ).unwrap();

      let conversationId: string;

      // 2. Nếu đã tồn tại
      if (existingConvs.length > 0) {
        conversationId = existingConvs[0].id;
        console.log("Using existing conversation:", conversationId);
      }
      // 3. Nếu chưa tồn tại, tạo mới
      else {
        const res = await dispatch(
          createConversation({
            participants: [
              { directus_users_id: userInfo.id },
              { directus_users_id: partnerId },
            ],
          })
        ).unwrap();
        conversationId = res.id;
        console.log("Created new conversation:", conversationId);
      }

      // 4. Cập nhật state và join conversation
      dispatch(setConversationId(conversationId));
      const newConv =
        conversations.find((c) => c.id === conversationId) ||
        ({ id: conversationId, participants: [] } as IConversation);
      setActiveConversation(newConv);
      socket?.emit("join", conversationId);

      // 5. Delay nhỏ để đảm bảo socket join phòng
      await new Promise((resolve) => setTimeout(resolve, 200));

      // 6. Gửi tin nhắn
      if (files.length > 0) {
        await sendMediaMessage(
          conversationId,
          partner?.building?.landlord?.id,
          files,
          message.trim()
        );
      } else {
        await sendMessage(
          conversationId,
          message.trim(),
          partner?.building?.landlord?.id
        );
      }

      // 7. Thông báo thành công
      onConfirm(conversationId);

      // 8. Reset form
      reset({ message: "" });
      setFiles([]);
    } catch (error) {
      console.error("Error in message sending process:", error);
    }
  };
  const handleFilesChange = (newFiles: File[] | null) => {
    if (newFiles) {
      setFiles(newFiles);
    } else {
      setFiles([]);
    }
  };
  return (
    <div className="flex h-96 w-80 flex-col rounded-t-lg bg-white shadow-lg">
      {/* Header */}
      <div className="flex cursor-pointer items-center justify-between border-b bg-white p-2 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center">
          <div className="relative">
            <img
              src={
                partner?.building?.landlord?.avatar
                  ? `${URL_IMAGE}/${partner?.building?.landlord?.avatar?.id}/${
                      partner?.building?.landlord?.avatar?.filename_download
                    }`
                  : avatar
              }
              alt={partner?.building?.landlord?.first_name}
              className="h-12 w-12 rounded-full object-cover"
            />
            {/* {partner.isOnline && (
              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full border border-white bg-green-500 dark:border-gray-800"></span>
            )} */}
          </div>
          <div className="ml-2">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {partner?.building?.landlord?.first_name}{" "}
              {partner?.building?.landlord?.last_name}
            </p>
          </div>
        </div>
        <BiX
          size={16}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          onClick={onClose}
        />
      </div>

      {/* Empty state */}
      <div className="flex flex-1 flex-col items-center justify-center p-4 text-center">
        <BiLock className="mb-2 text-gray-400" />
        <p className="mb-4 text-sm text-gray-500">
          Tin nhắn được mã hóa đầu cuối. Chỉ bạn và{" "}
          {partner?.building?.landlord?.first_name} có thể đọc.
        </p>
      </div>

      {/* Message input */}
      <form
        onSubmit={handleSubmit(handleSendFirstMessage)}
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
    </div>
  );
};

export default TempChatWindow;

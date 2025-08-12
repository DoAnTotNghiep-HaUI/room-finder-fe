// src/hooks/useChat.ts
import { AppState } from "@/redux";
import { IConversation } from "@/types/chat";
import { IFile } from "@/types/file";
import { IMessage } from "@/types/messages";
import directus from "@/utils/directus";
import { getSocket, initializeSocket } from "@/utils/socket";
import { readItems, updateItem, uploadFiles } from "@directus/sdk";
import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";

export const useChat = () => {
  const [socket, setSocket] = useState<ReturnType<typeof getSocket>>();
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const { userInfo } = useSelector((state: AppState) => state.auth);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [activeConversation, setActiveConversation] =
    useState<IConversation | null>(null);
  const [uploadingFiles, setUploadingFiles] = useState<Record<string, boolean>>(
    {}
  );
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);

  // Khởi tạo socket khi hook được sử dụng
  useEffect(() => {
    const socketInstance = initializeSocket(userInfo?.id);
    setSocket(socketInstance);

    // Xác thực với server
    socketInstance.emit("authenticate", userInfo?.id);

    return () => {
      socketInstance.disconnect();
    };
  }, [userInfo?.id]);
  // useEffect(() => {
  //   if (!socket) return;

  //   const handleInitialMessages = (messages: IMessage[]) => {
  //     setMessages(messages);
  //   };

  //   socket.on("initial_messages", handleInitialMessages);

  //   return () => {
  //     socket.off("initial_messages", handleInitialMessages);
  //   };
  // }, [socket]);
  useEffect(() => {
    if (!socket) return;

    socket.on("new_message", (message) => {
      console.log("Received new message:", message);
      setMessages((prev) => [...prev, message]);
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      socket.off("new_message");
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    // const handleNewMessage = (message: IMessage) => {
    //   setMessages((prev) => [...prev, message]);
    // };
    const handleNewMessage = (message: IMessage) => {
      // Check if this is an update to a temporary message
      // setMessages((prev) => {
      //   // If this message replaces a temporary one, find and replace it
      //   const tempMessageIndex = prev.findIndex(
      //     (m) =>
      //       m.conversation === message.conversation &&
      //       m.sender === message.sender &&
      //       m.date_created === message.date_created
      //   );

      //   if (tempMessageIndex !== -1) {
      //     const newMessages = [...prev];
      //     newMessages[tempMessageIndex] = message;
      //     return newMessages;
      //   }

      //   // Otherwise just add the new message
      //   return [...prev, message];
      // });

      // Update conversation last message
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === message.conversation
            ? {
                ...conv,
                last_message: message,
                last_message_time: message.date_created,
              }
            : conv
        )
      );
    };
    socket.on("new_message", handleNewMessage);

    return () => {
      socket.off("new_message", handleNewMessage);
    };
  }, [socket]);

  // Lấy danh sách conversation
  const fetchConversations = useCallback(async () => {
    try {
      const response = await directus.request<IConversation[]>(
        readItems("conversation", {
          filter: {
            participants: {
              _contains: [userInfo?.id],
            },
          },
          fields: ["*", "participants.*"],
        })
      );
      setConversations(response);
    } catch (error) {
      console.error("Failed to fetch conversations:", error);
    }
  }, [userInfo?.id]);

  // Lấy tin nhắn của một conversation
  const fetchMessages = useCallback(
    async (conversationId: string, limit = 30, offset = 0) => {
      try {
        setLoadingMore(true);
        const response = await directus.request<IMessage[]>(
          readItems("message", {
            filter: { conversation: conversationId },
            sort: ["-date_created"],
            fields: [
              "*",
              "attachments.*",
              // "attachments.directus_files_id.*",
              //  "sender.*", "receiver.*"
            ],
            limit,
            offset,
          })
        );
        console.log("response", response);

        if (response.length < limit) {
          setHasMoreMessages(false);
        }

        return response;
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    },
    []
  );
  const loadMoreMessages = useCallback(
    async (conversationId: string, currentMessages: IMessage[]) => {
      if (loadingMore || !hasMoreMessages) return;

      setLoadingMore(true);
      try {
        const newMessages = await fetchMessages(
          conversationId,
          30,
          currentMessages.length
        );
        if (newMessages.length > 0) {
          // Trả về cả tin nhắn mới và chiều cao của tin nhắn đầu tiên hiện tại
          return {
            newMessages: newMessages.reverse(),
            firstMessageId: currentMessages[0]?.id,
          };
        }
        return null;
      } finally {
        setLoadingMore(false);
      }
    },
    [fetchMessages, loadingMore, hasMoreMessages]
  );
  const groupMessagesByDate = (messages: IMessage[]) => {
    const grouped: Record<string, IMessage[]> = {};

    messages.forEach((message) => {
      const date = new Date(message.date_created);
      const dateKey = date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }); // Format: "22/07/2025"

      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(message);
    });

    return grouped;
  };
  // Kiểm tra có hiển thị thời gian hay không
  const shouldShowTime = (messages: IMessage[], index: number) => {
    // Hiển thị thời gian nếu:
    // 1. Là tin nhắn đầu tiên trong ngày
    // 2. Tin nhắn cách tin trước đó > 5 phút
    // 3. Là tin nhắn cuối cùng trong ngày
    if (index === 0 || index === messages.length - 1) return true;

    const currentTime = new Date(messages[index].date_created).getTime();
    const prevTime = new Date(messages[index - 1].date_created).getTime();
    return currentTime - prevTime > 5 * 60 * 1000; // 5 phút
  };
  // Tham gia vào conversation

  const joinConversation = useCallback(
    async (conversationId: string) => {
      if (socket) {
        if (activeConversation?.id) {
          socket.emit("leave_conversation", activeConversation.id);
        }
        socket.emit("join", conversationId);

        // Đánh dấu tin nhắn là đã đọc
        // socket.emit("update_message_status", {
        //   conversationId,
        //   status: "read",
        // });
        const conv = conversations.find((c) => c.id === conversationId);
        setActiveConversation(conv || null);
        const initialMessages = await fetchMessages(conversationId);
        setMessages(initialMessages.reverse());
      }
    },
    [socket, activeConversation, conversations, fetchMessages]
  );
  const uploadFilesToDirectus = async (files: File[]) => {
    try {
      const uploadedFiles: IFile[] = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadedFile = await directus.request<IFile>(
          uploadFiles(formData)
        );

        uploadedFiles.push(uploadedFile);
      }

      return uploadedFiles;
    } catch (error) {
      console.error("Upload files error:", error);
      throw new Error("Failed to upload files");
    }
  };

  /**
   * Hàm gửi tin nhắn với file đa phương tiện
   */
  const sendMediaMessage = useCallback(
    async (
      conversationId: string,
      receiverId: string,
      files: File[],
      content?: string
    ) => {
      if (!socket || !userInfo?.id) return;

      // Tạo ID tạm cho message
      const tempMessageId = `temp-${Date.now()}`;

      // Tạo preview URLs
      const previewFiles = files.map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name,
        type: file.type,
        size: file.size,
      }));

      // Tạo message tạm
      const tempMessage: IMessage = {
        id: tempMessageId,
        conversation: conversationId,
        sender: userInfo.id,
        receiver: receiverId,
        content: content || "",
        type: files ? "file" : "text",
        status: "sent",
        date_created: new Date().toISOString(),
        user_created: userInfo.id,
        attachments: previewFiles.map(
          (file) =>
            ({
              id: file.url,
              filename_download: file.name,
              type: file.type,
              filesize: file.size.toString(),
            }) as unknown as IFile
        ),
      };

      // Thêm vào UI ngay lập tức
      setMessages((prev) => [...prev, tempMessage]);

      try {
        // Upload files lên Directus
        const uploadedFiles = await uploadFilesToDirectus(files);
        const fileIds = uploadedFiles.map((file) => file.id);
        console.log("Uploaded file IDs:", fileIds);

        // Gửi message qua socket
        await new Promise<void>((resolve, reject) => {
          socket.emit(
            "send_message",
            {
              conversation: conversationId,
              sender: userInfo.id,
              receiver: receiverId,
              content: content || "",
              attachments: fileIds,
              type: files.length > 0 ? "image" : "text",
            },
            (response) => {
              if (response.success) {
                resolve();
              } else {
                reject(response.error);
              }
            }
          );
        });
      } catch (error) {
        console.error("Failed to send media message:", error);
        // Cập nhật trạng thái lỗi
      }
    },
    [socket, userInfo?.id]
  );
  // Gửi tin nhắn
  const sendMessage = useCallback(
    async (
      conversationId: string,
      content: string,
      receiverId: string,
      attachments?: File[]
    ) => {
      if (!socket) return;
      // if (attachments && attachments.length > 0) {
      //   // Nếu có file, gửi bằng hàm sendMediaMessage
      //   return sendMediaMessage(
      //     conversationId,
      //     receiverId,
      //     attachments,
      //     content
      //   );
      // }

      // Tạo tin nhắn tạm với status "sending"
      const tempMessageId = `temp-${Date.now()}`;
      const tempMessage: IMessage = {
        id: tempMessageId,
        conversation: conversationId,
        sender: userInfo.id,
        receiver: receiverId,
        content,
        type: "text",
        status: "sent",
        date_created: new Date().toISOString(),
        user_created: userInfo.id,
      };

      // Thêm ngay vào UI
      setMessages((prev) => [...prev, tempMessage]);
      try {
        // Send message with file IDs via socket
        await new Promise<void>((resolve, reject) => {
          socket.emit(
            "send_message",
            {
              conversation: conversationId,
              sender: userInfo.id,
              receiver: receiverId,
              content,
            },
            (response: {
              success: boolean;
              error?: string;
              message?: IMessage;
            }) => {
              if (response.success) {
                // console.log("newMessageDataa", response.message);

                // directus.request(
                //   updateItem("conversation", response.message.conversation, {
                //     last_message: response.message.id,
                //     last_message_time: response.message.date_created,
                //   })
                // );
                resolve();
              } else {
                reject(response.error);
              }
            }
          );
        });
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    },
    [socket, userInfo?.id, sendMediaMessage]
  );

  // Lắng nghe tin nhắn mới
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message: IMessage) => {
      setMessages((prev) => [...prev, message]);

      // Cập nhật last message trong danh sách conversation
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === message.conversation
            ? {
                ...conv,
                last_message: message,
                last_message_time: message.date_created,
              }
            : conv
        )
      );
    };

    socket.on("new_message", handleNewMessage);

    return () => {
      socket.off("new_message", handleNewMessage);
    };
  }, [socket]);

  return {
    socket,
    conversations,
    activeConversation,
    messages,
    hasMoreMessages,
    loadingMore,
    setMessages,
    loadMoreMessages,
    fetchConversations,
    shouldShowTime,
    fetchMessages,
    groupMessagesByDate,
    joinConversation,
    sendMessage,
    sendMediaMessage,

    setActiveConversation,
  };
};

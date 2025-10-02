// src/hooks/useNotification.ts
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { AppState } from "@/redux";
import directus from "@/utils/directus";
import { getSocket, initializeSocket } from "@/utils/socket";
import {
  readItems,
  updateItem,
  createItem,
  readNotifications,
} from "@directus/sdk";

export interface INotification {
  id: string;
  recipient: string;
  sender?: string;
  subject: string;
  message: string;
  status: "unread" | "read";
  timestamp: string;
  meta?: any;
  collection?: string;
  item_id?: string;
}

export const useNotification = () => {
  const [socket, setSocket] = useState<any>(null);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { userInfo } = useSelector((state: AppState) => state.auth);

  // Khởi tạo socket
  useEffect(() => {
    if (!userInfo?.id) return;

    const socketInstance = initializeSocket({
      userId: userInfo.id,
      path: "/notification-socket",
    });
    setSocket(socketInstance);

    // Xác thực với notification server
    socketInstance.emit("authenticate", userInfo.id);

    return () => {
      socketInstance.disconnect();
    };
  }, [userInfo?.id]);

  // Lắng nghe thông báo mới
  useEffect(() => {
    if (!socket) return;

    const handleNewNotification = (notification: INotification) => {
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    };

    const handleNotificationStatusUpdated = (
      updatedNotification: INotification
    ) => {
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === updatedNotification.id ? updatedNotification : notif
        )
      );

      // Cập nhật unread count
      if (updatedNotification.status === "read") {
        setUnreadCount((prev) => Math.max(0, prev - 1));
      } else {
        setUnreadCount((prev) => prev + 1);
      }
    };

    socket.on("new_notification", handleNewNotification);
    socket.on("notification_status_updated", handleNotificationStatusUpdated);

    return () => {
      socket.off("new_notification", handleNewNotification);
      socket.off(
        "notification_status_updated",
        handleNotificationStatusUpdated
      );
    };
  }, [socket]);

  // Fetch notifications từ database
  const fetchNotifications = useCallback(
    async (limit = 20, offset = 0) => {
      if (!userInfo?.id) return;

      setLoading(true);
      try {
        const response = await directus.request<INotification[]>(
          readNotifications({
            filter: {
              recipient: { _eq: userInfo.id },
            },
            sort: ["-timestamp"],
            limit,
            offset,
            fields: ["*", "sender.*"],
          })
        );

        if (offset === 0) {
          setNotifications(response);
        } else {
          setNotifications((prev) => [...prev, ...response]);
        }

        // Tính unread count
        const unread = response.filter((n) => n.status === "unread").length;
        setUnreadCount(unread);

        return response;
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [userInfo?.id]
  );

  // Đánh dấu thông báo đã đọc
  const markAsRead = useCallback(
    async (notificationId: string) => {
      if (!userInfo?.id) return;

      try {
        // Optimistic update
        setNotifications((prev) =>
          prev.map((notif) =>
            notif.id === notificationId ? { ...notif, status: "read" } : notif
          )
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));

        // Gửi request đến server
        await directus.request(
          updateItem("directus_notifications", notificationId, {
            status: "read",
            timestamp: new Date().toISOString(),
          })
        );

        // Socket emit để sync với các devices khác
        if (socket) {
          socket.emit("mark_notification_read", notificationId);
        }
      } catch (error) {
        console.error("Failed to mark notification as read:", error);
        // Rollback optimistic update
        setNotifications((prev) =>
          prev.map((notif) =>
            notif.id === notificationId ? { ...notif, status: "unread" } : notif
          )
        );
        setUnreadCount((prev) => prev + 1);
      }
    },
    [userInfo?.id, socket]
  );

  // Đánh dấu tất cả thông báo đã đọc
  const markAllAsRead = useCallback(async () => {
    // if (!userInfo?.id) return;
    // try {
    //   // Optimistic update
    //   setNotifications((prev) =>
    //     prev.map((notif) => ({ ...notif, status: "read" }))
    //   );
    //   setUnreadCount(0);
    //   // Gửi request đến server
    //   await directus.request(
    //     updateItem(
    //       "directus_notifications",
    //       {
    //       },
    //       { status: "read" }
    //     )
    //   );
    //   // Socket emit
    //   if (socket) {
    //     socket.emit("mark_all_notifications_read", userInfo.id);
    //   }
    // } catch (error) {
    //   console.error("Failed to mark all notifications as read:", error);
    //   // Rollback - cần fetch lại data
    //   fetchNotifications();
    // }
  }, [userInfo?.id, socket, fetchNotifications]);

  // Xóa thông báo
  const deleteNotification = useCallback(
    async (notificationId: string) => {
      //   try {
      //     // Optimistic update
      //     const deletedNotification = notifications.find(
      //       (n) => n.id === notificationId
      //     );
      //     setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
      //     if (deletedNotification?.status === "unread") {
      //       setUnreadCount((prev) => Math.max(0, prev - 1));
      //     }
      //     // Gửi request đến server
      //     await directus.request(
      //       deleteItem("directus_notifications", notificationId)
      //     );
      //   } catch (error) {
      //     console.error("Failed to delete notification:", error);
      //     // Rollback - fetch lại data
      //     fetchNotifications();
      //   }
    },
    [notifications, fetchNotifications]
  );

  // Tạo thông báo mới (dành cho admin/system)
  const createNotification = useCallback(
    async (
      recipientId: string,
      data: {
        subject: string;
        message: string;
        meta?: any;
        collection?: string;
        item_id?: string;
      }
    ) => {
      try {
        const newNotification = await directus.request(
          createItem("directus_notifications", {
            recipient: recipientId,
            sender: userInfo?.id,
            subject: data.subject,
            message: data.message,
            status: "unread",
            timestamp: new Date().toISOString(),
            meta: data.meta,
            collection: data.collection,
            item_id: data.item_id,
          })
        );

        return newNotification;
      } catch (error) {
        console.error("Failed to create notification:", error);
        throw error;
      }
    },
    [userInfo?.id]
  );

  // Lọc thông báo theo trạng thái
  const getNotificationsByStatus = useCallback(
    (status: "all" | "unread" | "read") => {
      if (status === "all") return notifications;
      return notifications.filter((n) => n.status === status);
    },
    [notifications]
  );

  // Format thời gian thông báo
  const formatNotificationTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Vừa xong";
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;

    return date.toLocaleDateString("vi-VN");
  };

  // Load more notifications
  const loadMoreNotifications = useCallback(async () => {
    if (loading) return;
    await fetchNotifications(20, notifications.length);
  }, [loading, fetchNotifications, notifications.length]);

  // Refresh notifications
  const refreshNotifications = useCallback(async () => {
    await fetchNotifications();
  }, [fetchNotifications]);

  return {
    // State
    notifications,
    unreadCount,
    loading,

    // Actions
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    createNotification,
    refreshNotifications,
    loadMoreNotifications,

    // Utilities
    getNotificationsByStatus,
    formatNotificationTime,
  };
};

// Helper function cho updateByQuery (nếu chưa có trong Directus SDK)
const updateByQuery = (collection: string, query: any, data: any) => ({
  type: "updateByQuery",
  collection,
  query,
  data,
});

const deleteItem = (collection: string, id: string) => ({
  type: "deleteItem",
  collection,
  id,
});

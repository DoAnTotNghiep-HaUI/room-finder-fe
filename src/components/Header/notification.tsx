import React, { useState } from "react";
import { BiBell } from "react-icons/bi";

interface NotificationProps {
  unreadCount: number;
  notifications: any[];
  onNotificationClick: (id: string) => void;
}
export const Notification: React.FC<NotificationProps> = ({
  unreadCount,
  notifications,
  onNotificationClick,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showUserMenu) setShowUserMenu(false);
  };
  const handleNotificationClick = (notificationId: string) => {
    onNotificationClick(notificationId);
    setShowNotifications(false);
  };
  return (
    <div className="relative ml-3">
      <button
        className="relative rounded-full bg-[#e2e5e9] p-3 text-black hover:bg-gray-300 focus:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-[#3b3d3e] dark:text-[#e2e5e9]"
        onClick={toggleNotifications}
      >
        <BiBell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute right-1 top-1 block flex h-5 w-5 -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
            {unreadCount}
          </span>
        )}
      </button>
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="divide-y divide-gray-100 py-1">
            <div className="flex items-center justify-between bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">
              <span className="text-xl font-semibold">Notifications</span>
              {unreadCount > 0 && (
                <span className="cursor-pointer text-xs text-blue-600 hover:underline">
                  Mark all as read
                </span>
              )}
            </div>
            {notifications.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500">
                No notifications
              </div>
            ) : (
              notifications.slice(0, 5).map((notification) => (
                <div
                  key={notification?.id}
                  className={`cursor-pointer px-4 py-3 hover:bg-gray-50 ${!notification?.read ? "bg-blue-50" : ""}`}
                  onClick={() => handleNotificationClick(notification?.id)}
                >
                  <p className="text-sm font-medium text-gray-900">
                    {notification?.message}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {new Date(notification?.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    · {new Date(notification?.timestamp).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
            <div className="px-4 py-2 text-center">
              <a
                href="#"
                className="text-sm text-blue-600 hover:underline"
              >
                View all notifications
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import { useState } from "react";
import { initialNotifications } from "../data/notifications";
import type { Notification } from "../types/notifications";

export const useNotifications = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);

  const unreadNotifications = notifications.filter(
    (notification) => !notification.read,
  );

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id && !notification.read
          ? { ...notification, read: true }
          : notification,
      ),
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
  };

  return {
    notifications,
    unreadNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    unreadCount: unreadNotifications.length,
  };
};

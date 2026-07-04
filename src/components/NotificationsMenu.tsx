import ClickAwayListener from "react-click-away-listener";
import { AnimatePresence } from "motion/react";
import { useNotifications } from "../hooks/useNotifications";
import { NotificationBell } from "./NotificationBell";
import { NotificationDropdown } from "./NotificationDropdown";
import { useState, useEffect } from "react";

const notificationsDropdownId = "notifications-dropdown";

export const NotificationsMenu = () => {
  const {
    notifications,
    unreadNotifications,
    unreadCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  } = useNotifications();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  useEffect(() => {
    if (!isNotificationsOpen) return;

    const closeOnEscape = ({ key }: KeyboardEvent) => {
      if (key === "Escape") setIsNotificationsOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isNotificationsOpen]);

  return (
    <ClickAwayListener
      onClickAway={() => setIsNotificationsOpen(false)}
      mouseEvent="mousedown"
      touchEvent="touchstart"
    >
      <div>
        <NotificationBell
          unreadCount={unreadCount}
          isOpen={isNotificationsOpen}
          dropdownId={notificationsDropdownId}
          onClick={() => setIsNotificationsOpen((isOpen) => !isOpen)}
        />

        <AnimatePresence>
          {isNotificationsOpen && (
            <NotificationDropdown
              id={notificationsDropdownId}
              notifications={notifications}
              unreadNotifications={unreadNotifications}
              unreadCount={unreadCount}
              onMarkAsRead={markNotificationAsRead}
              onMarkAllAsRead={markAllNotificationsAsRead}
            />
          )}
        </AnimatePresence>
      </div>
    </ClickAwayListener>
  );
};

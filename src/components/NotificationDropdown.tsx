import { useState } from "react";
import { CheckCheck, Settings } from "lucide-react";
import type { Notification } from "../types/notifications";
import { NotificationItem } from "./NotificationItem";

type NotificationTab = "all" | "unread";

type NotificationDropdownProps = {
  id: string;
  notifications: Notification[];
  unreadNotifications: Notification[];
  unreadCount: number;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
};

export const NotificationDropdown = ({
  id,
  notifications,
  unreadNotifications,
  unreadCount,
  onMarkAsRead,
  onMarkAllAsRead,
}: NotificationDropdownProps) => {
  const [activeTab, setActiveTab] = useState<NotificationTab>("all");

  const displayedNotifications =
    activeTab === "all" ? notifications : unreadNotifications;

  return (
    <section
      id={id}
      role="dialog"
      aria-label="Notifications"
      className="absolute right-0 top-16 z-50 flex max-h-[min(80vh,44rem)] w-[calc(100vw-2rem)] max-w-[46rem] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.18)] sm:w-[min(calc(100vw-3rem),46rem)]"
    >
      <div className="shrink-0 px-4 pb-4 pt-5 sm:px-6">
        <div className="flex items-start gap-2">
          <h2 className="text-2xl font-bold text-slate-900">Notifications</h2>
          <span
            aria-label={`${unreadCount} unread notifications`}
            className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-notification px-1.5 text-xs font-bold leading-none text-white"
          >
            {unreadCount}
          </span>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2 sm:mt-8 sm:gap-3">
          <button
            type="button"
            aria-pressed={activeTab === "all"}
            onClick={() => setActiveTab("all")}
            className={[
              "flex-1 cursor-pointer whitespace-nowrap rounded border border-[1.5px] px-3 py-2.5 text-sm font-semibold text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 sm:flex-none sm:px-4 sm:py-3 sm:text-base",
              activeTab === "all"
                ? "border-slate-800 bg-white"
                : "border-transparent bg-slate-100",
            ].join(" ")}
          >
            All Notifications
          </button>

          <button
            type="button"
            aria-pressed={activeTab === "unread"}
            onClick={() => setActiveTab("unread")}
            className={[
              "flex-1 cursor-pointer whitespace-nowrap rounded border border-[1.5px] px-3 py-2.5 text-sm font-semibold text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 sm:flex-none sm:px-4 sm:py-3 sm:text-base",
              activeTab === "unread"
                ? "border-slate-800 bg-white"
                : "border-transparent bg-slate-100",
            ].join(" ")}
          >
            Unread Notifications
          </button>

          <button
            type="button"
            onClick={onMarkAllAsRead}
            disabled={unreadCount === 0}
            className="inline-flex cursor-pointer items-center gap-2 rounded px-2 py-2 text-sm font-semibold text-blue-500 hover:bg-blue-50 disabled:cursor-not-allowed disabled:text-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 sm:ml-auto"
          >
            <CheckCheck
              aria-hidden="true"
              className="h-5 w-5"
              strokeWidth={2}
            />
            Mark all as read
          </button>

          <button
            type="button"
            aria-label="Notification settings"
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            <Settings aria-hidden="true" className="h-6 w-6" strokeWidth={2} />
          </button>
        </div>
      </div>

      <div
        className="notifications-scrollbar min-h-0 flex-1 overflow-y-auto border-t border-slate-100"
        role="list"
      >
        {displayedNotifications.length ? (
          displayedNotifications.map((notification) => (
            <NotificationItem
              key={`notification-${notification.id}`}
              notification={notification}
              onMarkAsRead={onMarkAsRead}
            />
          ))
        ) : (
          <div className="flex min-h-48 flex-col items-center justify-center px-6 py-12 text-center">
            <p className="text-base font-semibold text-slate-900">
              No notifications here
            </p>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              {activeTab === "unread"
                ? "You're all caught up."
                : "New notifications will appear here."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

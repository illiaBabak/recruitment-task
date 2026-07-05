import type { ReactNode } from "react";
import { FileText, Trash2, UserRound } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { Notification } from "../types/notifications";
import { formatTime } from "../utils/formatTime";

type NotificationItemProps = {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
};

const notificationText = (notification: Notification): string => {
  switch (notification.type) {
    case "team":
      return `${notification.userName} joined your team.`;

    case "review_cancelled":
      return `${notification.userName} from ${notification.companyName} has cancelled their review request.`;

    case "review_requested":
      return `${notification.userName} from ${notification.companyName} has requested a review.`;
  }
};

const notificationMessage = (notification: Notification): ReactNode => {
  switch (notification.type) {
    case "team":
      return (
        <>
          <span className="font-semibold text-slate-900">
            {notification.userName}
          </span>{" "}
          joined your team.
        </>
      );

    case "review_cancelled":
      return (
        <>
          <span className="font-semibold text-slate-900">
            {notification.userName}
          </span>{" "}
          from{" "}
          <span className="font-semibold text-slate-900">
            {notification.companyName}
          </span>{" "}
          has cancelled their review request.
        </>
      );

    case "review_requested":
      return (
        <>
          <span className="font-semibold text-slate-900">
            {notification.userName}
          </span>{" "}
          from{" "}
          <span className="font-semibold text-slate-900">
            {notification.companyName}
          </span>{" "}
          has requested a review.
        </>
      );
  }
};

const NotificationIcon = ({
  type,
  shouldReduceMotion,
}: {
  type: Notification["type"];
  shouldReduceMotion: boolean | null;
}) => {
  const hoverAnimation = shouldReduceMotion ? { scale: 1 } : { scale: 1.04 };

  if (type === "team") {
    return (
      <motion.span
        variants={{ rest: { scale: 1 }, hover: hoverAnimation }}
        transition={{ duration: 0.16, ease: "easeOut" }}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-notification-team text-white shadow-sm"
      >
        <UserRound aria-hidden="true" className="h-7 w-7" strokeWidth={2} />
      </motion.span>
    );
  }

  if (type === "review_cancelled") {
    return (
      <motion.span
        variants={{ rest: { scale: 1 }, hover: hoverAnimation }}
        transition={{ duration: 0.16, ease: "easeOut" }}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-notification-cancelled text-white shadow-sm"
      >
        <Trash2 aria-hidden="true" className="h-6 w-6" strokeWidth={2} />
      </motion.span>
    );
  }

  return (
    <motion.span
      variants={{ rest: { scale: 1 }, hover: hoverAnimation }}
      transition={{ duration: 0.16, ease: "easeOut" }}
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-notification-team text-white shadow-sm"
    >
      <FileText aria-hidden="true" className="h-6 w-6" strokeWidth={2} />
    </motion.span>
  );
};

export const NotificationItem = ({
  notification,
  onMarkAsRead,
}: NotificationItemProps) => {
  const accessibleNotificationText = notificationText(notification);
  const displayTime = formatTime(notification.createdAt);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div role="listitem" className="m-4">
      <motion.button
        type="button"
        aria-label={
          notification.read
            ? `Read notification: ${accessibleNotificationText} ${displayTime}`
            : `Mark notification as read: ${accessibleNotificationText} ${displayTime}`
        }
        onClick={() => onMarkAsRead(notification.id)}
        initial="rest"
        whileHover="hover"
        whileFocus="hover"
        variants={{
          rest: { y: 0 },
          hover: shouldReduceMotion ? { y: 0 } : { y: -2 },
        }}
        transition={{ duration: 0.16, ease: "easeOut" }}
        className={[
          "grid min-h-32 cursor-pointer w-full grid-cols-[auto_1fr_auto] items-start gap-4 px-4 py-5 text-left hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-500 sm:px-6",
          notification.read ? "bg-white" : "bg-slate-100",
        ].join(" ")}
      >
        <NotificationIcon
          type={notification.type}
          shouldReduceMotion={shouldReduceMotion}
        />

        <span className="min-w-0 pt-1">
          <span className="block text-sm leading-6 text-slate-700 sm:text-base">
            {notificationMessage(notification)}
          </span>
          <span className="mt-1 block text-sm font-semibold text-slate-500">
            {displayTime}
          </span>
        </span>

        <span className="flex h-12 w-4 items-start justify-center pt-2">
          {!notification.read && (
            <motion.span
              aria-hidden="true"
              variants={{
                rest: { scale: 1, opacity: 1 },
                hover: shouldReduceMotion
                  ? { scale: 1, opacity: 1 }
                  : { scale: 1.08, opacity: 1 },
              }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="h-4 w-4 rounded-full bg-blue-500 shadow-sm"
            />
          )}
        </span>
      </motion.button>
    </div>
  );
};

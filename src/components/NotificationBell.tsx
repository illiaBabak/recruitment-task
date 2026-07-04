import { Bell } from "lucide-react";

type NotificationBellProps = {
  unreadCount: number;
  isOpen: boolean;
  dropdownId: string;
  onClick: () => void;
};

export const NotificationBell = ({
  unreadCount,
  isOpen,
  dropdownId,
  onClick,
}: NotificationBellProps) => {
  return (
    <button
      type="button"
      aria-label={
        unreadCount > 0
          ? `Open notifications, ${unreadCount} unread`
          : "Open notifications"
      }
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-controls={dropdownId}
      onClick={onClick}
      className="relative cursor-pointer inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-800 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
    >
      <Bell aria-hidden="true" className="h-6 w-6" strokeWidth={2} />

      {unreadCount > 0 && (
        <span className="absolute right-[-2px] top-[9px] inline-flex min-h-4 min-w-4 items-center justify-center rounded-full bg-notification px-1 text-[10px] font-bold leading-none text-white">
          {unreadCount}
        </span>
      )}
    </button>
  );
};

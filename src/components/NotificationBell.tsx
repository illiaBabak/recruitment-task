import { Bell } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

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
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
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
      whileHover={shouldReduceMotion ? undefined : { y: -1 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="relative cursor-pointer inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-800 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
    >
      <motion.span
        aria-hidden="true"
        animate={isOpen && !shouldReduceMotion ? { scale: 1.05 } : { scale: 1 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        <Bell className="h-6 w-6" strokeWidth={2} />
      </motion.span>

      {unreadCount > 0 && (
        <motion.span
          key={unreadCount}
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="absolute right-[-2px] top-[9px] inline-flex min-h-4 min-w-4 items-center justify-center rounded-full bg-notification px-1 text-[10px] font-bold leading-none text-white"
        >
          {unreadCount}
        </motion.span>
      )}
    </motion.button>
  );
};

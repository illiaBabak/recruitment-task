import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { NotificationsMenu } from "./NotificationsMenu";

export const Header = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <header className="sticky top-0 z-40 flex h-[4.5rem] items-center justify-end border-b border-slate-200 bg-white px-4 sm:px-8">
      <div className="relative flex items-center gap-3 sm:gap-5">
        <NotificationsMenu />
        <motion.button
          type="button"
          aria-label="Open user menu"
          whileHover={shouldReduceMotion ? undefined : { y: -1 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="inline-flex h-10 items-center gap-3 rounded px-2 text-sm font-bold text-slate-900 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 sm:text-base"
        >
          <span className="whitespace-nowrap font-bold text-base">
            JOHN DOE
          </span>
          <motion.span
            aria-hidden="true"
            whileHover={shouldReduceMotion ? undefined : { y: 1 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <ChevronDown className="h-5 w-5 text-slate-700" strokeWidth={2} />
          </motion.span>
        </motion.button>
      </div>
    </header>
  );
};

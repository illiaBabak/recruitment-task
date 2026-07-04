import { ChevronDown } from "lucide-react";
import { NotificationsMenu } from "./NotificationsMenu";

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 flex h-[4.5rem] items-center justify-end border-b border-slate-200 bg-white px-4 sm:px-8">
      <div className="relative flex items-center gap-3 sm:gap-5">
        <NotificationsMenu />
        <button
          type="button"
          aria-label="Open user menu"
          className="inline-flex h-10 items-center gap-3 rounded px-2 text-sm font-bold text-slate-900 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 sm:text-base"
        >
          <span className="whitespace-nowrap font-bold text-base">
            JOHN DOE
          </span>
          <ChevronDown
            aria-hidden="true"
            className="h-5 w-5 text-slate-700"
            strokeWidth={2}
          />
        </button>
      </div>
    </header>
  );
};

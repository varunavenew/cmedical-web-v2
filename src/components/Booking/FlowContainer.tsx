import { BACK, BOOKING } from "@/src/translations/booking";
import { CLOSE_LABELS } from "@/src/translations/close-labels";
import { t } from "@/src/translations/get-translation";
import classNames from "classnames";
import { FC, PropsWithChildren } from "react";

interface Props {
  language: string;
  progress?: number;
  maxProgress: number;
  onClose: () => void;
  onBack?: () => void;
  className?: string;
}

export const FlowContainer: FC<PropsWithChildren<Props>> = ({
  language,
  progress,
  maxProgress,
  onClose,
  onBack,
  className,
  children,
}) => (
  <div
    className={classNames(
      // Full-screen booking shell styled similar to BookingDemo
      "w-screen h-screen overflow-auto flex flex-col scroll-smooth bg-[#f5f4f0]",
      className
    )}
  >
    {/* Header – inspired by BookingDemo */}
    <header className="sticky top-0 z-40 bg-foreground text-background shadow-sm">
      <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors text-sm flex items-center gap-1.5"
          >
            <span aria-hidden="true">&lsaquo;</span>
            <span>{t(BACK, language)}</span>
          </button>
        ) : (
          <div className="w-9" />
        )}
        <span className="text-sm tracking-wide uppercase text-background/90">
          {t(BOOKING, language)}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="p-2 -mr-2 rounded-full hover:bg-white/10 transition-colors text-sm"
        >
          <span className="sr-only">{t(CLOSE_LABELS, language)}</span>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      {typeof progress === "number" && (
        <div className="border-t border-white/10">
          <div className="max-w-2xl mx-auto px-4 py-2">
            <div className="h-1.5 rounded-full bg-black/20 overflow-hidden">
              <div
                className="h-full bg-background transition-all duration-300"
                style={{
                  width: `${Math.min(
                    100,
                    Math.max(0, (progress / maxProgress) * 100)
                  )}%`,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </header>

    <main className="flex-1">
      <div className="max-w-2xl mx-auto px-4 py-8">{children}</div>
    </main>
  </div>
);

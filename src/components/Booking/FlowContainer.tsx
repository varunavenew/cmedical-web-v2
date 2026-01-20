import { BACK } from "@/src/translations/booking";
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
      "px-25 pt-75 pb-100 w-screen h-screen overflow-auto transition-colors duration-slow flex flex-col scroll-smooth",
      className
    )}
  >
    <div
      className={classNames(
        "flex justify-between fixed top-0 left-0 w-screen gap-x-10 transition-colors duration-slow",
        className
      )}
    >
      {onBack ? (
        <button onClick={onBack} className="flex gap-10 p-25">
          <span>&lsaquo;</span>
          {t(BACK, language)}
        </button>
      ) : (
        <div></div>
      )}
      <button onClick={onClose} className="p-25">
        {t(CLOSE_LABELS, language)} &times;
      </button>
    </div>

    {typeof progress === "number" && (
      <div className="w-full max-w-450 mx-auto">
        <progress className="w-full block" value={progress} max={maxProgress} />
      </div>
    )}

    {children}
  </div>
);

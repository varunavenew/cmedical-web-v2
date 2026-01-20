"use client";
import classNames from "classnames";
import { FC, PropsWithChildren, useState } from "react";
import { useParams } from "next/navigation";
import { t } from "@/src/translations/get-translation";
import { MORE } from "@/src/translations/more";

interface Props {}

export const ClipText: FC<PropsWithChildren<Props>> = ({ children }) => {
  const { language } = useParams<{ language: string }>();
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="flex gap-7 items-end">
      <div
        className={classNames("overflow-hidden", !isExpanded && "line-clamp-3")}
      >
        {children}
      </div>
      {!isExpanded && (
        <button onClick={() => setIsExpanded(true)}>{t(MORE, language)}</button>
      )}
    </div>
  );
};

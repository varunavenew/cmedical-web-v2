import classNames from "classnames";
import Link from "next/link";
import { FC, ReactNode } from "react";

export const SocialMediaLink: FC<{
  linkUrl: string;
  className: string;
  children: ReactNode;
}> = ({ linkUrl, className, children }) => {
  return (
    <Link href={linkUrl} target="_blank" rel="noopener noreferrer">
      <div
        className={classNames(
          "w-40 h-40 bg-white/10 flex items-center p-9 rounded-[13px]",
          className
        )}
      >
        {children}
      </div>
    </Link>
  );
};

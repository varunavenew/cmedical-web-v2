import classNames from "classnames";
import type { FC, JSX, ReactNode } from "react";

interface Props {
  text: string;
  bg: string;
  bgHover?: string;
  span?: ReactNode;
}

export const Pill: FC<Props> = ({ text, bg, span, bgHover }) => {
  return (
    <div
      className={classNames(
        "px-15 h-40 rounded-[15px] gap-10 flex justify-center items-center ",
        bg,
        bgHover ? `${bgHover} transition-color duration-slow ease-in-out` : ""
      )}
    >
      {text}
      {span && <span className="text-black opacity-30">{span}</span>}
    </div>
  );
};

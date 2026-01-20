"use client";
import { FC, PropsWithChildren, useEffect, useRef } from "react";
import slugify from "@sindresorhus/slugify";
import { useHash } from "../hooks/useHash";

export const SubTopicItem: FC<
  PropsWithChildren<{ title: string; name?: string }>
> = ({ title, name, children }) => {
  const el = useRef<HTMLDetailsElement>(null);
  const hash = useHash();
  const slug = slugify(title);
  const isSelected = hash.has(slug);

  useEffect(() => {
    if (isSelected && el.current)
      // set timeout to override nextjs scrolling to top
      setTimeout(() => el.current?.scrollIntoView(), 100);
  }, [isSelected]);

  return (
    <details
      // @ts-ignore
      name={name}
      className="group border-t-half border-black/10 last:border-b-half"
      ref={el}
      id={slug}
      open={isSelected}
    >
      <summary className="p-25 md:px-50 flex justify-between items-center gap-x-50 hover:bg-black/2 focus-visible:bg-black/2 group-open:border-b-half border-black/10 cursor-pointer">
        <h2>{title}</h2>

        <span className="group-open:hidden block">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.73563 5.25878H11.9996V6.68678H6.73563V11.9508H5.30763V6.68678H0.015625V5.25878H5.30763V0.0507812H6.73563V5.25878Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <span className="group-open:block hidden">
          <svg
            width="11"
            height="3"
            viewBox="0 0 11 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect y="0.775391" width="11" height="1.45" fill="currentColor" />
          </svg>
        </span>
      </summary>
      <div className="p-50 group-open:bg-black/2">{children}</div>
    </details>
  );
};

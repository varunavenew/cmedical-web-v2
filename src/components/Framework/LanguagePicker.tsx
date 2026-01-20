"use client";
import { Menu } from "@headlessui/react";
import classNames from "classnames";
import Link from "next/link";
import { FC } from "react";

const LABELS: Record<string, string> = {
  no: "Norge",
  se: "Sverige",
  en: "Europe",
};

interface Props {
  current: string;
  className?: string;
  selectedClassName: string;
  direction: "up" | "down";
}

export const LanguagePicker: FC<Props> = ({
  current,
  className,
  selectedClassName,
  direction = "down",
}) => {
  return (
    <Menu as="div" className={classNames("relative", className)}>
      <Menu.Button className={classNames("pill", selectedClassName)}>
        {({ open }) => (
          <>
            {LABELS[current]}
            <span className="ml-10 opacity-30">
              {open ? <MinusIcon /> : <PlusIcon />}
            </span>
          </>
        )}
      </Menu.Button>
      <Menu.Items
        className={classNames(
          "absolute pill px-0 flex flex-col h-auto min-w-full items-stretch overflow-hidden bg-white text-black",
          direction === "up" && "bottom-50",
          direction === "down" && "mt-10 md:mt-0 md:bottom-50"
        )}
      >
        {Object.keys(LABELS)
          .filter((k) => k !== current)
          .map((lang) => (
            <Menu.Item key={lang}>
              {({ active }) => (
                <Link
                  href={`/${lang}`}
                  className={classNames(
                    "px-15 border-b-half last:border-b-0 border-black/10 h-40 flex items-center w-full cursor-pointer",
                    active && "bg-white"
                  )}
                >
                  {LABELS[lang]}
                </Link>
              )}
            </Menu.Item>
          ))}
      </Menu.Items>
    </Menu>
  );
};

const PlusIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="13"
    fill="currentColor"
  >
    <path d="M.05 7.34V5.69h11.9v1.65H.05Z" />
    <path d="M6.81 12.45H5.16V.55h1.65v11.9Z" />
  </svg>
);

const MinusIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="2"
    fill="currentColor"
  >
    <path d="M.05 1.82V.18h11.9v1.64H.05Z" />
  </svg>
);

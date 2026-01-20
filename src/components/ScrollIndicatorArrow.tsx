"use client";
import { Transition } from "@headlessui/react";
import { FC, useEffect, useState } from "react";

export const ScrollIndicatorArrow: FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const shouldShow = window.sessionStorage.getItem("cm-scrollarrow") !== "0";
    if (shouldShow) {
      setShow(true);
      const handleScroll = () => {
        window.sessionStorage.setItem("cm-scrollarrow", "0");
        setShow(false);
      };
      window.addEventListener("scroll", handleScroll, {
        passive: true,
        once: true,
      });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <Transition
      show={show}
      leave="transition-opacity duration-300 ease-in delay-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="bg-black/30 rounded-15 h-40 w-40 text-center text-white fixed bottom-25 right-50 z-10 hidden md:block"
    >
      <svg
        width="18"
        height="20"
        viewBox="0 0 18 20"
        fill="none"
        stroke="currentColor"
        className="animate-updown inline-block"
        strokeWidth={1.5}
      >
        <path d="M1 10l8 5l8 -5" />
      </svg>
    </Transition>
  );
};

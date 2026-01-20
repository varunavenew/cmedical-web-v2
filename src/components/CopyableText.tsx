"use client";
import { Transition } from "@headlessui/react";
import { FC, MouseEventHandler, useCallback, useState } from "react";
import { CopyIcon } from "./CopyIcon";
import { Portal } from "./Portal";

export const CopyableText: FC<{ text: string; confirmation: string }> = ({
  text,
  confirmation,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleClick: MouseEventHandler<HTMLSpanElement> = useCallback((e) => {
    if (!e.currentTarget.textContent) return;
    navigator.clipboard
      .writeText(e.currentTarget.textContent)
      .then(() => {
        setShowConfirmation(true);
        setTimeout(setShowConfirmation, 3000, false);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <span className="cursor-pointer" onClick={handleClick}>
        {text}
      </span>
      <Portal>
        <Transition
          show={showConfirmation}
          enterFrom="translate-y-115 opacity-0"
          enter="transition-all duration-300 ease-in-out"
          leaveTo="translate-y-115 opacity-0"
          leave="transition-all duration-300 ease-in-out"
          className="fixed bottom-100 flex items-center justify-center left-0 right-0 pointer-events-none"
        >
          <div className="bg-black/40 text-white p-15 rounded-15 flex gap-10 leading-none items-center">
            <CopyIcon /> {confirmation ?? "Copied to clipboard"}
          </div>
        </Transition>
      </Portal>
    </>
  );
};

"use client";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const Portal: FC<PropsWithChildren> = ({ children }) => {
  const [portalContainer, setPortalContainer] = useState<HTMLElement>();
  useEffect(() => {
    setPortalContainer(document.getElementById("portal") ?? undefined);
  }, []);
  return portalContainer ? createPortal(children, portalContainer) : null;
};

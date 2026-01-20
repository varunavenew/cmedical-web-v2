"use client";
import { useState, useRef, ReactNode, useEffect } from "react";

import { usePathname } from "next/navigation";

const PageWithTransition = ({ children }: { children: ReactNode }) => {
  const [stateTransitioning, setStateTransitioning] = useState(false);
  const pathname = usePathname();
  const prevPath = useRef(pathname);
  const prevHtml = useRef<string>();
  const [html, setHtml] = useState<string>();
  // const [prevChild, setPrevChild] = useState(() => {
  //   console.log("initializing prev child");
  //   return document.getElementById("app")?.outerHTML;
  // });
  useEffect(() => {
    setHtml(document.getElementById("app")?.outerHTML);
  }, []);

  useEffect(() => {
    if (pathname === prevPath.current) return;

    // setPrevChild(document.getElementById("app")?.outerHTML);
    console.log("should transition", prevPath.current, "to", pathname);
    prevPath.current = pathname;
    setStateTransitioning(true);
    setTimeout(() => {
      console.log("transition done", pathname);
      // setPrevChild(cloneElement(children));

      const el = document.getElementById("app")?.outerHTML;
      setHtml(el);
      console.log(el);
      // setPrevChild(document.getElementById("app")?.outerHTML);
      setStateTransitioning(false);
    }, 510);
  }, [pathname, children]);

  return (
    <>
      {!stateTransitioning ? (
        children
      ) : (
        <div className="grid grid-rows-1 grid-cols-1">
          <div
            className="col-start-1 row-start-1"
            dangerouslySetInnerHTML={{ __html: html ?? "" }}
          ></div>
          <div className="col-start-1 row-start-1 animate-slideUpEnter bg-skin1">
            {children}
          </div>
        </div>
      )}
    </>
  );
};
export default PageWithTransition;

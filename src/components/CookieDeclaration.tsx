"use client";

import { LANGUAGES_ISO } from "@/sanity/lib/languages";
import { FC, memo, useEffect, useRef } from "react";

const CookieDeclarationInner: FC<{
  cookiebotKey: string;
  language: string;
}> = ({ cookiebotKey, language }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if we have already added the script
    if (document.querySelector("#CookieDeclaration")) {
      return;
    }

    const script = document.createElement("script");
    script.src = `https://consent.cookiebot.com/${cookiebotKey}/cd.js`;
    script.setAttribute("data-culture", getLanguageIso(language));
    script.id = "CookieDeclaration";
    script.async = true;
    ref.current?.appendChild(script);
  }, [cookiebotKey, language]);

  return <div className="prose mx-auto mt-20" ref={ref}></div>;
};

export const CookieDeclaration = memo(CookieDeclarationInner);

// Convert the language parameter from the path to an ISO language parameter as
// expected by the cookie declaration script.
function getLanguageIso(language: string) {
  return LANGUAGES_ISO[language] ?? "en";
}

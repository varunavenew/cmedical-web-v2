"use client";

import { trackWithGTM } from "@/src/lib/tracking";
import IframeResizer from "@iframe-resizer/react";
import { useEffect, useState } from "react";
import css from "./MetodikaIframe.module.scss";

if (!process.env.NEXT_PUBLIC_IFRAME_RESIZER_LICENSE_KEY) {
  throw new Error(
    "Missing environment variable: NEXT_PUBLIC_IFRAME_RESIZER_LICENSE_KEY"
  );
}

const NEXT_PUBLIC_IFRAME_RESIZER_LICENSE_KEY =
  process.env.NEXT_PUBLIC_IFRAME_RESIZER_LICENSE_KEY;

const TRACKING_PARAMETERS = [
  "gclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_id",
  "utm_term",
  "utm_content",
];

interface Props {
  language: string;
  metodikaCityId?: number;
  metodikaSpecialistId?: number;
  metodikaActivityGroup?:
    | {
        type: "all";
      }
    | {
        type: "title";
        title: string;
      };
}

export function MetodikaIframe({
  language,
  metodikaCityId,
  metodikaSpecialistId,
  metodikaActivityGroup,
}: Props) {
  const [url, setUrl] = useState<string>();

  // Configure the iframe's URL
  useEffect(() => {
    const iframeUrl = new URL("/api/metodika-webbooking", location.origin);

    iframeUrl.searchParams.set("language", language);

    // Use the same tracking parameters in the iframe
    const params = new URLSearchParams(window.location.search);
    for (const name of TRACKING_PARAMETERS) {
      const value = params.get(name);
      if (value) {
        iframeUrl.searchParams.set(name, value);
      }
    }

    if (metodikaCityId != null) {
      // Only add the caregiver id when we have a city id.
      // Adding just the caregiver id on its own does not work.
      const caregivers = metodikaSpecialistId ?? "all";

      let hash = `city=${metodikaCityId}&activity=null&caregivers=${caregivers}`;

      // Automatically expand the "Velg tjeneste" dropdown and optionally an activity group within
      if (metodikaActivityGroup) {
        if (metodikaActivityGroup.type === "all") {
          hash = `${hash}&openactivitypanel=1`;
        } else {
          hash = `${hash}&showactivitygroup=${metodikaActivityGroup.title}`;
        }
      }

      iframeUrl.hash = hash;

      // Add the city id to search params so we can check if we have a city on the server
      // where we don't have access to the hash.
      iframeUrl.searchParams.set("city", String(metodikaCityId));
    }

    setUrl(iframeUrl.href);
  }, [language, metodikaCityId, metodikaSpecialistId, metodikaActivityGroup]);

  // Initial tracking
  useEffect(() => {
    trackWithGTM("booking_init", { booking_method: "metodika" });
  }, []);

  // Listen for events from the iframe
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data.event === "booking-completed") {
        trackWithGTM("booking_completed");
      }
    }

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  if (url == null) {
    return;
  }

  return (
    <IframeResizer
      license={NEXT_PUBLIC_IFRAME_RESIZER_LICENSE_KEY}
      className={css.iframe}
      src={url}
    />
  );
}

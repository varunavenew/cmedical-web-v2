"use client";

import { trackWithGTM } from "@/src/lib/tracking";
import classNames from "classnames";
import { FC, useEffect, useMemo, useRef } from "react";

if (!process.env.NEXT_PUBLIC_PATIENTSKY_IFRAME_URL)
  throw new Error(
    "Missing environment variable: NEXT_PUBLIC_PATIENTSKY_IFRAME_URL"
  );
const NEXT_PUBLIC_PATIENTSKY_IFRAME_URL =
  process.env.NEXT_PUBLIC_PATIENTSKY_IFRAME_URL;

interface Props {
  serviceProviderId: string;
  calendarId?: string;
  className?: string;
}

interface ResizeExternalBookingMessageData {
  height: number;
  type: "resizeExternalBooking";
}

const isResizeExternalBookingMessage = (
  data: any
): data is ResizeExternalBookingMessageData =>
  data.type === "resizeExternalBooking";

export const PatientskyIframe: FC<Props> = ({
  serviceProviderId,
  calendarId,
  className,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Initial tracking
  useEffect(() => {
    trackWithGTM("booking_init", { booking_method: "pasientsky" });
  }, []);

  // Listen for events from the iframe
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data.event === "booking-completed") {
        trackWithGTM("booking_completed");
      }

      if (isResizeExternalBookingMessage(event.data) && iframeRef.current) {
        iframeRef.current.height = event.data.height.toString();
      }
    }

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const url = useMemo(() => {
    const url = new URL(
      "/embedded/planner/booking",
      NEXT_PUBLIC_PATIENTSKY_IFRAME_URL
    );
    url.searchParams.set("serviceProviderId", serviceProviderId);
    if (calendarId) url.searchParams.set("calendarId", calendarId);
    return url;
  }, [serviceProviderId, calendarId]);

  return (
    <iframe
      className={classNames("w-full min-h-screen", className)}
      src={url.toString()}
      ref={iframeRef}
      scrolling="no"
    />
  );
};

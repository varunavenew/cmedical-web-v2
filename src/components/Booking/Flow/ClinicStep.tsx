import { BookingClinicsQueryResult } from "@/sanity/lib/queries";
import { trackWithGTM } from "@/src/lib/tracking";
import { CHOOSE_CLINIC } from "@/src/translations/booking";
import { t } from "@/src/translations/get-translation";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { MapPin, ChevronRight, ExternalLink } from "lucide-react";
import { Loader } from "../Loader";

interface ServiceData {
  name: string;
  slug: string;
  price?: string;
  duration?: string;
}

interface Props {
  language: string;
  clinicLanguage: "no" | "se";
  categorySlug: string;
  selectedService?: ServiceData;
  onSelect: (bookingData?: BookingClinicsQueryResult[number]) => void;
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export const ClinicStep: FC<Props> = ({
  language,
  clinicLanguage,
  categorySlug,
  selectedService,
  onSelect,
}) => {
  const [clinics, setClinics] = useState<BookingClinicsQueryResult>();
  const [error, setError] = useState(false);

  useEffect(() => {
    const url = new URL("/api/booking/clinics", location.origin);
    url.searchParams.set("language", language);
    url.searchParams.set("clinicLanguage", clinicLanguage);
    url.searchParams.set("categorySlug", categorySlug);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log('clinics', data);
        setClinics(data as BookingClinicsQueryResult);
        console.log('clinics2', clinics);
      })
      .catch((e) => {
        console.error('error', e);
        setError(true);
      });
  }, [language, clinicLanguage, categorySlug]);

  if (error) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-light text-foreground mb-6">
          {t(CHOOSE_CLINIC, language)}
        </h2>
        <div className="p-4 bg-red-50 rounded-lg text-center">
          <p className="text-red-600">
            Kunne ikke laste klinikker. Vennligst prøv igjen senere.
          </p>
        </div>
      </div>
    );
  }

  if (!clinics) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-light text-foreground mb-6">
          {t(CHOOSE_CLINIC, language)}
        </h2>
        <Loader />
      </div>
    );
  }

  const availableClinics = clinics.filter((clinic) => {
    // Don't include closed clinics we haven't explicitly said should be included
    if (
      clinic.booking != null &&
      clinic.booking.method === "closed" &&
      clinic.booking.showDescriptionWhenClosed !== true
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-light text-foreground mb-2">
          {t(CHOOSE_CLINIC, language)}
        </h2>
        {selectedService && (
          <p className="text-muted-foreground text-sm">
            {selectedService.name}
            {selectedService.price && selectedService.price !== "0" && (
              <span className="ml-2">
                fra kr {selectedService.price},-
              </span>
            )}
            {selectedService.duration && (
              <span className="ml-2 text-muted-foreground/70">
                • {selectedService.duration}
              </span>
            )}
          </p>
        )}
      </div>

      {availableClinics.length === 0 ? (
        <div className="p-6 bg-white rounded-lg text-center">
          <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">
            Ingen klinikker tilbyr denne tjenesten for øyeblikket.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {availableClinics.map((clinic) => {
            // Handle external booking redirects
            if (
              clinic.booking != null &&
              clinic.booking.externalBookingUrl != null &&
              clinic.booking.redirectToExternalBookingUrl === true
            ) {
              return (
                <Link
                  key={clinic.title}
                  href={clinic.booking.externalBookingUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="w-full flex items-center gap-4 p-4 bg-white rounded-lg hover:bg-muted/30 transition-colors text-left group border border-transparent hover:border-foreground/20"
                >
                  <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-normal text-foreground flex items-center gap-2">
                      {clinic.title}
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </p>
                    {clinic.contactInfo.address && (
                      <p className="text-sm text-muted-foreground">
                        {clinic.contactInfo.address}
                      </p>
                    )}
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </Link>
              );
            }

            // Regular clinic selection
            return (
              <button
                key={clinic.title}
                onClick={() => {
                  trackWithGTM("booking_select_clinic", {
                    booking_method: clinic.booking?.method ?? "",
                    clinic_name: clinic.title,
                  });
                  onSelect(clinic);
                }}
                className="w-full flex items-center gap-4 p-4 bg-white rounded-lg hover:bg-muted/30 transition-colors text-left group border border-transparent hover:border-foreground/20"
              >
                <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-normal text-foreground">{clinic.title}</p>
                  {clinic.contactInfo.address && (
                    <p className="text-sm text-muted-foreground">
                      {clinic.address}
                    </p>
                  )}
                  {clinic.booking?.method === "closed" && (
                    <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                      Stengt for booking
                    </span>
                  )}
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 group-hover:translate-x-1 transition-transform" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
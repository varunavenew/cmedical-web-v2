import {
  BookingClinicDataQueryResult,
  BookingClinicsQueryResult,
  BookingSpecialistDataQueryResult,
} from "@/sanity/lib/queries";
import { throwOnNotOk } from "@/src/lib/throwOnNotOk";
import { BOOKING } from "@/src/translations/booking";
import { t } from "@/src/translations/get-translation";
import { Dialog, Transition } from "@headlessui/react";
import { useParams } from "next/navigation";
import { ComponentProps, FC, Fragment, useEffect, useState } from "react";
import { Loader } from "./Loader";
import { BookingFlow } from "./Flow/BookingFlow";
import { SelectFlowStep } from "./SelectFlowStep";

export const BookingPanel: FC<{
  show: boolean;
  clinicSlug?: string | null;
  specialistSlug?: string | null;
  onClose: () => void;
}> = ({ show, clinicSlug, specialistSlug, onClose }) => {
  const { language } = useParams<{ language: string }>();
  const [clinicLanguage, setClinicLanguage] = useState<"no" | "se" | undefined>(
    isValidClinicLanguage(language) ? language : undefined
  );
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState<
    | BookingSpecialistDataQueryResult
    | BookingClinicDataQueryResult
    | BookingClinicsQueryResult[number]
  >();

  // Close the booking panel when the user presses the escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  useEffect(() => {
    if (!clinicSlug || !specialistSlug) {
      return;
    }

    // load clinic and specialist booking data to determine which flow to use if any
    const url = new URL("/api/booking", location.origin);
    url.searchParams.set("language", language);

    if (clinicSlug) {
      url.searchParams.set("clinic", clinicSlug);
    }

    if (specialistSlug) {
      url.searchParams.set("specialist", specialistSlug);
    }

    setLoading(true);
    fetch(url)
      .then(
        throwOnNotOk<
          BookingSpecialistDataQueryResult | BookingClinicDataQueryResult
        >
      )
      .then((data) => {
        setBookingData(data);
      })
      .catch(() => {
        console.warn(
          "Could not find booking info for clinic and/or specialist",
          clinicSlug,
          specialistSlug
        );
        setBookingData(undefined);
      })
      .finally(() => setLoading(false));
  }, [clinicSlug, specialistSlug, language]);

  const handleSelectClinicLanguage: ComponentProps<
    typeof SelectFlowStep
  >["onSelect"] = (selectedLanguage) => {
    setClinicLanguage(selectedLanguage);
  };

  return (
    <Transition show={show} as={Fragment}>
      <Dialog onClose={onClose}>
        <div className="fixed top-0 left-0 right-0 z-50">
          <Transition.Child
            enterFrom="translate-y-full"
            enter="transition-transform duration-300"
            leaveTo="translate-y-full"
            leave="transition-transform duration-300"
            as={Fragment}
          >
            <Dialog.Panel>
              <Dialog.Title className="sr-only">
                {t(BOOKING, language)}
              </Dialog.Title>
              {loading ? (
                <Loader />
              ) : clinicLanguage != null ? (
                <BookingFlow
                  language={language}
                  clinicLanguage={clinicLanguage}
                  initialBookingData={bookingData}
                  onClose={onClose}
                  onBack={
                    language === "en"
                      ? () => {
                          setClinicLanguage(undefined);
                        }
                      : undefined
                  }
                />
              ) : (
                <SelectFlowStep
                  language={language}
                  onSelect={handleSelectClinicLanguage}
                  onClose={onClose}
                />
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

function isValidClinicLanguage(language: string): language is "no" | "se" {
  return language === "no" || language === "se";
}

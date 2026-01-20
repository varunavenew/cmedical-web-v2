import { ComponentProps, FC, useEffect, useState } from "react";
import { Booking } from "@/src/lib/webdoc/types";
import { Image } from "../../Image";
import { PortableText } from "@portabletext/react";
import { ClipText } from "../ClipText";
import { BookingStep } from "../BookingStep";
import { formatBookingDateTime } from "../../../lib/formatBookingDateTime";
import { Loader } from "../Loader";

interface Props {
  language: string;
  clinicId: string;
  bookingTypeId: string | number;
  onSelect: (value: Booking) => void;
}
export const SpecialistTimeStep: FC<Props> = ({
  language,
  clinicId,
  bookingTypeId,
  onSelect,
}) => {
  const [specialists, setSpecialists] = useState<CaregiverSpecialist[]>();

  useEffect(() => {
    // load timeslots
    const url = new URL(`${location.origin}/api/booking/se/timeslots`);
    url.searchParams.set("clinic", clinicId);
    url.searchParams.set("bookingType", bookingTypeId.toString());
    url.searchParams.set("language", language);
    setSpecialists(undefined);
    fetch(url)
      .then((res) => res.json())
      .then(setSpecialists)
      // TODO: handle errors
      .catch(console.error);
  }, [clinicId, bookingTypeId]);

  return (
    <BookingStep
      language={language}
      className="max-w-[35rem]"
      title="Velg spesialist og tidspunkt"
    >
      {specialists ? (
        specialists.map((specialist) => (
          <div key={specialist.caregiverId} className="flex flex-col gap-40">
            <div className="flex gap-40 items-center">
              <div className="aspect-portrait w-160 shrink-0 rounded-10 overflow-hidden">
                {specialist?.primaryImage?.image && (
                  <Image
                    image={specialist?.primaryImage?.image}
                    alt={specialist?.primaryImage?.alt}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div>
                <p className="mb-25">{specialist.name}</p>
                <ClipText>
                  <PortableText value={specialist.description} />
                </ClipText>
              </div>
            </div>
            <div className="flex gap-10 justify-center flex-wrap">
              {specialist.timeslots.map((timeslot) => (
                <button
                  key={timeslot.id}
                  className="pill bg-white/30 hover:bg-yellow focus-visible:bg-yellow flex gap-10"
                  onClick={() => onSelect(timeslot)}
                >
                  🕣{" "}
                  <span className="first-letter:uppercase">
                    {formatBookingDateTime(timeslot, language)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))
      ) : (
        <Loader />
      )}
    </BookingStep>
  );
};

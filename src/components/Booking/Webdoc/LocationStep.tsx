import { ComponentProps, FC, useEffect, useState } from "react";
import { BookingButton } from "../BookingButton";
import { Clinic } from "@/src/lib/webdoc/types";
import { BookingStep } from "../BookingStep";
import { Loader } from "../Loader";

interface Props {
  language: string;
  onSelect: (value: Clinic) => void;
}
export const LocationStep: FC<Props> = ({ language, onSelect }) => {
  const [clinics, setClinics] = useState<Clinic[]>();

  useEffect(() => {
    // load clinics
    // TODO: how do we determine if a service is part of a certain category?
    // TODO: show only those with hasSelfService == true?
    fetch("/api/booking/se/clinics")
      .then((res) => res.json())
      .then(setClinics)
      // TODO: handle errors
      .catch(console.error);
  }, []);

  return (
    <BookingStep language={language} className="max-w-400" title="Velg område">
      {clinics ? (
        clinics.map((clinic) => (
          <BookingButton onClick={() => onSelect(clinic)} key={clinic.id}>
            <p className="text-center mb-40">{clinic.name}</p>
          </BookingButton>
        ))
      ) : (
        <Loader />
      )}
    </BookingStep>
  );
};

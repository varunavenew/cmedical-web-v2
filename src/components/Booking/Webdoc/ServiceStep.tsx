import { ComponentProps, FC, useEffect, useState } from "react";
import { BookingButton } from "../BookingButton";
import { BookingType } from "@/src/lib/webdoc/types";
import { BookingStep } from "../BookingStep";
import { Loader } from "../Loader";

interface Props {
  language: string;
  onSelect: (value: string | number) => void;
}
export const ServiceStep: FC<Props> = ({ language, onSelect }) => {
  const [services, setServices] = useState<BookingType[]>();

  useEffect(() => {
    // load services
    // TODO: how do we determine if a service is part of a certain category?
    // TODO: show only those with hasSelfService == true?
    fetch("/api/booking/se/services")
      .then((res) => res.json())
      .then(setServices)
      // TODO: handle errors
      .catch(console.error);
  }, []);

  return (
    <BookingStep
      language={language}
      className="max-w-400"
      title="Velg tjeneste"
    >
      {services ? (
        services.map((service) => (
          <BookingButton onClick={() => onSelect(service.id)} key={service.id}>
            <p className="text-center mb-40">{service.externallyVisibleName}</p>
          </BookingButton>
        ))
      ) : (
        <Loader />
      )}
    </BookingStep>
  );
};

import { FC, useCallback, useState } from "react";
import { BookingTypeStep } from "./BookingTypeStep";
import { CategoryStep } from "../CategoryStep";
import { ServiceStep } from "./ServiceStep";
import { LocationStep } from "./LocationStep";
import { Booking, Clinic } from "@/src/lib/webdoc/types";
import { SpecialistTimeStep } from "./SpecialistTimeStep";
import { PatientInfoStep } from "./PatientInfoStep";
import { Loader } from "../Loader";
import { ConfirmationStep } from "./ConfirmationStep";
import { FlowContainer } from "../FlowContainer";

const BG_COLORS = [
  "bg-skin1",
  "bg-skin2",
  "bg-skin4",
  "bg-skin3",
  "bg-skin2",
  "bg-skin1",
  "bg-yellow",
  "bg-yellow",
];

interface Props {
  language: string;
  onClose: () => void;
  onBack?: () => void;
}

export const BookingFlow: FC<Props> = ({ language, onClose, onBack }) => {
  const [step, setStep] = useState(0);
  const [bookingType, setBookingType] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [service, setService] = useState<string | number>();
  const [location, setLocation] = useState<Clinic>();
  const [timeslot, setTimeslot] = useState<Booking>();
  const [patientInfo, setPatientInfo] = useState<BookingPatientInfo>();
  const [booking, setBooking] = useState<Booking>();
  const handleBack = useCallback(
    () => setStep((old) => Math.max(0, old - 1)),
    []
  );

  const handleSubmit = (info: BookingPatientInfo) => {
    setPatientInfo(info);
    setStep(6);
    // create booking
    const { birthdate, ...patientInfoNoPersonalNumber } = info;
    if (!timeslot) {
      // booking is missing, something's wrong
      setStep(location ? 4 : 3);
      return;
    }
    fetch("/api/booking/se", {
      headers: {
        pnr: birthdate, // using header to prevent sensitive info from showing up in request logs
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        person: patientInfoNoPersonalNumber,
        bookingId: timeslot.id,
        clinic: location,
      }),
    })
      .then((res) => res.json())
      .then(setBooking)
      .then(() => setStep(7))
      .catch((err) => {
        // TODO: handle error
        console.error(err);
        alert("something went wrong");
        setStep(5);
      });
  };

  return (
    <FlowContainer
      language={language}
      progress={step !== 6 ? step + 1 : undefined}
      maxProgress={BG_COLORS.length}
      onClose={onClose}
      onBack={step === 0 ? onBack : handleBack}
      className={BG_COLORS[step]}
    >
      {step === 0 && (
        <BookingTypeStep
          language={language}
          onSetBookingType={(type) => {
            setBookingType(type);
            setStep(1);
          }}
        />
      )}
      {step === 1 && (
        <CategoryStep
          language={language}
          clinicLanguage="se"
          onSelect={(value) => {
            setCategory(value);
            setStep(2);
          }}
        />
      )}
      {step === 2 && (
        <ServiceStep
          language={language}
          onSelect={(value) => {
            setService(value);
            setStep(3);
          }}
        />
      )}
      {step === 3 && (
        <LocationStep
          language={language}
          onSelect={(value) => {
            setLocation(value);
            setStep(4);
          }}
        />
      )}
      {step === 4 && location && service && (
        <SpecialistTimeStep
          language={language}
          clinicId={location.id}
          bookingTypeId={service}
          onSelect={(value) => {
            setTimeslot(value);
            setStep(5);
          }}
        />
      )}
      {step === 5 && (
        <PatientInfoStep language={language} onSubmit={handleSubmit} />
      )}
      {step === 6 && <Loader />}
      {step === 7 && booking && location && (
        <ConfirmationStep
          language={language}
          booking={booking}
          clinic={location}
        />
      )}
    </FlowContainer>
  );
};

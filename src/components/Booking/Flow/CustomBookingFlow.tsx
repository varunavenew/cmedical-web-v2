import { FC, useEffect, useMemo, useState } from "react";
import { format, addDays } from "date-fns";
import { nb } from "date-fns/locale";
import { Calendar as CalendarIcon, Clock, Check, Info } from "lucide-react";
import { Calendar as CalendarComponent } from "../../ui/calendar";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Checkbox } from "../../ui/checkbox";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../ui/avatar";
import {
  Dialog,
  DialogContent,
} from "../../ui/dialog";
import { cn } from "../../../lib/utils";

import {
  BookingClinicDataQueryResult,
  BookingClinicsQueryResult,
  BookingSpecialistDataQueryResult,
} from "../../../../sanity/lib/queries";

type BookingParentData =
  | BookingSpecialistDataQueryResult
  | BookingClinicDataQueryResult
  | BookingClinicsQueryResult[number];

type ServiceData = {
  name: string;
  slug: string;
  price?: string;
  duration?: string;
};

type Specialist = {
  _id: string;
  name: string;
  slug: string;
  title?: string;
  image?: string;
  bio?: string;
  expertise?: string[];
  languages?: string[];
  clinics?: string[];
  education?: string;
  experience?: string;
};

type TimeSlot = {
  time: string;
  specialist: Specialist;
};

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  birthNumber: string;
  acceptTerms: boolean;
};

type Props = {
  language: string;
  clinicLanguage: "no" | "se";
  bookingData: BookingParentData;
  selectedService?: ServiceData;
  currentSubStep: "time" | "confirm" | "success";
  onSubStepChange?: (subStep: "time" | "confirm" | "success") => void;
};

// Generate mock available times for a date – same logic as in BookingDemo
const generateTimeSlots = (
  date: Date,
  specialists: Specialist[]
): TimeSlot[] => {
  const baseSlots = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
  ];
  const dayOfWeek = date.getDay();

  if (dayOfWeek === 0 || dayOfWeek === 6) return [];

  const slots = baseSlots
    .slice(0, 6 + Math.floor(Math.random() * 6))
    .map((time) => ({
      time,
      specialist:
        specialists[Math.floor(Math.random() * specialists.length)],
    }));

  return slots;
};

export const CustomBookingFlow: FC<Props> = ({
  language,
  clinicLanguage,
  bookingData,
  selectedService,
  currentSubStep,
  onSubStepChange,
}) => {
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    addDays(new Date(), 1)
  );
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [selectedSpecialist, setSelectedSpecialist] =
    useState<Specialist | null>(null);
  const [selectedSpecialistInfo, setSelectedSpecialistInfo] =
    useState<Specialist | null>(null);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    birthNumber: "",
    acceptTerms: false,
  });

  // Fetch specialists (same API as BookingDemo)
  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        const response = await fetch(
          `/api/booking/specialists?language=${language}`
        );
        if (response.ok) {
          const data = await response.json();
          setSpecialists(data.slice(0, 8));
        }
      } catch (error) {
        console.error("Error fetching specialists:", error);
      }
    };

    fetchSpecialists();
  }, [language]);

  const availableSlots: TimeSlot[] = useMemo(
    () =>
      selectedDate && specialists.length > 0
        ? generateTimeSlots(selectedDate, specialists)
        : [],
    [selectedDate, specialists]
  );

  const handleSelectTimeSlot = (time: string, specialist: Specialist) => {
    setSelectedTime(time);
    setSelectedSpecialist(specialist);
    if (onSubStepChange) {
      onSubStepChange("confirm");
    }
  };

  const handleSubmit = () => {
    if (
      !formData.acceptTerms ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.phone ||
      !formData.birthNumber
    ) {
      return;
    }

    if (onSubStepChange) {
      onSubStepChange("success");
    }
  };

  // Step 3: Select date & time
  if (currentSubStep === "time") {
    return (
      <div className="space-y-15">
        <h2 className="text-2xl font-light text-foreground mb-15">
          Velg tid
        </h2>

        {/* Calendar */}
        <div className="bg-white rounded-lg p-15">
          <div className="flex items-center gap-7 mb-15">
            <CalendarIcon className="w-5 h-5 text-foreground" />
            <span className="font-normal">Velg dato</span>
          </div>
          <CalendarComponent
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) =>
              date < new Date() ||
              date.getDay() === 0 ||
              date.getDay() === 6
            }
            className="!w-full"
            locale={nb as any}
          />
        </div>

        {/* Time Slots */}
        {selectedDate && (
          <div className="bg-white rounded-lg p-15">
            <div className="flex items-center gap-7 mb-15">
              <Clock className="w-5 h-5 text-foreground" />
              <span className="font-normal capitalize">
                {format(selectedDate, "EEEE d. MMMM", { locale: nb })}
              </span>
            </div>

            {availableSlots.length > 0 ? (
              <div className="grid grid-cols-7 sm:grid-cols-3 gap-15">
                {availableSlots.map((slot, index) => (
                  <div key={index} className="relative">
                    <button
                      onClick={() =>
                        handleSelectTimeSlot(slot.time, slot.specialist)
                      }
                      className="flex flex-col items-center p-5 border border-border/30 rounded-lg hover:bg-muted/30 hover:border-foreground/30 transition-all w-full"
                    >
                      <Avatar className="h-16 w-16 mb-3">
                        <AvatarImage
                          src={slot.specialist.image}
                          alt={slot.specialist.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="text-sm">
                          {slot.specialist.name.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-normal text-foreground mb-1">
                        {slot.specialist.name}
                      </span>
                      <span className="text-xs text-muted-foreground mb-7">
                        {slot.specialist.title}
                      </span>
                      <span className="font-medium text-lg text-foreground">
                        {slot.time}
                      </span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSpecialistInfo(slot.specialist);
                      }}
                      className="absolute top-7 right-7 w-6 h-6 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
                      aria-label={`Les mer om ${slot.specialist.name}`}
                    >
                      <Info className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CalendarIcon className="w-40 h-40 text-muted-foreground mx-auto mb-7" />
                <p className="text-muted-foreground">
                  Ingen ledige timer denne dagen
                </p>
              </div>
            )}
          </div>
        )}

        {/* Specialist Info Dialog */}
        <Dialog
          open={!!selectedSpecialistInfo}
          onOpenChange={(open) => !open && setSelectedSpecialistInfo(null)}
        >
          <DialogContent className="sm:max-w-2xl bg-brand-beige border-none p-0 overflow-hidden">
            {selectedSpecialistInfo && (
              <div className="flex flex-col">
                <div className="relative pt-8 pb-6 px-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="h-28 w-28 rounded-full overflow-hidden ring-4 ring-white shadow-xl">
                        <img
                          src={selectedSpecialistInfo.image || ""}
                          alt={selectedSpecialistInfo.name}
                          className="h-full w-full object-cover object-top"
                        />
                      </div>
                    </div>

                    <div className="flex-1 pt-2">
                      <h3 className="text-2xl font-normal text-foreground tracking-tight">
                        {selectedSpecialistInfo.name}
                      </h3>
                      <p className="text-base text-muted-foreground mt-1 font-light">
                        {selectedSpecialistInfo.title}
                      </p>

                      {selectedSpecialistInfo.expertise &&
                        selectedSpecialistInfo.expertise.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {selectedSpecialistInfo.expertise.map(
                              (exp, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 text-sm font-light bg-white/60 text-foreground/80 rounded-full"
                                >
                                  {exp}
                                </span>
                              )
                            )}
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                <div className="px-8 pb-8 space-y-5">
                  {selectedSpecialistInfo.bio && (
                    <div>
                      <p className="text-base text-muted-foreground font-light leading-relaxed">
                        {selectedSpecialistInfo.bio}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-foreground/10">
                    {selectedSpecialistInfo.languages &&
                      selectedSpecialistInfo.languages.length > 0 && (
                        <div className="bg-white/50 rounded-xl p-4">
                          <p className="text-xs uppercase tracking-wider text-foreground/60 mb-1.5">
                            Språk
                          </p>
                          <p className="text-sm text-foreground font-light">
                            {selectedSpecialistInfo.languages.join(", ")}
                          </p>
                        </div>
                      )}
                    {selectedSpecialistInfo.clinics &&
                      selectedSpecialistInfo.clinics.length > 0 && (
                        <div className="bg-white/50 rounded-xl p-4">
                          <p className="text-xs uppercase tracking-wider text-foreground/60 mb-1.5">
                            Klinikk
                          </p>
                          <p className="text-sm text-foreground font-light">
                            {selectedSpecialistInfo.clinics.join(", ")}
                          </p>
                        </div>
                      )}
                    {selectedSpecialistInfo.education && (
                      <div className="bg-white/50 rounded-xl p-4">
                        <p className="text-xs uppercase tracking-wider text-foreground/60 mb-1.5">
                          Utdanning
                        </p>
                        <p className="text-sm text-foreground font-light">
                          {selectedSpecialistInfo.education}
                        </p>
                      </div>
                    )}
                    {selectedSpecialistInfo.experience && (
                      <div className="bg-white/50 rounded-xl p-4">
                        <p className="text-xs uppercase tracking-wider text-foreground/60 mb-1.5">
                          Erfaring
                        </p>
                        <p className="text-sm text-foreground font-light">
                          {selectedSpecialistInfo.experience}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Step 4: Confirm & personal info
  if (currentSubStep === "confirm") {
    const hasAllFormFields =
      formData.acceptTerms &&
      !!formData.firstName &&
      !!formData.lastName &&
      !!formData.phone &&
      !!formData.birthNumber;

    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-light text-foreground mb-15">
          Bekreft
        </h2>

        {/* Summary Card */}
        <div className="bg-white rounded-lg p-15">
          <h3 className="font-normal text-3xl mb-15">Din bestilling</h3>
          <div className="grid grid-cols-7 gap-15 text-sm">
            <div>
              <span className="text-muted-foreground text-sm uppercase tracking-wider">
                Tjeneste
              </span>
              <p className="font-normal mt-1">{selectedService?.name}</p>
            </div>
            <div>
              <span className="text-muted-foreground text-sm uppercase tracking-wider">
                Pris
              </span>
              <p className="font-normal mt-1">
                {selectedService?.price === "0" || !selectedService?.price
                  ? "Gratis"
                  : `${selectedService?.price} kr`}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground text-sm uppercase tracking-wider">
                Klinikk
              </span>
              <p className="font-normal mt-1">{bookingData.title}</p>
            </div>
            <div>
              <span className="text-muted-foreground text-sm uppercase tracking-wider">
                Varighet
              </span>
              <p className="font-normal mt-1">
                {selectedService?.duration || "30 minutter"}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground text-xs uppercase tracking-wider">
                Dato
              </span>
              <p className="font-normal mt-1 capitalize">
                {selectedDate &&
                  format(selectedDate, "EEEE d. MMMM", { locale: nb })}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground text-xs uppercase tracking-wider">
                Tid
              </span>
              <p className="font-normal mt-1">{selectedTime}</p>
            </div>
          </div>
          {selectedSpecialist && (
            <div className="flex items-center gap-3 mt-5 pt-15 border-t border-border/20">
              <Avatar className="h-40 w-40">
                <AvatarImage
                  src={selectedSpecialist.image}
                  alt={selectedSpecialist.name}
                />
                <AvatarFallback>
                  {selectedSpecialist.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-normal">{selectedSpecialist.name}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedSpecialist.title}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Personal Info Form */}
        <div className="bg-white rounded-lg p-5">
          <h3 className="font-normal text-lg mb-15">Dine opplysninger</h3>
          <div className="space-y-15">
            <div className="grid grid-cols-7 gap-3">
              <div>
                <label className="text-sm text-muted-foreground">
                  Fornavn *
                </label>
                <Input
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  placeholder="Fornavn"
                  className="mt-1.5 h-12 w-full rounded-lg border-border/50"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">
                  Etternavn *
                </label>
                <Input
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  placeholder="Etternavn"
                  className="mt-1.5 h-12 w-full rounded-lg border-border/50"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">
                Telefon *
              </label>
              <Input
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="Telefonnummer"
                type="tel"
                className="mt-1.5 h-12 rounded-lg border-border/50"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">
                Fødselsnummer (11 siffer) *
              </label>
              <Input
                value={formData.birthNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    birthNumber: e.target.value,
                  })
                }
                placeholder="DDMMÅÅXXXXX"
                maxLength={11}
                className="mt-1.5 h-12 rounded-lg border-border/50"
              />
            </div>
            <div className="flex items-start gap-3 pt-7">
              <Checkbox
                id="terms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    acceptTerms: checked as boolean,
                  })
                }
                className="mt-0.5 p-7"
              />
              <label
                htmlFor="terms"
                className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
              >
                Jeg godtar vilkårene og samtykker til behandling av
                personopplysninger *
              </label>
            </div>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!hasAllFormFields}
          className={cn(
            "w-full h-14 rounded-lg text-base font-normal transition-all",
            hasAllFormFields
              ? "bg-foreground text-background hover:bg-foreground/90"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          Bekreft bestilling
        </Button>
      </div>
    );
  }

  // Success screen (same visual style as BookingDemo)
  if (currentSubStep === "success") {
    return (
      <div className="min-h-[60vh] bg-[#f5f4f0] flex items-center justify-center p-6 rounded-xl">
        <div className="max-w-lg w-full text-center">
          <div className="w-20 h-20 rounded-full bg-foreground flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-background" />
          </div>

          <h1 className="text-3xl font-light text-foreground mb-2">
            Bestilling bekreftet
          </h1>
          <p className="text-muted-foreground mb-8 font-light">
            Du vil motta en bekreftelse på SMS og e-post.
          </p>

          <Button
            onClick={() => {
              // Mirror BookingDemo behaviour: go back to front page for language
              window.location.href = `/${language}`;
            }}
            className="bg-foreground text-background hover:bg-foreground/90 px-8 py-3 rounded-lg font-normal"
          >
            Tilbake til forsiden
          </Button>
        </div>
      </div>
    );
  }

  return null;
};


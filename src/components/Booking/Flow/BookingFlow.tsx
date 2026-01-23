import {
  BookingClinicDataQueryResult,
  BookingClinicsQueryResult,
  BookingSpecialistDataQueryResult,
} from "@/sanity/lib/queries";
import { trackWithGTM } from "@/src/lib/tracking";
import { FC, useCallback, useState } from "react";
import { CategoryStep } from "../CategoryStep";
import { Loader } from "../Loader";
import { ClinicStep } from "./ClinicStep";
import { FinalStep } from "./FinalStep";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, Check } from "lucide-react";

const BG_COLORS = ["bg-skin2", "bg-skin3", "bg-white"];
const BG_COLORS_INFO = ["bg-skin2", "bg-skin3", "bg-yellow"];

interface Props {
  language: string;
  clinicLanguage: "no" | "se";
  initialBookingData?:
    | BookingSpecialistDataQueryResult
    | BookingClinicDataQueryResult
    | BookingClinicsQueryResult[number];
  onClose: () => void;
  onBack?: () => void;
}

interface ServiceData {
  name: string;
  slug: string;
  price?: string;
  duration?: string;
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export const BookingFlow: FC<Props> = ({
  language,
  clinicLanguage,
  initialBookingData,
  onClose,
  onBack,
}) => {
  const [step, setStep] = useState(initialBookingData ? 2 : 0);
  const [categorySlug, setCategorySlug] = useState<string>();
  const [selectedService, setSelectedService] = useState<ServiceData>();
  const [bookingData, setBookingData] = useState(initialBookingData);

  const handleBack = useCallback(() => {
    trackWithGTM("booking_back");
    setStep((old) => Math.max(0, old - 1));
  }, []);

  console.log('bookingData', bookingData);
  console.log('categorySlug', categorySlug);
  console.log('selectedService', selectedService);
  console.log('step', step);
  console.log('initialBookingData', initialBookingData);

  const resetStep = (targetStep: number) => {
    setStep(targetStep);
    if (targetStep === 0) {
      setCategorySlug(undefined);
      setSelectedService(undefined);
      setBookingData(undefined);
    } else if (targetStep === 1) {
      setBookingData(undefined);
    }
  };

  // When this is a shortcut from a clinic or specialist page, do not show the back button
  const backHandler = initialBookingData
    ? undefined
    : step === 0
      ? onBack
      : handleBack;

  const backgroundColor = getBackgroundColor({
    bookingMethod: bookingData?.booking?.method,
    step,
  });

  const totalSteps = 3;
  const currentStep = step + 1;

  return (
    <div className="min-h-screen bg-[#f5f4f0]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-foreground">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-background" />
          </button>
          <span className="text-sm tracking-wide text-background/90 uppercase">
            Bestill time
          </span>
          <div className="w-9" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Step Indicator - Clickable */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((s) => {
            const stepIndex = s - 1;
            const canNavigate = currentStep > s;
            const isCurrentStep = currentStep === s;
            const isCompleted = currentStep > s;

            return (
              <div key={s} className="flex items-center">
                <button
                  onClick={() => {
                    if (canNavigate && !initialBookingData) {
                      resetStep(stepIndex);
                    }
                  }}
                  disabled={(!canNavigate && !isCurrentStep) || !!initialBookingData}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 border-2",
                    isCurrentStep
                      ? "bg-foreground text-background border-foreground"
                      : isCompleted
                        ? "bg-foreground/20 text-foreground border-foreground/20 hover:bg-foreground/30 cursor-pointer"
                        : "bg-muted/50 text-muted-foreground/50 border-muted/50 cursor-not-allowed",
                    initialBookingData && "cursor-not-allowed"
                  )}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : s}
                </button>
                {s < totalSteps && (
                  <div
                    className={cn(
                      "w-10 h-[2px] transition-colors duration-300",
                      isCompleted ? "bg-foreground/30" : "bg-muted/40"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CategoryStep
                language={language}
                clinicLanguage={clinicLanguage}
                onSelect={(categorySlug, service) => {
                  setCategorySlug('Fertilitet');
                  setSelectedService(service);
                  setStep(1);
                }}
              />
            </motion.div>
          )}

          {step === 1 && categorySlug && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {backHandler && (
                <button
                  onClick={backHandler}
                  className="flex items-center gap-1.5 text-sm text-foreground hover:text-foreground/70 transition-colors mb-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="underline">Tilbake</span>
                </button>
              )}
              <ClinicStep
                language={language}
                clinicLanguage={clinicLanguage}
                treatmentSlug={categorySlug}
                selectedService={selectedService}
                onSelect={(clinic) => {
                  setBookingData(clinic);
                  setStep(2);
                }}
              />
            </motion.div>
          )}

          {step === 2 && bookingData && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {backHandler && !initialBookingData && (
                <button
                  onClick={backHandler}
                  className="flex items-center gap-1.5 text-sm text-foreground hover:text-foreground/70 transition-colors mb-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="underline">Tilbake</span>
                </button>
              )}
              <FinalStep
                language={language}
                clinicLanguage={clinicLanguage}
                bookingData={bookingData}
                selectedService={selectedService}
              />
            </motion.div>
          )}

          {!categorySlug && step !== 0 && (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Loader />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

function getBackgroundColor({
  bookingMethod,
  step,
}: {
  bookingMethod?: ClinicBooking["method"];
  step: number;
}) {
  if (bookingMethod === "info" || bookingMethod === "closed") {
    return BG_COLORS_INFO[step];
  }

  return BG_COLORS[step];
}
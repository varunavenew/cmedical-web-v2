import {
  BookingClinicDataQueryResult,
  BookingClinicsQueryResult,
  BookingSpecialistDataQueryResult,
} from "@/sanity/lib/queries";
import { trackWithGTM } from "@/src/lib/tracking";
import { FC, useCallback, useState, useEffect } from "react";
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

  // Track sub-steps for custom booking (step 2 splits into 2a and 2b)
  const [customSubStep, setCustomSubStep] = useState<"time" | "confirm" | "success">("time");

  const handleBack = useCallback(() => {
    trackWithGTM("booking_back");

    // If we're in custom booking flow, handle sub-step navigation
    if ( step === 2) {
      if (customSubStep === "confirm") {
        setCustomSubStep("time");
        return;
      } else if (customSubStep === "time") {
        setStep(1);
        setBookingData(undefined);
        return;
      }
    }

    // Normal back navigation
    setStep((old) => Math.max(0, old - 1));
  }, [bookingData, step, customSubStep]);

  console.log("bookingData", bookingData);
  console.log("categorySlug", categorySlug);
  console.log("selectedService", selectedService);
  console.log("step", step);
  console.log("customSubStep", customSubStep);
  console.log("initialBookingData", initialBookingData);

  const resetStep = (targetStep: number) => {
    setStep(targetStep);
    if (targetStep === 0) {
      setCategorySlug(undefined);
      setSelectedService(undefined);
      setBookingData(undefined);
      setCustomSubStep("time");
    } else if (targetStep === 1) {
      setBookingData(undefined);
      setCustomSubStep("time");
    } else if (targetStep === 2) {
      setCustomSubStep("time");
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

  // Determine if using custom booking (4 steps) or standard (3 steps)
  // const isCustomBooking = 'true';
  const totalSteps = 4;

  // Calculate current step for indicator
  // Step 0 = Step 1 indicator
  // Step 1 = Step 2 indicator
  // Step 2 + customSubStep = Step 3/4 indicator
  let currentStep = step + 1;
  if ( step === 2) {
    if (customSubStep === "time") {
      currentStep = 3; // Step 3: Select time
    } else if (customSubStep === "confirm") {
      currentStep = 4; // Step 4: Confirm booking
    } else if (customSubStep === "success") {
      currentStep = 4; // Stay on step 4 for success
    }
  }

  return (
    <div className="h-screen bg-[#f5f4f0] flex flex-col overflow-y-auto">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-foreground">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-7 -ml-7 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-background" />
          </button>
          <span className="text-sm tracking-wide text-background/90 uppercase">
            Bestill time
          </span>
          <div className="w-40" />
        </div>
      </header>

      <main className="container mx-auto px-15 py-8 max-w-2xl">
        {/* Step Indicator - Clickable */}
        <div className="flex items-center justify-center mb-8">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => {
            const stepIndex = s - 1;
            const canNavigate = currentStep > s;
            const isCurrentStep = currentStep === s;
            const isCompleted = currentStep > s;

            return (
              <div key={s} className="flex items-center">
                <button
                  onClick={() => {
                    if (canNavigate && !initialBookingData) {
                      // For custom booking, handle sub-steps
                      if (s >= 3) {
                        if (s === 3) {
                          setStep(2);
                          setCustomSubStep("time");
                        }
                        // Can't go back to step 4 (confirm) from success
                      } else {
                        resetStep(stepIndex);
                      }
                    }
                  }}
                  disabled={
                    (!canNavigate && !isCurrentStep) ||
                    !!initialBookingData ||
                    ( s === 4 && currentStep === 4) // Can't click step 4 when on step 4
                  }
                  className={cn(
                    "w-40 h-40 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 border-2",
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
                      "w-40 h-[2px] transition-colors duration-300",
                      isCompleted ? "bg-foreground/30" : "bg-muted/40"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Select Category/Service */}
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
                  setCategorySlug(categorySlug);
                  setSelectedService(service);
                  setStep(1);
                }}
              />
            </motion.div>
          )}

          {/* Step 2: Select Clinic */}
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
                  <ArrowLeft className="w-15 h-15" />
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
                  setCustomSubStep("time"); // Reset to first sub-step
                }}
              />
            </motion.div>
          )}

          {/* Step 3/4: Final Step (iframe or custom flow) */}
          {step === 2 && bookingData && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {backHandler && !initialBookingData && customSubStep !== "success" && (
                <button
                  onClick={backHandler}
                  className="flex items-center gap-1.5 text-sm text-foreground hover:text-foreground/70 transition-colors mb-15"
                >
                  <ArrowLeft className="w-15 h-15" />
                  <span className="underline">Tilbake</span>
                </button>
              )}
              <FinalStep
                language={language}
                clinicLanguage={clinicLanguage}
                bookingData={bookingData}
                selectedService={selectedService}
                customSubStep={customSubStep}
                onCustomSubStepChange={setCustomSubStep}
              />
            </motion.div>
          )}

          {/* Loader */}
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
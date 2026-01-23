"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, X, Calendar, MapPin, Clock, Check, ChevronDown, ChevronRight, ArrowRight, Info } from "lucide-react";
import { Button } from "../ui/button";
import { Calendar as CalendarComponent } from "../ui/calendar";
import { format, addDays } from "date-fns";
import { nb } from "date-fns/locale";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";

interface BookingService {
    name: string;
    slug: string;
    price: string;
    duration: string;
}

interface BookingCategory {
    id: string;
    label: string;
    services: BookingService[];
}

interface Clinic {
    id: string;
    label: string;
    address?: string;
    phone?: string;
    email?: string;
}

interface Specialist {
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
}

interface TimeSlot {
    time: string;
    specialist: Specialist;
}

interface BookingData {
    category?: string;
    categoryId?: string;
    service?: BookingService;
    clinic?: Clinic;
    date?: Date;
    time?: string;
    specialist?: Specialist;
}

interface FormData {
    firstName: string;
    lastName: string;
    phone: string;
    birthNumber: string;
    acceptTerms: boolean;
}

// Generate mock available times for a date
const generateTimeSlots = (date: Date, specialists: Specialist[]): TimeSlot[] => {
    const baseSlots = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30"];
    const dayOfWeek = date.getDay();

    if (dayOfWeek === 0 || dayOfWeek === 6) return [];

    const slots = baseSlots.slice(0, 6 + Math.floor(Math.random() * 6)).map(time => ({
        time,
        specialist: specialists[Math.floor(Math.random() * specialists.length)]
    }));

    return slots;
};

const BookingDemo = () => {
    const router = useRouter();
    const params = useParams<{ language: string }>();
    const language = params?.language || "no";
    const clinicLanguage = language === "se" ? "se" : "no";

    const [bookingServices, setBookingServices] = useState<BookingCategory[]>([]);
    const [clinics, setClinics] = useState<Clinic[]>([]);
    const [specialists, setSpecialists] = useState<Specialist[]>([]);
    const [loading, setLoading] = useState(true);
    const [bookingData, setBookingData] = useState<BookingData>({});
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(addDays(new Date(), 1));
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const [selectedSpecialistInfo, setSelectedSpecialistInfo] = useState<Specialist | null>(null);
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        phone: "",
        birthNumber: "",
        acceptTerms: false,
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Fetch booking services
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(`/api/booking/services?language=${language}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    // Add default price and duration for services
                    const servicesWithDefaults = data.map((cat: BookingCategory) => ({
                        ...cat,
                        services: (cat.services || []).map((service: BookingService) => ({
                            ...service,
                            price: service.price || "0",
                            duration: service.duration || "30 minutter"
                        }))
                    })).filter((cat: BookingCategory) => cat.services && cat.services.length > 0);
                    setBookingServices(servicesWithDefaults);
                }
            } catch (error) {
                console.error("Error fetching services:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, [language]);

    // Fetch clinics when service is selected
    useEffect(() => {
        if (bookingData.service?.slug) {
            const fetchClinics = async () => {
                try {
                    const response = await fetch(
                        `/api/booking/clinics-for-service?language=${language}&clinicLanguage=${clinicLanguage}&treatmentSlug=${bookingData.service?.slug}`
                    );
                    if (response.ok) {
                        const data = await response.json();
                        setClinics(data);
                    }
                } catch (error) {
                    console.error("Error fetching clinics:", error);
                }
            };

            fetchClinics();
        }
    }, [bookingData.service, language, clinicLanguage]);

    // Fetch specialists
    useEffect(() => {
        const fetchSpecialists = async () => {
            try {
                const response = await fetch(`/api/booking/specialists?language=${language}`);
                if (response.ok) {
                    const data = await response.json();
                    setSpecialists(data.slice(0, 8)); // Limit to 8 specialists
                }
            } catch (error) {
                console.error("Error fetching specialists:", error);
            }
        };

        fetchSpecialists();
    }, [language]);

    const availableSlots = selectedDate && specialists.length > 0
        ? generateTimeSlots(selectedDate, specialists)
        : [];

    const handleClose = () => router.push(`/${language}`);

    const handleSelectService = (categoryId: string, categoryLabel: string, service: BookingService) => {
        setBookingData({
            ...bookingData,
            categoryId,
            category: categoryLabel,
            service,
            clinic: undefined,
            date: undefined,
            time: undefined,
            specialist: undefined
        });
    };

    const handleSelectClinic = (clinic: Clinic) => {
        setBookingData({ ...bookingData, clinic, date: undefined, time: undefined, specialist: undefined });
    };

    const handleSelectTimeSlot = (time: string, specialist: Specialist) => {
        setBookingData({ ...bookingData, date: selectedDate, time, specialist });
    };

    const handleSubmit = () => {
        if (formData.acceptTerms && formData.firstName && formData.lastName && formData.phone && formData.birthNumber) {
            setIsSubmitted(true);
        }
    };

    const resetStep = (step: 'category' | 'clinic' | 'time') => {
        if (step === 'category') {
            setBookingData({});
            setExpandedCategory(null);
        } else if (step === 'clinic') {
            setBookingData({ ...bookingData, clinic: undefined, date: undefined, time: undefined, specialist: undefined });
        } else if (step === 'time') {
            setBookingData({ ...bookingData, date: undefined, time: undefined, specialist: undefined });
        }
    };

    // Get available clinics for a category
    const getClinicsForCategory = (categoryId: string): Clinic[] => {
        // This would ideally filter clinics based on the category
        // For now, return all clinics
        return clinics;
    };

    // Confirmation screen
    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-[#f5f4f0] flex items-center justify-center p-6">
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

                    <div className="bg-white rounded-lg p-6 text-left mb-6">
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between py-2 border-b border-border/30">
                                <span className="text-muted-foreground">Behandling</span>
                                <span className="font-medium">{bookingData.service?.name}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-border/30">
                                <span className="text-muted-foreground">Klinikk</span>
                                <span className="font-medium">C Medical – {bookingData.clinic?.label}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-border/30">
                                <span className="text-muted-foreground">Dato og tid</span>
                                <span className="font-medium">{bookingData.date && format(bookingData.date, "d. MMM yyyy", { locale: nb })} kl. {bookingData.time}</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-muted-foreground">Behandler</span>
                                <span className="font-medium">{bookingData.specialist?.name}</span>
                            </div>
                        </div>
                    </div>

                    <Button
                        onClick={() => router.push(`/${language}`)}
                        className="bg-foreground text-background hover:bg-foreground/90 px-8 py-3 rounded-lg font-normal"
                    >
                        Tilbake til forsiden
                    </Button>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f5f4f0] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Laster...</p>
                </div>
            </div>
        );
    }

    const currentStep = !bookingData.service ? 1 : !bookingData.clinic ? 2 : !bookingData.time ? 3 : 4;
    const progress = ((currentStep - 1) / 3) * 100;

    return (
        <div className="min-h-screen bg-[#f5f4f0]">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-foreground">
                <div className="container mx-auto px-15 h-16 flex items-center justify-between">
                    <button
                        onClick={handleClose}
                        className="p-7 -ml-7 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-background" />
                    </button>
                    <span className="text-sm tracking-wide text-background/90 uppercase">Bestill time</span>
                    <div className="w-9" />
                </div>
            </header>
            <main className="container mx-auto px-4 py-8 max-w-2xl">
                {/* Step Indicator - Clickable */}
                <div className="flex items-center justify-center mb-8">
                    {[1, 2, 3, 4].map((step) => {
                        const canNavigate = currentStep > step;
                        return (
                            <div key={step} className="flex items-center">
                                <button
                                    onClick={() => {
                                        if (canNavigate) {
                                            if (step === 1) resetStep('category');
                                            else if (step === 2) resetStep('clinic');
                                            else if (step === 3) resetStep('time');
                                        }
                                    }}
                                    disabled={!canNavigate && currentStep !== step}
                                    className={cn(
                                        "w-40 h-40 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 border-2",
                                        currentStep === step
                                            ? "bg-foreground text-background border-foreground"
                                            : currentStep > step
                                                ? "bg-foreground/20 text-foreground border-foreground/20 hover:bg-foreground/30 cursor-pointer"
                                                : "bg-muted/50 text-muted-foreground/50 border-muted/50 cursor-not-allowed"
                                    )}
                                >
                                    {currentStep > step ? (
                                        <Check className="w-5 h-5" />
                                    ) : (
                                        step
                                    )}
                                </button>
                                {step < 4 && (
                                    <div
                                        className={cn(
                                            "w-40 h-[2px] transition-colors duration-300",
                                            currentStep > step
                                                ? "bg-foreground/30"
                                                : "bg-muted/40"
                                        )}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
                <AnimatePresence mode="wait">
                    {/* Step 1: Select Service */}
                    {!bookingData.service ? (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                        >
                            <h2 className="text-2xl font-light text-foreground text-center mb-6">
                                Velg tjeneste
                            </h2>

                            <div className="space-y-3">
                                {bookingServices.map((category) => {
                                    const availableClinicsForCategory = getClinicsForCategory(category.id);

                                    return (
                                        <div key={category.id} className="rounded-lg overflow-hidden">
                                            {/* Category Header */}
                                            <button
                                                onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                                                className={cn(
                                                    "w-full flex items-center justify-between p-15 bg-white rounded-lg transition-all",
                                                    expandedCategory === category.id && "rounded-b-none"
                                                )}
                                            >
                                                <span className="font-normal text-foreground">{category.label}</span>

                                                {/* Clinic availability badges - inline */}
                                                <div className="flex items-center gap-3 ml-auto mr-15">
                                                    <div className="flex items-center gap-1.5">
                                                        {availableClinicsForCategory.length === clinics.length && clinics.length > 0 ? (
                                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-beige text-foreground/70 font-light">
                                                                Alle klinikker
                                                            </span>
                                                        ) : availableClinicsForCategory.length > 0 ? (
                                                            availableClinicsForCategory.slice(0, 2).map((clinic) => (
                                                                <span
                                                                    key={clinic.id}
                                                                    className="text-[10px] px-7 py-0.5 rounded-full bg-brand-beige text-foreground/70 font-light"
                                                                >
                                                                    {clinic.label}
                                                                </span>
                                                            ))
                                                        ) : null}
                                                    </div>
                                                    <ChevronDown
                                                        className={cn(
                                                            "w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0",
                                                            expandedCategory === category.id && "rotate-180"
                                                        )}
                                                    />
                                                </div>
                                            </button>

                                            {/* Services List */}
                                            <AnimatePresence>
                                                {expandedCategory === category.id && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="overflow-hidden bg-white border-t border-border/10"
                                                    >
                                                        <div className="p-3 space-y-7">
                                                            {category.services.map((service, index) => (
                                                                <button
                                                                    key={index}
                                                                    onClick={() => handleSelectService(category.id, category.label, service)}
                                                                    className="w-full flex items-center justify-between p-15 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors text-left group"
                                                                >
                                                                    <div className="flex-1 pr-15">
                                                                        <span className="text-foreground">
                                                                            {service.name} {service.price !== "0" ? `fra kr ${service.price},-` : "kr 0"}
                                                                        </span>
                                                                        <span className="text-muted-foreground ml-7 text-sm">
                                                                            {service.duration}
                                                                        </span>
                                                                    </div>
                                                                    <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center flex-shrink-0">
                                                                        <ArrowRight className="w-15 h-15 text-background" />
                                                                    </div>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ) : !bookingData.clinic ? (
                        /* Step 2: Select Clinic */
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-15"
                        >
                            <button
                                onClick={() => resetStep('category')}
                                className="flex items-center gap-1.5 text-sm text-foreground hover:text-foreground/70 transition-colors mb-15"
                            >
                                <ArrowLeft className="w-15 h-15 " />
                                <span className="underline">Tilbake</span>
                            </button>
                            <h2 className="text-2xl font-light text-foreground mb-15">
                                Velg klinikk
                            </h2>

                            {clinics.length === 0 ? (
                                <div className="p-15 bg-white rounded-lg text-center">
                                    <p className="text-muted-foreground">
                                        Ingen klinikker tilbyr denne tjenesten for øyeblikket.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {clinics.map((clinic) => (
                                        <button
                                            key={clinic.id}
                                            onClick={() => handleSelectClinic(clinic)}
                                            className="w-full flex items-center gap-15 p-15 bg-white rounded-lg hover:bg-muted/30 transition-colors text-left group"
                                        >
                                            <div className="w-40 h-40 rounded-full bg-muted/50 flex items-center justify-center">
                                                <MapPin className="w-15 h-15 text-foreground" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-normal text-foreground">{clinic.label}</p>
                                                <p className="text-sm text-muted-foreground">{clinic.address}</p>
                                            </div>
                                            <ChevronRight className="w-15 h-15 text-muted-foreground" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    ) : !bookingData.time ? (
                        /* Step 3: Select Date & Time */
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-15"
                        >
                            <button
                                onClick={() => resetStep('clinic')}
                                className="flex items-center gap-1.5 text-sm text-foreground hover:text-foreground/70 transition-colors mb-15"
                            >
                                <ArrowLeft className="w-15 h-15" />
                                <span className="underline">Tilbake</span>
                            </button>
                            <h2 className="text-2xl font-light text-foreground mb-15">
                                Velg tid
                            </h2>

                            {/* Calendar */}
                            <div className="bg-white rounded-lg p-15">
                                <div className="flex items-center gap-7 mb-15">
                                    <Calendar className="w-5 h-5 text-foreground" />
                                    <span className="font-normal">Velg dato</span>
                                </div>
                                <CalendarComponent
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
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
                                                        onClick={() => handleSelectTimeSlot(slot.time, slot.specialist)}
                                                        className="flex flex-col items-center p-5 border border-border/30 rounded-lg hover:bg-muted/30 hover:border-foreground/30 transition-all w-full"
                                                    >
                                                        <Avatar className="h-16 w-16 mb-3">
                                                            <AvatarImage src={slot.specialist.image} alt={slot.specialist.name} className="object-cover" />
                                                            <AvatarFallback className="text-sm">{slot.specialist.name.slice(0, 2)}</AvatarFallback>
                                                        </Avatar>
                                                        <span className="text-sm font-normal text-foreground mb-1">{slot.specialist.name}</span>
                                                        <span className="text-xs text-muted-foreground mb-7">{slot.specialist.title}</span>
                                                        <span className="font-medium text-lg text-foreground">{slot.time}</span>
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
                                            <Calendar className="w-40 h-40 text-muted-foreground mx-auto mb-7" />
                                            <p className="text-muted-foreground">Ingen ledige timer denne dagen</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        /* Step 4: Confirm & Personal Info */
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                        >
                            <button
                                onClick={() => resetStep('time')}
                                className="flex items-center gap-1.5 text-sm text-foreground hover:text-foreground/70 transition-colors mb-4"
                            >
                                <ArrowLeft className="w-15 h-15" />
                                <span className="underline">Tilbake</span>
                            </button>
                            <h2 className="text-2xl font-light text-foreground mb-15">
                                Bekreft
                            </h2>
                            {/* Summary Card */}
                            <div className="bg-white rounded-lg p-15">
                                <h3 className="font-normal text-3xl mb-15">Din bestilling</h3>
                                <div className="grid grid-cols-7 gap-15 text-sm">
                                    <div>
                                        <span className="text-muted-foreground text-sm uppercase tracking-wider">Tjeneste</span>
                                        <p className="font-normal mt-1">{bookingData.service?.name}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground text-sm uppercase tracking-wider">Pris</span>
                                        <p className="font-normal mt-1">{bookingData.service?.price === "0" ? "Gratis" : `${bookingData.service?.price} kr`}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground text-sm uppercase tracking-wider">Klinikk</span>
                                        <p className="font-normal mt-1">{bookingData.clinic?.label}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground text-sm uppercase tracking-wider">Varighet</span>
                                        <p className="font-normal mt-1">{bookingData.service?.duration}</p>
                                    </div>
                                    <div>
                                            <span className="text-muted-foreground text-xs uppercase tracking-wider">Dato</span>
                                        <p className="font-normal mt-1 capitalize">{bookingData.date && format(bookingData.date, "EEEE d. MMMM", { locale: nb })}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground text-xs uppercase tracking-wider">Tid</span>
                                        <p className="font-normal mt-1">{bookingData.time}</p>
                                    </div>
                                </div>
                                {bookingData.specialist && (
                                    <div className="flex items-center gap-3 mt-5 pt-15 border-t border-border/20">
                                        <Avatar className="h-40 w-40">
                                            <AvatarImage src={bookingData.specialist.image} alt={bookingData.specialist.name} />
                                            <AvatarFallback>{bookingData.specialist.name.slice(0, 2)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-normal">{bookingData.specialist.name}</p>
                                            <p className="text-sm text-muted-foreground">{bookingData.specialist.title}</p>
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
                                            <label className="text-sm text-muted-foreground">Fornavn *</label>
                                            <Input
                                                value={formData.firstName}
                                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                placeholder="Fornavn"
                                                className="mt-1.5 h-12 w-full rounded-lg border-border/50"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-muted-foreground">Etternavn *</label>
                                            <Input
                                                value={formData.lastName}
                                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                placeholder="Etternavn"
                                                className="mt-1.5 h-12 w-full rounded-lg border-border/50"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm text-muted-foreground">Telefon *</label>
                                        <Input
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="Telefonnummer"
                                            type="tel"
                                            className="mt-1.5 h-12 rounded-lg border-border/50"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-muted-foreground">Fødselsnummer (11 siffer) *</label>
                                        <Input
                                            value={formData.birthNumber}
                                            onChange={(e) => setFormData({ ...formData, birthNumber: e.target.value })}
                                            placeholder="DDMMÅÅXXXXX"
                                            maxLength={11}
                                            className="mt-1.5 h-12 rounded-lg border-border/50"
                                        />
                                    </div>
                                    <div className="flex items-start gap-3 pt-7">
                                        <Checkbox
                                            id="terms"
                                            checked={formData.acceptTerms}
                                            onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked as boolean })}
                                            className="mt-0.5 p-7"
                                        />
                                        <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                                            Jeg godtar vilkårene og samtykker til behandling av personopplysninger *
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <Button
                                onClick={handleSubmit}
                                disabled={!formData.acceptTerms || !formData.firstName || !formData.lastName || !formData.phone || !formData.birthNumber}
                                className={cn(
                                    "w-full h-14 rounded-lg text-base font-normal transition-all",
                                    formData.acceptTerms && formData.firstName && formData.lastName && formData.phone && formData.birthNumber
                                        ? "bg-foreground text-background hover:bg-foreground/90"
                                        : "bg-muted text-muted-foreground cursor-not-allowed"
                                )}
                            >
                                Bekreft bestilling
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Specialist Info Dialog */}
            <Dialog open={!!selectedSpecialistInfo} onOpenChange={(open) => !open && setSelectedSpecialistInfo(null)}>
                <DialogContent className="sm:max-w-2xl bg-brand-beige border-none p-0 overflow-hidden">
                    {selectedSpecialistInfo && (
                        <div className="flex flex-col">
                            {/* Header with image left, info right */}
                            <div className="relative pt-8 pb-6 px-8">
                                <div className="flex items-start gap-6">
                                    {/* Image */}
                                    <div className="flex-shrink-0">
                                        <div className="h-28 w-28 rounded-full overflow-hidden ring-4 ring-white shadow-xl">
                                            <img
                                                src={selectedSpecialistInfo.image || ""}
                                                alt={selectedSpecialistInfo.name}
                                                className="h-full w-full object-cover object-top"
                                            />
                                        </div>
                                    </div>

                                    {/* Name, title and badges */}
                                    <div className="flex-1 pt-2">
                                        <h3 className="text-2xl font-normal text-foreground tracking-tight">{selectedSpecialistInfo.name}</h3>
                                        <p className="text-base text-muted-foreground mt-1 font-light">{selectedSpecialistInfo.title}</p>

                                        {/* Expertise badges */}
                                        {selectedSpecialistInfo.expertise && selectedSpecialistInfo.expertise.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {selectedSpecialistInfo.expertise.map((exp, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-3 py-1 text-sm font-light bg-white/60 text-foreground/80 rounded-full"
                                                    >
                                                        {exp}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Bio and details section */}
                            <div className="px-8 pb-8 space-y-5">
                                {/* Bio */}
                                {selectedSpecialistInfo.bio && (
                                    <div>
                                        <p className="text-base text-muted-foreground font-light leading-relaxed">
                                            {typeof selectedSpecialistInfo.bio === 'string'
                                                ? selectedSpecialistInfo.bio
                                                : selectedSpecialistInfo.bio}
                                        </p>
                                    </div>
                                )}

                                {/* Info cards grid - 2x2 */}
                                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-foreground/10">
                                    {selectedSpecialistInfo.languages && selectedSpecialistInfo.languages.length > 0 && (
                                        <div className="bg-white/50 rounded-xl p-4">
                                            <p className="text-xs uppercase tracking-wider text-foreground/60 mb-1.5">Språk</p>
                                            <p className="text-sm text-foreground font-light">{selectedSpecialistInfo.languages.join(", ")}</p>
                                        </div>
                                    )}
                                    {selectedSpecialistInfo.clinics && selectedSpecialistInfo.clinics.length > 0 && (
                                        <div className="bg-white/50 rounded-xl p-4">
                                            <p className="text-xs uppercase tracking-wider text-foreground/60 mb-1.5">Klinikk</p>
                                            <p className="text-sm text-foreground font-light">{selectedSpecialistInfo.clinics.join(", ")}</p>
                                        </div>
                                    )}
                                    {selectedSpecialistInfo.education && (
                                        <div className="bg-white/50 rounded-xl p-4">
                                            <p className="text-xs uppercase tracking-wider text-foreground/60 mb-1.5">Utdanning</p>
                                            <p className="text-sm text-foreground font-light">{selectedSpecialistInfo.education}</p>
                                        </div>
                                    )}
                                    {selectedSpecialistInfo.experience && (
                                        <div className="bg-white/50 rounded-xl p-4">
                                            <p className="text-xs uppercase tracking-wider text-foreground/60 mb-1.5">Erfaring</p>
                                            <p className="text-sm text-foreground font-light">{selectedSpecialistInfo.experience}</p>
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
};

export default BookingDemo;


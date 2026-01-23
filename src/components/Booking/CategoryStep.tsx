import { throwOnNotOk } from "@/src/lib/throwOnNotOk";
import { trackWithGTM } from "@/src/lib/tracking";
import { CHOOSE_CATEGORY } from "@/src/translations/booking";
import { t } from "@/src/translations/get-translation";
import { FC, useEffect, useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BookingStep } from "./BookingStep";
import { Loader } from "./Loader";

interface Service {
  name: string;
  slug: string;
  price?: string;
  duration?: string;
}

interface BookingCategoryWithServices extends BookingCategory {
  services?: Service[];
}

interface Props {
  language: string;
  clinicLanguage: "no" | "se";
  onSelect: (categorySlug: string, service: Service) => void;
  availableClinics?: Array<{ id: string; label: string }>;
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export const CategoryStep: FC<Props> = ({
  language,
  clinicLanguage,
  onSelect,
  availableClinics = [],
}) => {
  const [categories, setCategories] = useState<BookingCategoryWithServices[]>();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    const url = new URL("/api/booking/services", location.origin);
    url.searchParams.set("language", language);
    url.searchParams.set("clinicLanguage", clinicLanguage);
    
    fetch(url)
      .then(throwOnNotOk<BookingCategoryWithServices[]>)
      .then((data) => {
        console.log('categories', data);
        // Add default price and duration for services
        const servicesWithDefaults = data
          .map((cat) => ({
            ...cat,
            services: (cat.services || []).map((service) => ({
              ...service,
              price: service.price || "0",
              duration: service.duration || "30 minutter",
            })),
          }))
          // .filter((cat) => cat.services && cat.services.length > 0 && cat.bookable);
        console.log('servicesWithDefaults', servicesWithDefaults);
          setCategories(servicesWithDefaults);
        console.log('categories2', categories);
      })
      .catch((e) => {
        console.error(e);
        setError(true);
      });
  }, [language, clinicLanguage]);

  const handleSelectService = (
    categorySlug: string,
    categoryTitle: string,
    service: Service
  ) => {
    trackWithGTM("booking_select_service", {
      category: categoryTitle,
      service: service.name,
    });
    onSelect(categorySlug, service);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-light text-foreground text-center mb-6">
        {t(CHOOSE_CATEGORY, language)}
      </h2>

      {error && (
        <div className="p-4 bg-red-50 rounded-lg text-center">
          <p className="text-red-600">
            Kunne ikke laste tjenester. Vennligst prøv igjen senere.
          </p>
        </div>
      )}

      {categories ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-3"
        >
          {categories.map((category) => {
            // Filter clinics for this category if needed
            const clinicsForCategory = availableClinics;

            return (
              <div key={category.slug} className="rounded-lg overflow-hidden">
                {/* Category Header */}
                <button
                  onClick={() =>
                    setExpandedCategory(
                      expandedCategory === category.slug ? null : category.slug
                    )
                  }
                  className={cn(
                    "w-full flex items-center justify-between p-4 bg-white rounded-lg transition-all hover:bg-muted/30",
                    expandedCategory === category.slug && "rounded-b-none"
                  )}
                >
                  <span className="font-normal text-foreground">
                    {category.label}
                  </span>

                  {/* Clinic availability badges */}
                  <div className="flex items-center gap-3 ml-auto mr-4">
                    <div className="flex items-center gap-1.5">
                      {clinicsForCategory.length > 0 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-beige text-foreground/70 font-light">
                          {clinicsForCategory.length === availableClinics.length
                            ? "Alle klinikker"
                            : clinicsForCategory.slice(0, 2).map((c) => c.label).join(", ")}
                        </span>
                      )}
                    </div>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0",
                        expandedCategory === category.slug && "rotate-180"
                      )}
                    />
                  </div>
                </button>

                {/* Services List */}
                <AnimatePresence>
                  {expandedCategory === category.slug && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden bg-white border-t border-border/10"
                    >
                      <div className="p-3 space-y-2">
                        {category.services?.map((service, index) => (
                          <button
                            key={index}
                            onClick={() =>
                              handleSelectService(
                                category.slug,
                                category.label,
                                service
                              )
                            }
                            className="w-full flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors text-left group"
                          >
                            <div className="flex-1 pr-4">
                              <span className="text-foreground">
                                {service.name}{" "}
                                {service.price !== "0"
                                  ? `fra kr ${service.price},-`
                                  : "kr 0"}
                              </span>
                              <span className="text-muted-foreground ml-2 text-sm">
                                {service.duration}
                              </span>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center flex-shrink-0">
                              <ArrowRight className="w-4 h-4 text-background" />
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
        </motion.div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
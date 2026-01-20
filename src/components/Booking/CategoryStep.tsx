import { throwOnNotOk } from "@/src/lib/throwOnNotOk";
import { trackWithGTM } from "@/src/lib/tracking";
import { CHOOSE_CATEGORY } from "@/src/translations/booking";
import { t } from "@/src/translations/get-translation";
import { FC, useEffect, useState } from "react";
import { BookingButton } from "./BookingButton";
import { BookingButtonContainer } from "./BookingButtonContainer";
import { BookingStep } from "./BookingStep";
import { Loader } from "./Loader";

interface Props {
  language: string;
  clinicLanguage: "no" | "se";
  onSelect: (value: string) => void;
}
export const CategoryStep: FC<Props> = ({
  language,
  clinicLanguage,
  onSelect,
}) => {
  const [categories, setCategories] = useState<BookingCategory[]>();
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    const url = new URL("/api/booking/categories", location.origin);
    url.searchParams.set("language", language);
    url.searchParams.set("clinicLanguage", clinicLanguage);
    fetch(url)
      .then(throwOnNotOk<BookingCategory[]>)
      .then(setCategories)
      .catch((e) => {
        console.error(e);
        setError(true);
      });
  }, [language, clinicLanguage]);

  return (
    <BookingStep
      language={language}
      title={t(CHOOSE_CATEGORY, language)}
      error={error}
    >
      {categories ? (
        <BookingButtonContainer>
          {categories.map(
            (category) =>
              category.bookable && (
                <BookingButton
                  onClick={() => {
                    trackWithGTM("booking_select_category", {
                      category: category.title,
                    });
                    onSelect(category.slug);
                  }}
                  key={category.slug}
                >
                  <p className="text-center">{category.title}</p>
                </BookingButton>
              )
          )}
        </BookingButtonContainer>
      ) : (
        <Loader />
      )}
    </BookingStep>
  );
};

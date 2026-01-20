import { CALL_US_AT } from "@/src/translations/booking";
import { t } from "@/src/translations/get-translation";
import Link from "next/link";
import { PortableTextBlock } from "sanity";
import { PortableTextComponent } from "../../PortableText/PortableTextComponent";
import { BookingStep } from "../BookingStep";

type Props = {
  language: string;
  descriptionDesktop?: PortableTextBlock[];
  descriptionMobile?: PortableTextBlock[];
  contactInfo?: {
    streetAddress?: string;
    phoneOpeningHours?: string;
    phoneNumber?: string;
  };
};

export function ClosedForBookingStep({
  language,
  descriptionDesktop,
  descriptionMobile,
  contactInfo,
}: Props) {
  return (
    <BookingStep language={language}>
      <div className="grid grid-rows-[1fr_auto] gap-40 place-content-center flex-grow max-w-450 mx-auto mt-40 md:mt-60">
        <div className="text-center flex flex-col items-center justify-center">
          {contactInfo?.phoneNumber && (
            <div className="text-medium">
              <p>{t(CALL_US_AT, language)}</p>
              <p>
                <Link href={`tel:${contactInfo.phoneNumber}`}>
                  {contactInfo.phoneNumber}
                </Link>
              </p>
            </div>
          )}

          <div className="prose md:max-w-[60ch] mt-60 mx-auto flex flex-col text-small">
            {descriptionDesktop && (
              <div className="hidden md:block space-y-20">
                <PortableTextComponent value={descriptionDesktop} />
              </div>
            )}

            {descriptionMobile && (
              <div className="md:hidden space-y-20">
                <PortableTextComponent value={descriptionMobile} />
              </div>
            )}
          </div>
        </div>

        {contactInfo && (
          <div className="text-center py-50">
            <address>
              {contactInfo.streetAddress && <p>{contactInfo.streetAddress}</p>}
              {contactInfo.phoneOpeningHours && (
                <p>{contactInfo.phoneOpeningHours}</p>
              )}
            </address>
          </div>
        )}
      </div>
    </BookingStep>
  );
}

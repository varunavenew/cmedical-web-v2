import { CONTACT_INFO_TEXTS } from "../translations/contact-info";
import { COPY_CONFIRMATION_TEXTS } from "../translations/copy-confirmation";
import { t } from "../translations/get-translation";
import { CopyIcon } from "./CopyIcon";
import { CopyableText } from "./CopyableText";
import { Grid } from "./Grid";

export const AddressSection = ({
  ...data
}: Pick<ClinicPage, "contactDescription" | "contactInfo" | "language">) => {
  const copyConfirmation = t(COPY_CONFIRMATION_TEXTS, data.language);
  const labels = t(CONTACT_INFO_TEXTS, data.language);
  return (
    <Grid.SecondCol>
      <div className="min-h-almost md:min-h-screen flex flex-col">
        <h2 className="p-20 h-80 md:h-100 flex items-center justify-center">
          {labels.title}
        </h2>
        <div className="max-w-[50ch]  px-50 py-80 md:py-25 mx-auto flex items-center grow">
          {data.contactDescription ?? ""}
        </div>
        <div className="border-t-half border-black/10 last:border-b-half">
          <div className="p-25 md:px-50 flex justify-between gap-10 items-center hover:bg-black/2 focus-visible:bg-black/2">
            <div>{labels.address}</div>
            <div className="flex items-center gap-10 text-right">
              <CopyIcon className="text-black/20" />
              <CopyableText
                text={data.contactInfo.streetAddress}
                confirmation={copyConfirmation}
              />
            </div>
          </div>
        </div>
        {data.contactInfo.openingHours && (
          <div className="border-t-half border-black/10 last:border-b-half">
            <div className="p-25 md:px-50 flex justify-between items-center hover:bg-black/2 focus-visible:bg-black/2">
              <div>{labels.openingHours}</div>
              <div className="flex items-center gap-10">
                {data.contactInfo.openingHours}
              </div>
            </div>
          </div>
        )}
        <div className="border-t-half border-black/10 last:border-b-half">
          <div className="p-25 md:px-50 flex justify-between items-center hover:bg-black/2 focus-visible:bg-black/2">
            <div>{labels.phoneNumber}</div>
            <div className="flex items-center gap-10">
              <CopyIcon className="text-black/20" />
              <CopyableText
                text={data.contactInfo.phoneNumber}
                confirmation={copyConfirmation}
              />
            </div>
          </div>
        </div>
        {data.contactInfo.email && (
          <div className="border-t-half border-black/10 last:border-b-half">
            <div className="p-25 md:px-50 flex justify-between items-center hover:bg-black/2 focus-visible:bg-black/2">
              <div>{labels.email}</div>
              <div className="flex items-center gap-10">
                <CopyIcon className="text-black/20" />
                <CopyableText
                  text={data.contactInfo.email}
                  confirmation={copyConfirmation}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Grid.SecondCol>
  );
};

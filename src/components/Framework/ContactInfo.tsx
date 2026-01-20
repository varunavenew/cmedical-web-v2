import { FC } from "react";
import { CopyableText } from "../CopyableText";
import { t } from "@/src/translations/get-translation";
import { COPY_CONFIRMATION_TEXTS } from "@/src/translations/copy-confirmation";

export const ContactInfo: FC<{
  language: string;
  label: string;
  text: string;
}> = ({ language, label, text }) => (
  <address className="flex flex-col justify-center items-center my-50 md:my-100">
    {label}
    <CopyableText
      text={text}
      confirmation={t(COPY_CONFIRMATION_TEXTS, language)}
    />
  </address>
);

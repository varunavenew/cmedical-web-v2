import { FC } from "react";
import { BookingButton } from "./BookingButton";
import { BookingStep } from "./BookingStep";
import { FlowContainer } from "./FlowContainer";
import { t } from "@/src/translations/get-translation";
import { BOOKING_FLOW_COUNTRY } from "@/src/translations/booking";
import { BookingButtonContainer } from "./BookingButtonContainer";
import { trackWithGTM } from "@/src/lib/tracking";

interface Props {
  language: string;
  onSelect: (value: "no" | "se") => void;
  onClose: () => void;
}

export const SelectFlowStep: FC<Props> = ({ language, onSelect, onClose }) => {
  return (
    <FlowContainer
      language={language}
      className="bg-skin2"
      progress={0}
      maxProgress={1}
      onClose={onClose}
    >
      <BookingStep
        language={language}
        title={t(BOOKING_FLOW_COUNTRY, language)}
      >
        <BookingButtonContainer>
          <BookingButton
            onClick={() => {
              trackWithGTM("booking_select_country", { country: "norway" });
              onSelect("no");
            }}
          >
            <p className="text-center">Norway</p>
          </BookingButton>

          <BookingButton
            onClick={() => {
              trackWithGTM("booking_select_country", { country: "sweden" });
              onSelect("se");
            }}
          >
            <p className="text-center">Sweden</p>
          </BookingButton>
        </BookingButtonContainer>
      </BookingStep>
    </FlowContainer>
  );
};

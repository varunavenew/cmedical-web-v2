import { PortableTextBlock } from "sanity";
import { PortableTextComponent } from "./PortableText/PortableTextComponent";

type Props = {
  descriptionDesktop?: PortableTextBlock[];
  descriptionMobile?: PortableTextBlock[];
};

export function ClosedForBookingSection({
  descriptionDesktop,
  descriptionMobile,
}: Props) {
  return (
    <div className="prose px-20 py-100 max-w-[33em] mx-auto text-center">
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
  );
}

import { SanityDocument } from "next-sanity";
import { LinkList } from "./LinkList";

type Props = {
  className?: string;
  title: string;
  body: string;
  treatments: Pick<SanityDocument<TreatmentPage>, "title" | "slug" | "_id">[];
  teams: Pick<SanityDocument<TreatmentPage>, "title" | "slug" | "_id">[];
  baseUrl: string;
};

export function ExpertiseSection({
  className,
  title,
  body,
  treatments,
  teams,
  baseUrl,
}: Props) {
  return (
    <div className={className}>
      <h2 className="p-20 h-80 md:h-100 flex items-center justify-center text-center">
        {title}
      </h2>
      <div className="py-100 px-50 max-w-[50ch] mx-auto">
        <p>{body}</p>
      </div>
      <LinkList links={[...treatments, ...teams]} baseUrl={baseUrl} />
    </div>
  );
}

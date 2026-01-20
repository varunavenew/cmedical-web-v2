"use client";

import { useParams } from "next/navigation";
import type { SanityDocument } from "@sanity/client";
import { useLiveQuery } from "@sanity/preview-kit";
import { treatmentPageQuery } from "@/sanity/lib/queries";
import { FC } from "react";
import TreatmentContent from "../Treatment/TreatmentContent";

interface Props {
  data: SanityDocument<TreatmentPage>;
}

const PreviewTreatmentContent: FC<Props> = ({ data: defaultData }) => {
  const params = useParams();
  const [data] = useLiveQuery(defaultData, treatmentPageQuery, {
    id: defaultData._id,
    language: params.language,
    parent: params.path[0],
  });

  return <TreatmentContent data={data} />;
};

export default PreviewTreatmentContent;

"use client";

import type { SanityDocument } from "@sanity/client";
import { useLiveQuery } from "@sanity/preview-kit";
import { clinicPageQuery } from "@/sanity/lib/queries";
import { FC } from "react";
import ClinicContent from "../Clinic/ClinicContent";
import { useParams } from "next/navigation";

interface Props {
  data: SanityDocument<ClinicPage>;
}

const PreviewClinicContent: FC<Props> = ({ data: defaultData }) => {
  const params = useParams<ParamsType>();
  const [data] = useLiveQuery(defaultData, clinicPageQuery, {
    id: defaultData._id,
    language: params.language,
  });

  return <ClinicContent data={data} language={params.language} />;
};

export default PreviewClinicContent;

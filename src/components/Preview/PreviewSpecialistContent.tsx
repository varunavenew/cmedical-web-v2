"use client";

import type { SanityDocument } from "@sanity/client";
import { useLiveQuery } from "@sanity/preview-kit";
import { specialistPageQuery } from "@/sanity/lib/queries";
import { FC } from "react";
import SpecialistContent from "../Specialist/SpecialistContent";
import { useParams } from "next/navigation";

interface Props {
  data: SanityDocument<SpecialistPage>;
}

const PreviewSpecialistContent: FC<Props> = ({ data: defaultData }) => {
  const params = useParams<ParamsType>();
  const [data] = useLiveQuery(defaultData, specialistPageQuery, {
    id: defaultData._id,
    language: params.language,
  });

  return <SpecialistContent data={data} language={params.language} />;
};

export default PreviewSpecialistContent;

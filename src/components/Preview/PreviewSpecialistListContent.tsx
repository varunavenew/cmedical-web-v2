"use client";

import { useParams } from "next/navigation";
import type { SanityDocument } from "@sanity/client";
import { useLiveQuery } from "@sanity/preview-kit";
import type { FC } from "react";
import { specialistListPageQuery } from "@/sanity/lib/queries";
import SpecialistListContent from "../Specialist/SpecialistListContent";

interface Props {
  data: SanityDocument<SpecialistListPage>;
}

const PreviewSpecialistListContent: FC<Props> = ({ data: defaultData }) => {
  const params = useParams();
  const [data] = useLiveQuery(defaultData, specialistListPageQuery, {
    id: defaultData._id,
    language: params.language,
  });

  return <SpecialistListContent data={data} />;
};

export default PreviewSpecialistListContent;

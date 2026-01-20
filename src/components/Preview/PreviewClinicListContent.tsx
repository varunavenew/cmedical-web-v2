"use client";

import { useParams } from "next/navigation";
import type { SanityDocument } from "@sanity/client";
import { useLiveQuery } from "@sanity/preview-kit";
import type { FC } from "react";
import { clinicListPageQuery } from "@/sanity/lib/queries";
import ClinicListContent from "../Clinic/ClinicListContent";

interface Props {
  data: SanityDocument<ClinicListPage>;
}

const PreviewClinicListContent: FC<Props> = ({ data: defaultData }) => {
  const params = useParams();
  const [data] = useLiveQuery(defaultData, clinicListPageQuery, {
    id: defaultData._id,
    language: params.language,
  });

  return <ClinicListContent data={data} />;
};

export default PreviewClinicListContent;
